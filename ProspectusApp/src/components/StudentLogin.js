// src/components/StudentLogin.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { findStudentById, getAllStudents } from '../data/students';

export default function StudentLogin({ onLogin, onBack }) {
  const [query, setQuery] = useState('');

  const handleEnter = () => {
    const q = (query || '').trim();
    if (!q) return Alert.alert('Enter ID or Name');

    // Try find by id first
    let student = findStudentById(q);
    if (!student) {
      const all = getAllStudents();
      student = all.find((s) => s.name.toLowerCase() === q.toLowerCase() || s.name.toLowerCase().includes(q.toLowerCase()));
    }

    if (student) {
      onLogin(student);
    } else {
      Alert.alert('Not Found', 'No student found with that ID or name.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Login</Text>
      <TextInput style={styles.input} placeholder="Enter Student ID or Full Name" value={query} onChangeText={setQuery} autoCapitalize="none" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Enter" onPress={handleEnter} />
        <Button title="Back" onPress={onBack} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, width: '100%' },
  input: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 }
});