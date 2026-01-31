import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Alert, Platform } from 'react-native';

// Build an HTML string suitable for printing to PDF or opening in a browser print dialog
export function buildGradesheetHTML({ student = {}, grades = [], title = 'Gradesheet' }) {
  const escaped = (str) => String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // helper to render a grade row as HTML
  const rowHtml = (g) => {
    const code = escaped(g.courseCode || '-');
    const titleText = escaped(g.courseName || g.descriptiveTitle || '-');
    const co = escaped(g.coPrerequisite || g.prerequisite || g.corequisite || '-');
    const units = escaped(g.units != null ? String(g.units) : '-');
    const lec = escaped(g.lec != null ? String(g.lec) : '-');
    const lab = escaped(g.lab != null ? String(g.lab) : '-');
    const total = escaped(String(Number(g.lec || 0) + Number(g.lab || 0) || '-'));
    const grade = escaped(g.grade ?? '-');
    return `<tr>
      <td class="code">${code}</td>
      <td class="title">${titleText}</td>
      <td class="copreq">${co}</td>
      <td class="num">${units}</td>
      <td class="num">${lec}</td>
      <td class="num">${lab}</td>
      <td class="num">${total}</td>
      <td class="grade">${grade}</td>
    </tr>`;
  };

  // Group grades by Year -> Semester. Put anything without a valid year/semester into 'unspecified'.
  const grouped = { unspecified: [] };
  for (let y = 1; y <= 4; y++) grouped[y] = { 1: [], 2: [] };
  grades.forEach((g) => {
    const y = g.year != null ? Number(g.year) : null;
    const s = g.semester != null ? Number(g.semester) : null;
    if (y >= 1 && y <= 4 && (s === 1 || s === 2)) {
      grouped[y][s].push(g);
    } else {
      grouped.unspecified.push(g);
    }
  });

  // Build HTML sections for each Year/Semester that has rows
  let bodySections = '';
  for (let y = 1; y <= 4; y++) {
    for (let s = 1; s <= 2; s++) {
      const rowsArr = grouped[y][s];
      if (!rowsArr || rowsArr.length === 0) continue;
      bodySections += `<h2>Year ${y} — Semester ${s}</h2>\n`;
      bodySections += `<table>\n<thead>\n<tr>\n  <th>Course Code</th>\n  <th>Descriptive Title</th>\n  <th>Co-/Prequisite</th>\n  <th>Units</th>\n  <th colspan="3">Hours</th>\n  <th>Grade</th>\n</tr>\n<tr>\n  <th></th>\n  <th></th>\n  <th></th>\n  <th></th>\n  <th>LEC</th>\n  <th>LAB</th>\n  <th>Total</th>\n  <th></th>\n</tr>\n</thead>\n<tbody>\n`;
      bodySections += rowsArr.map(rowHtml).join('\n');

      // section totals
      const secTotals = rowsArr.reduce((acc, r) => {
        acc.units += Number(r.units || 0) || 0;
        acc.lec += Number(r.lec || 0) || 0;
        acc.lab += Number(r.lab || 0) || 0;
        acc.total += Number(r.hours != null ? r.hours : (Number(r.lec || 0) + Number(r.lab || 0))) || 0;
        return acc;
      }, { units: 0, lec: 0, lab: 0, total: 0 });

      bodySections += `\n<tr class="footer">\n  <td></td>\n  <td class="footerLabel">Totals</td>\n  <td></td>\n  <td class="num">${String(secTotals.units)}</td>\n  <td class="num">${String(secTotals.lec)}</td>\n  <td class="num">${String(secTotals.lab)}</td>\n  <td class="num">${String(secTotals.total)}</td>\n  <td></td>\n</tr>`;

      bodySections += `\n</tbody>\n</table>\n`; 
    }
  }

  if (grouped.unspecified.length > 0) {
    bodySections += `<h2>Unspecified Year / Semester</h2>\n`;
    bodySections += `<table>\n<thead>\n<tr>\n  <th>Course Code</th>\n  <th>Descriptive Title</th>\n  <th>Co-/Prequisite</th>\n  <th>Units</th>\n  <th colspan="3">Hours</th>\n  <th>Grade</th>\n</tr>\n<tr>\n  <th></th>\n  <th></th>\n  <th></th>\n  <th></th>\n  <th>LEC</th>\n  <th>LAB</th>\n  <th>Total</th>\n  <th></th>\n</tr>\n</thead>\n<tbody>\n`;
    bodySections += grouped.unspecified.map(rowHtml).join('\n');

    const unsTotals = grouped.unspecified.reduce((acc, r) => {
      acc.units += Number(r.units || 0) || 0;
      acc.lec += Number(r.lec || 0) || 0;
      acc.lab += Number(r.lab || 0) || 0;
      acc.total += Number(r.hours != null ? r.hours : (Number(r.lec || 0) + Number(r.lab || 0))) || 0;
      return acc;
    }, { units: 0, lec: 0, lab: 0, total: 0 });

    bodySections += `\n<tr class="footer">\n  <td></td>\n  <td class="footerLabel">Totals</td>\n  <td></td>\n  <td class="num">${String(unsTotals.units)}</td>\n  <td class="num">${String(unsTotals.lec)}</td>\n  <td class="num">${String(unsTotals.lab)}</td>\n  <td class="num">${String(unsTotals.total)}</td>\n  <td></td>\n</tr>`;

    bodySections += `\n</tbody>\n</table>\n`; 
  }

  const studentName = escaped(student.name || studentName || '');
  const program = escaped(student.program || '');

  return `<!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escaped(title)}</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; margin: 0; padding: 20px; color: #222 }
      .doc { max-width: 1024px; margin: 0 auto; }
      h1 { font-size: 20px; margin-bottom: 6px }
      .meta { margin-bottom: 18px; color: #444 }
      table { width: 100%; border-collapse: collapse; font-size: 13px }
      th, td { border: 1px solid #cfcfcf; padding: 8px; vertical-align: middle }
      tbody tr:nth-child(even) td { background: #fafafa }
      th { background: #2d6fb4; color: white; text-align: left }
      td.code { width: 90px }
      td.title { width: 40% }
      td.copreq { width: 120px }
      td.num { width: 60px; text-align: center }
      td.grade { width: 80px; text-align: center; font-weight: 700 }
      th[colspan] { text-align: center }
      h2 { color: #2d6fb4; margin-top: 18px; margin-bottom: 6px; font-size: 16px }
      table { margin-bottom: 14px }
      tr.footer td { background: #f6f8fa; font-weight: 700 }
      .footerLabel { font-weight: 700 }
      @media print {
        body { -webkit-print-color-adjust: exact }
      }
    </style>
  </head>
  <body>
    <div class="doc">
      <h1>${escaped(title)}</h1>
      <div class="meta">Student: <strong>${studentName}</strong> ${program ? `| Program: <strong>${program}</strong>` : ''}</div>
      ${bodySections || '<p>No courses found for this program.</p>'}
    </div>
  </body>
  </html>`;
}

