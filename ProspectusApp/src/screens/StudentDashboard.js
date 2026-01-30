// src/screens/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, Alert } from 'react-native';
import GradeCard from '../components/GradeCard';
import GPACard from '../components/GPACard';
import GradesheetTable from '../components/GradeSheetTable';
import subjects, { mergeGradesWithSubjects } from '../data/subjects';

const StudentDashboard = ({ grades, studentName, gpa, onSaveGrades }) => {
  // Combined list of all prospectus subjects with any existing student grades merged
  const [editableGrades, setEditableGrades] = useState([]);

  useEffect(() => {
    // start from subject list and overlay existing grades
    const merged = mergeGradesWithSubjects(grades || []);
    const mergedByCode = {};
    merged.forEach((m) => {
      mergedByCode[m.courseCode] = m;
    });

    const combined = subjects.map((s) => {
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Hello, {studentName}</Text>
      <GPACard gpa={gpa} />
      <Text style={styles.subHeader}>Your Grades (enter your grades below)</Text>

      {editableGrades.map((grade) => (
        <GradeCard key={grade.courseCode} grade={grade} />
      ))}

      {/* Editable table view of all prospectus subjects */}
      <GradesheetTable grades={editableGrades} editable={true} onChangeGrade={handleChangeGrade} />

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
