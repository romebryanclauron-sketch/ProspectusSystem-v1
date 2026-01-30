// src/components/GPACard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GPACard = ({ gpa }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Current GPA</Text>
      <Text style={styles.gpa}>{gpa}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 20, backgroundColor: '#6200ee', borderRadius: 8, marginVertical: 10 },
  text: { color: 'white', fontSize: 16 },
  gpa: { color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 5 }
});

export default GPACard;
