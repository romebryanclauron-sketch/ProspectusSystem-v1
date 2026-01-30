// src/components/GradesheetTable.js
import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';

export default function GradesheetTable({ grades = [], editable = false, onChangeGrade = () => {}, program = 'All', year = 'All', semester = 'All' }) {
  // Normalize grades and split into groups Year (1-4) -> Semester (1-2)
  // If `program/year/semester` are provided and not 'All', skip any subject not included
  const { grouped, unspecified } = useMemo(() => {
    const grouped = {};
    // Initialize years 1-4 and semesters 1-2
    for (let y = 1; y <= 4; y++) {
      grouped[y] = { 1: [], 2: [] };
    }

    const unspecified = [];

    grades.forEach((g) => {
      // filter by program if requested
      if (program && program !== 'All') {
        const progs = (g._raw && g._raw.programs) || g.programs || [];
        if (!Array.isArray(progs) || !progs.includes(program)) return; // skip this subject
      }

      const y = g.year != null ? Number(g.year) : null;
      const s = g.semester != null ? Number(g.semester) : null;

      // filter by year if requested
      if (year && year !== 'All') {
        if (y !== Number(year)) return; // skip
      }

      // filter by semester if requested
      if (semester && semester !== 'All') {
        if (s !== Number(semester)) return; // skip
      }

      if (y >= 1 && y <= 4 && (s === 1 || s === 2)) {
        grouped[y][s].push(g);
      } else {
        unspecified.push(g);
      }
    });

    return { grouped, unspecified };
  }, [grades, program, year, semester]);

  const renderTable = (rows) => (
    <ScrollView horizontal={true} style={styles.tableContainer} contentContainerStyle={styles.tableContent}>
      <View>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.cellCode, styles.headerCell]}>Course Code</Text>
          <Text style={[styles.cell, styles.cellTitle, styles.headerCell]}>Descriptive Title</Text>
          <Text style={[styles.cell, styles.cellSmall, styles.headerCell]}>Co-/Prequisite</Text>
          <Text style={[styles.cell, styles.cellTiny, styles.headerCell]}>Units</Text>
          <Text style={[styles.cell, styles.cellTiny, styles.headerCell]}>LEC</Text>
          <Text style={[styles.cell, styles.cellTiny, styles.headerCell]}>LAB</Text>
          <Text style={[styles.cell, styles.cellSmall, styles.headerCell]}>Hours</Text>
          <Text style={[styles.cell, styles.cellSmall, styles.headerCell]}>Remarks</Text>
        </View>

        {rows.length === 0 ? (
          <View style={[styles.emptyRow]}> 
            <Text style={styles.emptyText}>No courses for this term</Text>
          </View>
        ) : (
          rows.map((grade, idx) => {
            const descriptiveTitle = grade.courseName || grade.descriptiveTitle || '-';
            const coPrereq = grade.coPrerequisite || grade.prerequisite || grade.corequisite || '-';
            const units = grade.units != null ? String(grade.units) : '-';
            const lec = grade.lec != null ? String(grade.lec) : '-';
            const lab = grade.lab != null ? String(grade.lab) : '-';
            const hours = grade.hours != null ? String(grade.hours) : ((Number(grade.lec || 0) + Number(grade.lab || 0)) > 0 ? String(Number(grade.lec || 0) + Number(grade.lab || 0)) : '-');
            // Show student's grade in the Remarks column (per spec)
            const remarks = grade.grade ?? '-';

            return (
              <View
                key={(grade.courseCode || descriptiveTitle || idx) + idx}
                style={[styles.row, idx % 2 === 0 ? styles.evenRow : styles.oddRow]}
              >
                <Text style={[styles.cell, styles.cellCode]} numberOfLines={1}>{grade.courseCode || '-'}</Text>
                <Text style={[styles.cell, styles.cellTitle]}>{descriptiveTitle}</Text>
                <Text style={[styles.cell, styles.cellSmall]} numberOfLines={1}>{coPrereq}</Text>
                <Text style={[styles.cell, styles.cellTiny]}>{units}</Text>
                <Text style={[styles.cell, styles.cellTiny]}>{lec}</Text>
                <Text style={[styles.cell, styles.cellTiny]}>{lab}</Text>
                <Text style={[styles.cell, styles.cellSmall]}>{hours}</Text>
                {editable ? (
                  <TextInput
                    style={[styles.cell, styles.cellSmall, styles.input]}
                    value={grade.grade != null ? String(grade.grade) : ''}
                    onChangeText={(text) => onChangeGrade(grade.courseCode, text)}
                    placeholder="Enter grade"
                    keyboardType="default"
                    returnKeyType="done"
                  />
                ) : (
                  <Text style={[styles.cell, styles.cellSmall]} numberOfLines={1}>{remarks}</Text>
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
  tableContent: {
    minWidth: '100%'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },
  headerRow: {
    backgroundColor: '#2d6fb4',
  },
  headerCell: {
    color: 'white',
    fontWeight: '700',
    paddingVertical: 10,
  },
  cell: {
    flexShrink: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  cellCode: { flexBasis: 80, flexGrow: 0, flexShrink: 0 },
  cellTitle: { flexBasis: 240, flexGrow: 1, flexShrink: 1 },
  cellSmall: { flexBasis: 120, flexGrow: 0, flexShrink: 1 },
  cellTiny: { flexBasis: 56, flexGrow: 0, flexShrink: 0, textAlign: 'center' },
  evenRow: {
    backgroundColor: '#fafafa',
  },
  oddRow: {
    backgroundColor: '#ffffff',
  },
  emptyRow: {
    padding: 12,
    alignItems: 'center',
  },
  emptyText: {
    padding: 10,
    color: '#888',
  },
  input: {
    padding: 8,
    minWidth: 80,
  },
});
