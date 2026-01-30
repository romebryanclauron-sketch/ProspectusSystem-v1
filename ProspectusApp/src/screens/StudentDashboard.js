// src/screens/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, Alert } from 'react-native';
import GradeCard from '../components/GradeCards';
import GPACard from '../components/GPACard';
import GradesheetTable from '../components/GradeSheetTable';
import ProgramSelector from '../components/ProgramSelector';
import DepartmentSelector from '../components/DepartmentSelector';
import { getAllSubjects, subscribeToSubjects, mergeGradesWithSubjects, getAllPrograms } from '../data/subjects';

const StudentDashboard = ({ grades, studentName, gpa, onSaveGrades, program: initialProgram, student }) => {
  // Combined list of all prospectus subjects with any existing student grades merged
  const [editableGrades, setEditableGrades] = useState([]);

  // Program selector (defaults to prop `program` if provided), prefer student's assigned program if present
  const programs = getAllPrograms();
  const defaultProgram = initialProgram ?? (student?.program) ?? (programs[0] || 'All');
  const [program, setProgram] = React.useState(defaultProgram);
  React.useEffect(() => {
    if (initialProgram) setProgram(initialProgram);
    else if (student?.program) setProgram(student.program);
  }, [initialProgram, student]);

  // Year / Semester selectors
  const years = ['All','1','2','3','4'];
  const semesters = ['All','1','2'];
  const [year, setYear] = React.useState('All');
  const [semester, setSemester] = React.useState('All');



  useEffect(() => {
    // Build combined list from current subjects and student's grades
    const build = () => {
      const merged = mergeGradesWithSubjects(grades || []);
      const mergedByCode = {};
      merged.forEach((m) => {
        mergedByCode[m.courseCode] = m;
      });

      const allSubjects = getAllSubjects();
      const combined = allSubjects.map((s) => {
        const existing = mergedByCode[s.courseCode];
        if (existing) return existing;
        return {
          courseCode: s.courseCode,
          descriptiveTitle: s.descriptiveTitle,
          courseName: s.descriptiveTitle,
          coPrerequisite: s.coPrerequisite || '-',
          units: s.units ?? '-',
          hours: s.hours ?? '-',
          remarks: '-',
          grade: null,
          year: s.year ?? null,
          semester: s.semester ?? null,
          subjectRemarks: s.remarks || null,
          _raw: s,
        };
      });

      setEditableGrades(combined);
    };

    build();
    const unsub = subscribeToSubjects(build);
    return () => unsub();
  }, [grades]);

  const handleChangeGrade = (courseCode, newGrade) => {
    setEditableGrades((prev) => prev.map((g) => (g.courseCode === courseCode ? { ...g, grade: newGrade, remarks: newGrade } : g)));
  };

  const handleSave = () => {
    const saved = editableGrades.filter((g) => g.grade != null && String(g.grade).trim() !== '').map((g) => ({ courseCode: g.courseCode, grade: g.grade, year: g.year, semester: g.semester }));
    // call optional prop or just log
    if (onSaveGrades) onSaveGrades(saved);
    Alert.alert('Saved', `Saved ${saved.length} grades.`);
    console.log('Saved grades:', saved);
  };

  // filteredGrades computed below uses `program`, `year`, and `semester` state defined above
  const filteredGrades = editableGrades.filter((g) => {
    // program filter
    if (program && program !== 'All') {
      const progs = (g._raw && g._raw.programs) || g.programs || [];
      if (!Array.isArray(progs) || !progs.includes(program)) return false;
    }

    // year filter
    if (year && year !== 'All') {
      if (Number(g.year) !== Number(year)) return false;
    }

    // semester filter
    if (semester && semester !== 'All') {
      if (Number(g.semester) !== Number(semester)) return false;
    }

    return true;
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Hello, {studentName}</Text>
      <GPACard gpa={gpa} />

      {student?.program ? (
        <Text style={styles.subHeader}>Program: {student.program}</Text>
      ) : (
        <>
          <Text style={styles.subHeader}>Program</Text>
          <ProgramSelector departments={programs} selected={program} onSelect={setProgram} />
        </>
      )}

      <View style={{ marginTop: 8 }}>
        <Text style={styles.subHeader}>Year</Text>
        <DepartmentSelector departments={years} selected={year} onSelect={setYear} />
      </View>

      <View style={{ marginTop: 8 }}>
        <Text style={styles.subHeader}>Semester</Text>
        <DepartmentSelector departments={semesters} selected={semester} onSelect={setSemester} />
      </View>

      <Text style={styles.subHeader}>Your Grades (enter your grades below)</Text>

      {filteredGrades.map((grade) => (
        <GradeCard key={grade.courseCode} grade={grade} />
      ))}

      {/* Editable table view of subjects for the selected program */}
      <GradesheetTable grades={editableGrades} editable={true} onChangeGrade={handleChangeGrade} program={program} />

      <View style={{ marginTop: 12 }}>
        <Button title="Save Grades" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subHeader: { fontSize: 18, marginVertical: 10 },
});

export default StudentDashboard;
