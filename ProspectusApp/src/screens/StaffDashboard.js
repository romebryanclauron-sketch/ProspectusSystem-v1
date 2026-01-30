// src/screens/StaffDashboard.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import StudentSearch from '../components/StudentSearch';
import GradeCard from '../components/GradeCard';
import GradesheetTable from '../components/GradeSheetTable';
import { mergeGradesWithSubjects } from '../data/subjects';

const mockStudents = [
  {
    id: 'S001',
    name: 'John Doe',
    gpa: 3.7,
    grades: [
      { courseCode: 'MATH101', courseName: 'Calculus I', grade: 'A' },
      { courseCode: 'ENG102', courseName: 'English', grade: 'B+' },
    ],
  },
  {
    id: 'S002',
    name: 'Jane Smith',
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

  // Merge student grades with subject metadata for richer display
  const mergedGrades = selectedStudent ? mergeGradesWithSubjects(selectedStudent.grades || []) : [];

  const handleSearch = (query) => {
    setSearchQuery(query);
    const student = mockStudents.find(
      (s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.id.toLowerCase() === query.toLowerCase()
    );
    setSelectedStudent(student || null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Hello, {staffName}</Text>
      <StudentSearch onSearch={handleSearch} />
      
      {selectedStudent ? (
        <View>
          <Text style={styles.subHeader}>
            Gradesheet: {selectedStudent.name} ({selectedStudent.id})
          </Text>

          {mergedGrades.map((grade) => (
            <GradeCard key={grade.courseCode} grade={grade} />
          ))}

          {/* Table view of merged grades */}
          <GradesheetTable grades={mergedGrades} />

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
