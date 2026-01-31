// src/components/GradesheetTable.js
import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, useWindowDimensions, Platform } from 'react-native';

export default function GradesheetTable({ grades = [], editable = false, onChangeGrade = () => {}, program = 'All', year = 'All', semester = 'All', studentProgram = null }) {
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

  const { width } = useWindowDimensions();
  const isCompact = width < 700; // treat narrow screens as compact (mobile)

  // Keep section tables visually consistent by enforcing a minimum height and fixed width for desktop
  const ROW_HEIGHT = 44;
  const MIN_VISIBLE_ROWS = 6; // number of rows to visually reserve per section
  const HEADER_ROWS = 2; // header top + sub header
  const minTableHeight = ROW_HEIGHT * (MIN_VISIBLE_ROWS + HEADER_ROWS);
  const TABLE_WIDTH = 1800; // fixed table width to ensure each section is identical on desktop



  const renderTable = (rows) => {
    // Compact stacked card layout for mobile / narrow screens
    if (isCompact) {
      return (
        <View style={[styles.compactContainer, { minHeight: minTableHeight }]}> 
          {rows.length === 0 ? (
            <View style={styles.emptyRow}>
              <Text style={styles.emptyText}>No courses for this term</Text>
            </View>
          ) : (
            rows.map((grade, idx) => {
              const descriptiveTitle = grade.courseName || grade.descriptiveTitle || '-';
              const coPrereq = grade.coPrerequisite || grade.prerequisite || grade.corequisite || '-';
              const units = grade.units != null ? String(grade.units) : '-';
              const lec = grade.lec != null ? String(grade.lec) : '-';
              const lab = grade.lab != null ? String(grade.lab) : '-';
              const totalHours = String(Number(grade.lec || 0) + Number(grade.lab || 0) || '-');
              const remarks = grade.grade ?? '-';

              return (
                <View key={(grade.courseCode || descriptiveTitle || idx) + idx} style={[styles.compactCard, idx % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                  <View style={styles.compactRow}><Text style={styles.compactLabel}>Code</Text><Text style={styles.compactValue}>{grade.courseCode || '-'}</Text></View>
                  <View style={styles.compactRow}><Text style={styles.compactLabel}>Title</Text><Text style={styles.compactValue}>{descriptiveTitle}</Text></View>
                  <View style={styles.compactRow}><Text style={styles.compactLabel}>Co-/Pre</Text><Text style={styles.compactValue}>{coPrereq}</Text></View>
                  <View style={styles.compactRow}><Text style={styles.compactLabel}>Units</Text><Text style={styles.compactValue}>{units}</Text></View>
                  <View style={styles.compactRow}><Text style={styles.compactLabel}>LEC</Text><Text style={styles.compactValue}>{lec}</Text></View>
                  <View style={styles.compactRow}><Text style={styles.compactLabel}>LAB</Text><Text style={styles.compactValue}>{lab}</Text></View>
                  <View style={styles.compactRow}><Text style={styles.compactLabel}>Total</Text><Text style={styles.compactValue}>{totalHours}</Text></View>

                  {editable ? (
                    <View style={styles.compactRow}><Text style={styles.compactLabel}>Grade</Text>
                      <TextInput
                        style={[styles.input, styles.compactInput]}
                        value={grade.grade != null ? String(grade.grade) : ''}
                        onChangeText={(text) => onChangeGrade(grade.courseCode, text)}
                        placeholder="Enter grade"
                        keyboardType="default"
                        returnKeyType="done"
                      />
                    </View>
                  ) : (
                    <View style={styles.compactRow}><Text style={styles.compactLabel}>Grade</Text><Text style={styles.compactValue}>{remarks}</Text></View>
                  )}
                </View>
              );
            })

            )}

            {/* Section totals (compact) */}
            {rows.length > 0 && (() => {
              const secTotals = rows.reduce((acc, r) => {
                acc.units += Number(r.units || 0) || 0;
                acc.lec += Number(r.lec || 0) || 0;
                acc.lab += Number(r.lab || 0) || 0;
                acc.total += Number(r.hours != null ? r.hours : (Number(r.lec || 0) + Number(r.lab || 0))) || 0;
                return acc;
              }, { units: 0, lec: 0, lab: 0, total: 0 });

              return (
                <View key={`section-totals`} style={[styles.compactTotals, styles.footerRow]}>
                  <Text style={styles.compactTotalsLabel}>Section Totals</Text>
                  <Text style={styles.compactTotalsValue}>Units: {String(secTotals.units)}</Text>
                  <Text style={styles.compactTotalsValue}>LEC: {String(secTotals.lec)}</Text>
                  <Text style={styles.compactTotalsValue}>LAB: {String(secTotals.lab)}</Text>
                  <Text style={styles.compactTotalsValue}>Total: {String(secTotals.total)}</Text>
                </View>
              );
            })()}


        </View>
      );
    }

    // Desktop / wide layout (existing table)
    return (
      <ScrollView horizontal={true} style={styles.tableContainer} contentContainerStyle={[styles.tableContent, { minWidth: TABLE_WIDTH }]}>
        <View style={{ width: TABLE_WIDTH, minHeight: minTableHeight }} >
            {/* Two-row header: top row shows Hours grouping, sub-row shows Total/LEC/LAB */}
          <View style={[styles.row, styles.headerRowTop]}>
            <Text style={[styles.cell, styles.cellCode, styles.headerCell, styles.headerTop]}>Course Code</Text>
            <Text style={[styles.cell, styles.cellTitle, styles.headerCell, styles.headerTop]}>Descriptive Title</Text>
            <Text style={[styles.cell, styles.cellSmall, styles.headerCell, styles.headerTop]}>Co-/Prequisite</Text>
            <Text style={[styles.cell, styles.cellTiny, styles.headerCell, styles.headerTop]}>Units</Text>
            <Text style={[styles.cell, styles.cellHours, styles.headerCell, styles.headerTop]}>Hours</Text>
            <Text style={[styles.cell, styles.cellSmall, styles.headerCell, styles.headerTop]}>Grade</Text>
          </View>
          <View style={[styles.row, styles.headerRowSub]}>
            <Text style={[styles.cell, styles.cellCode]}></Text>
            <Text style={[styles.cell, styles.cellTitle]}></Text>
            <Text style={[styles.cell, styles.cellSmall]}></Text>
            <Text style={[styles.cell, styles.cellTiny]}></Text>
            <Text style={[styles.cell, styles.cellTiny, styles.headerCell]}>LEC</Text>
            <Text style={[styles.cell, styles.cellTiny, styles.headerCell]}>LAB</Text>
            <Text style={[styles.cell, styles.cellTiny, styles.headerCell]}>Total</Text>
            <Text style={[styles.cell, styles.cellSmall]}></Text>
          </View>

          {rows.length === 0 ? (
            <View style={[styles.emptyRow]}> 
              <Text style={styles.emptyText}>No courses for this term</Text>
            </View>
          ) : (
            <>
              {rows.map((grade, idx) => {
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
                    <Text style={[styles.cell, styles.cellCode]}>{grade.courseCode || '-'}</Text>
                    <Text style={[styles.cell, styles.cellTitle]}>{descriptiveTitle}</Text>
                    <Text style={[styles.cell, styles.cellSmall]}>{coPrereq}</Text>
                    <Text style={[styles.cell, styles.cellTiny]}>{units}</Text>

                    {/* Hours columns: LEC, LAB, Total (computed from lec+lab) */}
                    <Text style={[styles.cell, styles.cellTiny]}>{lec}</Text>
                    <Text style={[styles.cell, styles.cellTiny]}>{lab}</Text>
                    <Text style={[styles.cell, styles.cellTiny, styles.total]}>{String(Number(grade.lec || 0) + Number(grade.lab || 0) || '-')}</Text>

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
              })}

              {/* Section totals */}
              {(() => {
                const secTotals = rows.reduce((acc, r) => {
                  acc.units += Number(r.units || 0) || 0;
                  acc.lec += Number(r.lec || 0) || 0;
                  acc.lab += Number(r.lab || 0) || 0;
                  acc.total += Number(r.hours != null ? r.hours : (Number(r.lec || 0) + Number(r.lab || 0))) || 0;
                  return acc;
                }, { units: 0, lec: 0, lab: 0, total: 0 });

                return (
                  <View style={[styles.row, styles.footerRow]}>
                    <Text style={[styles.cell, styles.cellCode]}></Text>
                    <Text style={[styles.cell, styles.cellTitle, styles.footerLabel]}>Totals</Text>
                    <Text style={[styles.cell, styles.cellSmall]}></Text>
                    <Text style={[styles.cell, styles.cellTiny, styles.footerNumber]}>{String(secTotals.units)}</Text>
                    <Text style={[styles.cell, styles.cellTiny, styles.footerNumber]}>{String(secTotals.lec)}</Text>
                    <Text style={[styles.cell, styles.cellTiny, styles.footerNumber]}>{String(secTotals.lab)}</Text>
                    <Text style={[styles.cell, styles.cellTiny, styles.footerNumber]}>{String(secTotals.total)}</Text>
                    <Text style={[styles.cell, styles.cellSmall]}></Text>
                  </View>
                );
              })()}


            </>
          )}
        </View>
      </ScrollView>
    );
  };

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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  headerRowTop: {
    backgroundColor: '#2d6fb4',
    borderBottomWidth: 1,
    borderBottomColor: '#1f578f'
  },
  headerRowSub: {
    backgroundColor: '#2b5d96',
    borderBottomWidth: 1,
    borderBottomColor: '#234e83'
  },
  headerCell: {
    color: 'white',
    fontWeight: '700',
    paddingVertical: 10,
  },
  headerTop: {
    textAlign: 'center'
  },
  cellHours: { flexBasis: 180, flexGrow: 0, flexShrink: 0 },
  total: { fontWeight: '700', textAlign: 'center' },
  cell: {
    flexShrink: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderRightColor: '#e6e6e6'
  },
  cellCode: { width: 90, flexGrow: 0, flexShrink: 0, borderRightWidth: 1, borderRightColor: '#e6e6e6' },
  cellTitle: { flex: 1, borderRightWidth: 1, borderRightColor: '#e6e6e6', flexWrap: 'wrap' },
  cellSmall: { width: 120, borderRightWidth: 1, borderRightColor: '#e6e6e6', flexWrap: 'wrap' },
  cellTiny: { width: 60, flexGrow: 0, flexShrink: 0, textAlign: 'center', borderRightWidth: 1, borderRightColor: '#e6e6e6' },
  cellHours: { width: 180, borderRightWidth: 1, borderRightColor: '#e6e6e6' },
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

  /* Compact (mobile) styles */
  compactContainer: {
    padding: 8,
  },
  compactCard: {
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
    overflow: 'hidden',
  },
  compactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6'
  },
  compactLabel: {
    color: '#666',
    fontWeight: '600',
    marginRight: 8,
    flexBasis: '40%'
  },
  compactValue: {
    flexBasis: '60%',
    textAlign: 'left',
    flexWrap: 'wrap'
  },
  compactInput: {
    minWidth: 120,
  },
  compactTotals: {
    padding: 10,
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
  },
  compactTotalsLabel: { fontWeight: '700', marginBottom: 6 },
  compactTotalsValue: { color: '#333', marginBottom: 4 },

  footerRow: {
    backgroundColor: '#f6f8fa',
  },
  footerLabel: { fontWeight: '700' },
  footerProgramLabel: { fontWeight: '700', color: '#2d6fb4' },
  footerNumber: { fontWeight: '700', textAlign: 'center' },
});
