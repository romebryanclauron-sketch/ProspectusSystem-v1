// src/components/DepartmentSelector.js
import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DepartmentSelector({ departments = [], selected, onSelect }) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {departments.map((d) => (
          <TouchableOpacity key={d} onPress={() => onSelect(d)} style={[styles.chip, d === selected ? styles.active : null]}>
            <Text style={[styles.text, d === selected ? styles.activeText : null]}>{d}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  scroll: { paddingHorizontal: 6 },
  chip: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#eee', borderRadius: 20, marginRight: 8 },
  active: { backgroundColor: '#3498db' },
  text: { color: '#333' },
  activeText: { color: 'white', fontWeight: 'bold' },
});