// src/components/GradeCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GradeCard = ({ grade }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{grade.courseCode} - {grade.courseName}</Text>
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
  grade: { fontSize: 16, fontWeight: 'bold' }
});

export default GradeCard;