export default function GradesheetDocument({ grades = [], student = {}, title = 'Gradesheet', onClose = () => {} }) {
  const html = buildGradesheetHTML({ grades, student, title });

  const onPrint = async () => {
    try {
      if (Platform.OS === 'web') {
        // Open new window and trigger print
        const w = window.open('', '_blank');
        if (!w) throw new Error('Popup blocked');
        w.document.open();
        w.document.write(html);
        w.document.close();
        w.focus();
        // Wait a tick for content to render, then print
        setTimeout(() => { w.print(); }, 500);
        return;
      }

      // Try expo-print dynamically (if available in the project)
      const Print = await import('expo-print');
      if (Print && Print.printAsync) {
        await Print.printAsync({ html });
        return;
      }

      Alert.alert('Print Not Available', 'Printing is not available on this platform. Install and configure expo-print to enable PDF export.');
    } catch (err) {
      console.warn('Print error', err);
      Alert.alert('Print Error', String(err.message || err));
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.meta}>Student: {student.name || ''} {student.program ? `| Program: ${student.program}` : ''}</Text>
      </View>

      <View style={styles.preview}>
        {/* Grouped preview: Year -> Semester */}
        {(() => {
          const grouped = { unspecified: [] };
          for (let y = 1; y <= 4; y++) grouped[y] = { 1: [], 2: [] };
          (grades || []).forEach((g) => {
            const y = g.year != null ? Number(g.year) : null;
            const s = g.semester != null ? Number(g.semester) : null;
            if (y >= 1 && y <= 4 && (s === 1 || s === 2)) grouped[y][s].push(g);
            else grouped.unspecified.push(g);
          });

          const sections = [];
          for (let y = 1; y <= 4; y++) {
            for (let s = 1; s <= 2; s++) {
              const rows = grouped[y][s];
              if (!rows || rows.length === 0) continue;
              sections.push(
                <View key={`y${y}s${s}`}>
                  <Text style={styles.sectionHeader}>Year {y} — Semester {s}</Text>
                  <View style={[styles.row, styles.headerRowTop]}>
                    <Text style={[styles.cell, styles.code, styles.headerCell, styles.headerTop]}>Code</Text>
                    <Text style={[styles.cell, styles.titleCell, styles.headerCell, styles.headerTop]}>Descriptive Title</Text>
                    <Text style={[styles.cell, styles.small, styles.headerCell, styles.headerTop]}>Co-/Prequisite</Text>
                    <Text style={[styles.cell, styles.num, styles.headerCell, styles.headerTop]}>Units</Text>
                    <Text style={[styles.cell, styles.cellHours, styles.headerCell, styles.headerTop]}>Hours</Text>
                    <Text style={[styles.cell, styles.grade, styles.headerCell, styles.headerTop]}>Grade</Text>
                  </View>
                  <View style={[styles.row, styles.headerRowSub]}>
                    <Text style={[styles.cell, styles.code]}></Text>
                    <Text style={[styles.cell, styles.titleCell]}></Text>
                    <Text style={[styles.cell, styles.small]}></Text>
                    <Text style={[styles.cell, styles.num]}></Text>
                    <Text style={[styles.cell, styles.cellTiny, styles.headerCell]}>LEC</Text>
                    <Text style={[styles.cell, styles.cellTiny, styles.headerCell]}>LAB</Text>
                    <Text style={[styles.cell, styles.cellTiny, styles.headerCell]}>Total</Text>
                    <Text style={[styles.cell, styles.grade]}></Text>
                  </View>

                  {rows.map((g, idx) => (
                    <View key={`row-${y}-${s}-${idx}`} style={[styles.row, idx % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                      <Text style={[styles.cell, styles.code]}>{g.courseCode || '-'}</Text>
                      <Text style={[styles.cell, styles.titleCell]}>{g.courseName || g.descriptiveTitle || '-'}</Text>
                      <Text style={[styles.cell, styles.small]}>{g.coPrerequisite || '-'}</Text>
                      <Text style={[styles.cell, styles.num]}>{g.units != null ? String(g.units) : '-'}</Text>
                      <Text style={[styles.cell, styles.num]}>{g.lec != null ? String(g.lec) : '-'}</Text>
                      <Text style={[styles.cell, styles.num]}>{g.lab != null ? String(g.lab) : '-'}</Text>
                      <Text style={[styles.cell, styles.num]}>{String(Number(g.lec || 0) + Number(g.lab || 0) || '-')}</Text>
                      <Text style={[styles.cell, styles.grade]}>{g.grade ?? '-'}</Text>
                    </View>
                  ))}

                  {/* section totals */}
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
                        <Text style={[styles.cell, styles.code]}></Text>
                        <Text style={[styles.cell, styles.titleCell, styles.footerLabel]}>Totals</Text>
                        <Text style={[styles.cell, styles.small]}></Text>
                        <Text style={[styles.cell, styles.num, styles.footerNumber]}>{String(secTotals.units)}</Text>
                        <Text style={[styles.cell, styles.num, styles.footerNumber]}>{String(secTotals.lec)}</Text>
                        <Text style={[styles.cell, styles.num, styles.footerNumber]}>{String(secTotals.lab)}</Text>
                        <Text style={[styles.cell, styles.num, styles.footerNumber]}>{String(secTotals.total)}</Text>
                        <Text style={[styles.cell, styles.grade]}></Text>
                      </View>
                    );
                  })()} 
                </View>
              );
            }
          }

          if (grouped.unspecified.length > 0) {
            sections.push(
              <View key="unspecified">
                <Text style={styles.sectionHeader}>Unspecified Year / Semester</Text>
                <View style={[styles.row, styles.headerRowTop]}>
                  <Text style={[styles.cell, styles.code, styles.headerCell, styles.headerTop]}>Code</Text>
                  <Text style={[styles.cell, styles.titleCell, styles.headerCell, styles.headerTop]}>Descriptive Title</Text>
                  <Text style={[styles.cell, styles.small, styles.headerCell, styles.headerTop]}>Co-/Prequisite</Text>
                  <Text style={[styles.cell, styles.num, styles.headerCell, styles.headerTop]}>Units</Text>
                  <Text style={[styles.cell, styles.cellHours, styles.headerCell, styles.headerTop]}>Hours</Text>
                  <Text style={[styles.cell, styles.grade, styles.headerCell, styles.headerTop]}>Grade</Text>
                </View>
                <View style={[styles.row, styles.headerRowSub]}>
                  <Text style={[styles.cell, styles.code]}></Text>
                  <Text style={[styles.cell, styles.titleCell]}></Text>
                  <Text style={[styles.cell, styles.small]}></Text>
                  <Text style={[styles.cell, styles.num]}></Text>
                  <Text style={[styles.cell, styles.cellTiny, styles.headerCell]}>LEC</Text>
                  <Text style={[styles.cell, styles.cellTiny, styles.headerCell]}>LAB</Text>
                  <Text style={[styles.cell, styles.cellTiny, styles.headerCell]}>Total</Text>
                  <Text style={[styles.cell, styles.grade]}></Text>
                </View>

                {grouped.unspecified.map((g, idx) => (
                  <View key={`unspecified-${idx}`} style={[styles.row, idx % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                    <Text style={[styles.cell, styles.code]}>{g.courseCode || '-'}</Text>
                    <Text style={[styles.cell, styles.titleCell]}>{g.courseName || g.descriptiveTitle || '-'}</Text>
                    <Text style={[styles.cell, styles.small]}>{g.coPrerequisite || '-'}</Text>
                    <Text style={[styles.cell, styles.num]}>{g.units != null ? String(g.units) : '-'}</Text>
                    <Text style={[styles.cell, styles.num]}>{g.lec != null ? String(g.lec) : '-'}</Text>
                    <Text style={[styles.cell, styles.num]}>{g.lab != null ? String(g.lab) : '-'}</Text>
                    <Text style={[styles.cell, styles.num]}>{String(Number(g.lec || 0) + Number(g.lab || 0) || '-')}</Text>
                    <Text style={[styles.cell, styles.grade]}>{g.grade ?? '-'}</Text>
                  </View>
                ))}
              </View>
            );
          }

          if (sections.length === 0) {
            return (
              <View style={[styles.emptyRow]}> 
                <Text style={styles.emptyText}>No courses found for this program.</Text>
              </View>
            );
          }

          return sections;
        })()}
      </View>

      <View style={styles.actions}>
        <View style={{ marginBottom: 8 }}>
          <Button title="Print / Export" onPress={onPrint} />
        </View>
        <Button title="Close" onPress={onClose} color="#999" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  header: { marginBottom: 12 },
  title: { fontSize: 18, fontWeight: '700' },
  meta: { color: '#555', marginTop: 4 },
  preview: { borderWidth: 1, borderColor: '#e6e6e6', borderRadius: 6, overflow: 'hidden' },
  rowHeader: { flexDirection: 'row', backgroundColor: '#2d6fb4', padding: 8 },
  headerRowTop: { backgroundColor: '#2d6fb4' },
  headerRowSub: { backgroundColor: '#2b5d96' },
  headerCell: { color: 'white', fontWeight: '700', paddingVertical: 6 },
  headerTop: { textAlign: 'center' },
  row: { flexDirection: 'row', padding: 8, alignItems: 'center' },
  cellHours: { width: 180 },
  cellTiny: { width: 56, textAlign: 'center' },
  cell: { paddingHorizontal: 6 },
  code: { width: 90, fontWeight: '600' },
  titleCell: { flex: 1, fontWeight: '600' },
  small: { width: 120, fontWeight: '600' },
  num: { width: 60, textAlign: 'center', fontWeight: '600' },
  grade: { width: 80, textAlign: 'center', fontWeight: '700' },
  evenRow: { backgroundColor: '#fafafa' },
  oddRow: { backgroundColor: '#fff' },
  actions: { marginTop: 12 },
  emptyRow: { padding: 16, alignItems: 'center' },
  emptyText: { color: '#888' },
  sectionHeader: { padding: 8, fontWeight: '700', backgroundColor: '#f6f8fa' },
  footerRow: { backgroundColor: '#f6f8fa' },
  footerLabel: { fontWeight: '700' },
  footerNumber: { fontWeight: '700', textAlign: 'center' }
});
