// src/components/GradesheetTable.js
import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';

export default function GradesheetTable({ grades = [], editable = false, onChangeGrade = () => {} }) {
  // Normalize grades and split into groups Year (1-4) -> Semester (1-2)
  const { grouped, unspecified } = useMemo(() => {
    const grouped = {};
    // Initialize years 1-4 and semesters 1-2
    for (let y = 1; y <= 4; y++) {
      grouped[y] = { 1: [], 2: [] };
    }

    const unspecified = [];

    grades.forEach((g) => {
      const y = g.year != null ? Number(g.year) : null;
      const s = g.semester != null ? Number(g.semester) : null;

      if (y >= 1 && y <= 4 && (s === 1 || s === 2)) {
        grouped[y][s].push(g);
      } else {
        unspecified.push(g);
      }
    });

    return { grouped, unspecified };
  }, [grades]);

  const renderTable = (rows) => (
    <ScrollView horizontal style={styles.tableContainer}>
      <View>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell]}>Course Code</Text>
          <Text style={[styles.cell, styles.headerCell]}>Descriptive Title</Text>
          <Text style={[styles.cell, styles.headerCell]}>Co-/Prequisite</Text>
          <Text style={[styles.cell, styles.headerCell]}>Units</Text>
          <Text style={[styles.cell, styles.headerCell]}>Hours</Text>
          <Text style={[styles.cell, styles.headerCell]}>Remarks</Text>
        </View>

        {rows.length === 0 ? (
          <View style={[styles.row, styles.emptyRow]}>
            <Text style={styles.emptyText}>No courses for this term</Text>
          </View>
        ) : (
          rows.map((grade, idx) => {
            const descriptiveTitle = grade.courseName || grade.descriptiveTitle || '-';
            const coPrereq = grade.coPrerequisite || grade.prerequisite || grade.corequisite || '-';
            const units = grade.units != null ? String(grade.units) : '-';
            const hours = grade.hours != null ? String(grade.hours) : '-';
            // Show student's grade in the Remarks column (per spec)
            const remarks = grade.grade ?? '-';
            const subjectRemarks = grade.subjectRemarks || grade.remarks || '-';

            return (
              <View
                key={(grade.courseCode || descriptiveTitle || idx) + idx}
                style={[styles.row, idx % 2 === 0 ? styles.evenRow : styles.oddRow]}
              >
                <Text style={styles.cell}>{grade.courseCode || '-'}</Text>
                <Text style={styles.cell}>{descriptiveTitle}</Text>
                <Text style={styles.cell}>{coPrereq}</Text>
                <Text style={styles.cell}>{units}</Text>
                <Text style={styles.cell}>{hours}</Text>
                {editable ? (
                  <TextInput
                    style={[styles.cell, styles.input]}
                    value={grade.grade != null ? String(grade.grade) : ''}
                    onChangeText={(text) => onChangeGrade(grade.courseCode, text)}
                    placeholder="Enter grade"
                    keyboardType="default"
                    returnKeyType="done"
                  />
                ) : (
                  <Text style={styles.cell}>{remarks}</Text>
                )}
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Unspecified term(s) first */}
      {unspecified.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Unspecified Year / Semester</Text>
          {renderTable(unspecified)}
        </View>
      )}

      {/* Years 1-4 and Semesters 1-2 */}
      {Object.keys(grouped).map((y) => (
        <View key={y} style={styles.section}>
          <Text style={styles.sectionHeader}>Year {y}</Text>

          {/* Semester 1 */}
          <Text style={styles.semesterHeader}>Semester 1</Text>
          {renderTable(grouped[y][1])}

          {/* Semester 2 */}
          <Text style={styles.semesterHeader}>Semester 2</Text>
          {renderTable(grouped[y][2])}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  section: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    overflow: 'hidden',
  },
  sectionHeader: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: 8,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  semesterHeader: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#ecf0f1',
    fontWeight: '600',
  },
  tableContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    minHeight: 40,
    alignItems: 'center',
  },
  headerRow: {
    backgroundColor: '#3498db',
  },
  headerCell: {
    color: 'white',
    fontWeight: 'bold',
  },
  cell: {
    minWidth: 140,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  oddRow: {
    backgroundColor: '#ffffff',
  },
  emptyRow: {
    padding: 12,
  },
  emptyText: {
    padding: 10,
    color: '#888',
  },
  input: {
    minWidth: 140,
    padding: 8,
  },
});
