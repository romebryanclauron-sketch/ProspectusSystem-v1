// src/components/GradeCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GradeCard = ({ grade }) => {
  const lec = grade.lec != null ? grade.lec : '-';
  const lab = grade.lab != null ? grade.lab : '-';
  const hours = grade.hours != null ? grade.hours : ((Number(grade.lec || 0) + Number(grade.lab || 0)) || '-');

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.text}>{grade.courseCode} - {grade.courseName}</Text>
        <Text style={styles.subText}>{`Units: ${grade.units ?? '-'} • LEC: ${lec} • LAB: ${lab} • Hrs: ${hours}`}</Text>
      </View>
      <Text style={styles.grade}>{grade.grade}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { 
    flexDirection: 'row', justifyContent: 'space-between', 
    padding: 15, backgroundColor: 'white', marginVertical: 5, borderRadius: 8 
  },
  text: { fontSize: 16 },
  subText: { fontSize: 12, color: '#666', marginTop: 4 },
  grade: { fontSize: 16, fontWeight: 'bold' }
});

export default GradeCard;
