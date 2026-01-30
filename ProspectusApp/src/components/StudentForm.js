// src/components/StudentForm.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import { addStudent } from '../data/students';
import { getAllPrograms } from '../data/subjects';
import ProgramSelector from './ProgramSelector';

export default function StudentForm({ onAdd }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [gpa, setGpa] = useState('');
  const programs = getAllPrograms();
  const [program, setProgram] = useState(programs[1] || 'All');

  const reset = () => { setId(''); setName(''); setGpa(''); setProgram(programs[1] || 'All'); };

  const handleAdd = () => {
    if (!id.trim() || !name.trim()) {
      Alert.alert('Validation', 'Student ID and name are required.');
      return;
    }

    const ok = addStudent({ id: id.trim(), name: name.trim(), program, gpa: gpa ? Number(gpa) : null });
    if (ok) {
      Alert.alert('Added', `Student ${name.trim()} added to ${program}.`);
      if (typeof onAdd === 'function') onAdd();
      reset();
    } else {
      Alert.alert('Error', 'A student with this ID already exists.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add / Register Student</Text>
      <TextInput style={styles.input} placeholder="Student ID" value={id} onChangeText={setId} />
      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <Text style={styles.label}>Program</Text>
      <ProgramSelector departments={programs} selected={program} onSelect={setProgram} />
      <TextInput style={styles.input} placeholder="GPA (optional)" value={gpa} onChangeText={setGpa} keyboardType="numeric" />
      <View style={{ marginTop: 8 }}>
        <Button title="Add Student" onPress={handleAdd} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 8, backgroundColor: '#fff', borderRadius: 6, borderWidth: 1, borderColor: '#ddd', marginBottom: 12 },
  input: { padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, marginBottom: 8 },
  title: { fontWeight: 'bold', marginBottom: 8 },
  label: { marginBottom: 6 }
});
