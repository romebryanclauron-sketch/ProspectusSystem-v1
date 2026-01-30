// src/screens/StaffDashboard.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import StudentSearch from '../components/StudentSearch';
import StudentForm from '../components/StudentForm';
import GradeCard from '../components/GradeCards';
import GradesheetTable from '../components/GradeSheetTable';
import ProgramSelector from '../components/ProgramSelector';
import DepartmentSelector from '../components/DepartmentSelector';
import { mergeGradesWithSubjects, getAllPrograms, getAllSubjects } from '../data/subjects';
import { getAllStudents, subscribeToStudents } from '../data/students';

const mockStudents = [
  {
    id: 'S001',
    name: 'John Doe',
    program: 'BSIT',
    gpa: 3.7,
    grades: [
      { courseCode: 'MATH101', courseName: 'Calculus I', grade: 'A' },
      { courseCode: 'ENG102', courseName: 'English', grade: 'B+' },
    ],
  },
  {
    id: 'S002',
    name: 'Jane Smith',
    program: 'BSIS',
    gpa: 3.9,
    grades: [
      { courseCode: 'MATH101', courseName: 'Calculus I', grade: 'A-' },
      { courseCode: 'ENG102', courseName: 'English', grade: 'A' },
    ],
  },
];

export default function StaffDashboard({ staffName }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [students, setStudents] = useState(getAllStudents());

  // subscribe to student store updates
  useEffect(() => {
    const unsub = subscribeToStudents((s) => setStudents(s));
    return () => unsub();
  }, []);

  // Merge student grades with subject metadata for richer display
  const mergedGrades = selectedStudent ? mergeGradesWithSubjects(selectedStudent.grades || []) : [];
  const programs = getAllPrograms();
  const [program, setProgram] = useState(programs[0] || 'All');

  const years = ['All','1','2','3','4'];
  const semesters = ['All','1','2'];
  const [year, setYear] = useState('All');
  const [semester, setSemester] = useState('All');

  const filteredMerged = mergedGrades.filter((g) => {
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

  const handleSearch = (query) => {
    setSearchQuery(query);
    const student = students.find(
      (s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.id.toLowerCase() === query.toLowerCase()
    );
    setSelectedStudent(student || null);
  };

  // When a student is selected, default the program selector to the student's program if present
  useEffect(() => {
    if (selectedStudent && selectedStudent.program) {
      setProgram(selectedStudent.program);
    } else {
      setProgram(programs[0] || 'All');
    }
  }, [selectedStudent]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Hello, {staffName}</Text>
      <StudentSearch onSearch={handleSearch} />
      <StudentForm onAdd={() => { /* Student list will update via subscription */ }} />

      {/* Program selector controls the prospectus view (and defaults to selected student's program when available) */}
      <Text style={{ fontWeight: 'bold', marginVertical: 8 }}>Program</Text>
      <ProgramSelector departments={programs} selected={program} onSelect={setProgram} />

      {/* Prospectus: show all subjects (filtered by selected program/year/semester) */}
      <View style={{ marginTop: 8 }}>
        <Text style={{ fontWeight: 'bold', marginVertical: 8 }}>Year</Text>
        <DepartmentSelector departments={years} selected={year} onSelect={setYear} />
      </View>

      <View style={{ marginTop: 8 }}>
        <Text style={{ fontWeight: 'bold', marginVertical: 8 }}>Semester</Text>
        <DepartmentSelector departments={semesters} selected={semester} onSelect={setSemester} />
      </View>

      <Text style={styles.subHeader}>All Prospectus Subjects</Text>
      <GradesheetTable grades={getAllSubjects()} program={program} year={year} semester={semester} />

      {selectedStudent ? (
        <View>
          <Text style={styles.subHeader}>
            Gradesheet: {selectedStudent.name} ({selectedStudent.id})
          </Text>

          {filteredMerged.map((grade) => (
            <GradeCard key={grade.courseCode} grade={grade} />
          ))}

          {/* Table view of merged grades (student's recorded grades) */}
          <GradesheetTable grades={mergedGrades} program={program} year={year} semester={semester} />

          <Text style={styles.gpa}>GPA: {selectedStudent.gpa}</Text>
        </View>
      ) : searchQuery ? (
        <Text style={styles.notFound}>Student not found</Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5', flex: 1 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subHeader: { fontSize: 18, marginVertical: 10, fontWeight: 'bold' },
  gpa: { fontSize: 16, marginTop: 10, fontWeight: 'bold' },
  notFound: { fontSize: 16, marginTop: 10, color: 'red' },
});
