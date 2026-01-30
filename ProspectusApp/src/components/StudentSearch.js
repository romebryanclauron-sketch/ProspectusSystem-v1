// src/components/StudentSearch.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const StudentSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter student name or ID"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={() => onSearch(query)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginVertical: 10 },
  input: { flex: 1, borderWidth: 1, padding: 10, marginRight: 10, borderRadius: 8 }
});

export default StudentSearch;
