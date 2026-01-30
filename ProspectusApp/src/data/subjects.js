// src/data/subjects.js
// Sample subject list and helper utilities for the prospectus/gradesheet

const subjects = [
  { courseCode: 'MATH101', descriptiveTitle: 'Calculus I', coPrerequisite: '-', units: 3, hours: 64, remarks: 'Core', year: 1, semester: 1 },
  { courseCode: 'CS101', descriptiveTitle: 'Intro to Programming', coPrerequisite: 'MATH101', units: 3, hours: 96, remarks: 'Core', year: 1, semester: 1 },
  { courseCode: 'ENG102', descriptiveTitle: 'English Composition', coPrerequisite: '-', units: 3, hours: 48, remarks: '', year: 1, semester: 2 },
  { courseCode: 'HIST201', descriptiveTitle: 'World History', coPrerequisite: '-', units: 3, hours: 48, remarks: 'Elective', year: 2, semester: 1 },
  { courseCode: 'PHYS202', descriptiveTitle: 'Physics II', coPrerequisite: 'PHYS101', units: 4, hours: 96, remarks: 'Lab', year: 2, semester: 2 },
  { courseCode: 'MATH301', descriptiveTitle: 'Linear Algebra', coPrerequisite: 'MATH101', units: 3, hours: 64, remarks: 'Core', year: 3, semester: 1 },
  { courseCode: 'CS402', descriptiveTitle: 'Software Engineering', coPrerequisite: 'CS101', units: 3, hours: 96, remarks: 'Capstone', year: 4, semester: 2 },
  { courseCode: 'ELECT01', descriptiveTitle: 'Special Topics', coPrerequisite: '-', units: 2, hours: 32, remarks: 'Variable', /* year and semester intentionally omitted */ },
];

/**
 * Get subjects for a specific year and semester (1-4 years, 1-2 semesters).
 * Returns an empty array if none match.
 */
export function getSubjectsByYearSemester(year, semester) {
  if (typeof year !== 'number' || typeof semester !== 'number') return [];
  return subjects.filter((s) => s.year === year && s.semester === semester);
}

/**
 * Find a subject by its course code.
 */
export function findSubjectByCode(code) {
  if (!code) return null;
  return subjects.find((s) => s.courseCode === code) || null;
}

/**
 * Merge a student's grade entries with subject metadata when available.
 * Grade entries are objects that should include at least `courseCode` and `grade`.
 * Returned objects will prefer subject metadata but keep grade-specific fields.
 */
export function mergeGradesWithSubjects(grades = []) {
  return grades.map((g) => {
    const subj = findSubjectByCode(g.courseCode);
    const descriptiveTitle = subj?.descriptiveTitle || g.courseName || g.descriptiveTitle || '-';

    return {
      courseCode: g.courseCode || (subj && subj.courseCode) || '-',
      descriptiveTitle,
      // alias for backward compatibility with GradeCard
      courseName: descriptiveTitle,
      coPrerequisite: subj?.coPrerequisite || g.coPrerequisite || '-',
      units: subj?.units ?? g.units ?? '-',
      hours: subj?.hours ?? g.hours ?? '-',
      // 'remarks' should represent the student's grade; keep subject remark separately
      remarks: g.grade ?? subj?.remarks ?? '-',
      subjectRemarks: subj?.remarks || null,
      year: g.year ?? subj?.year ?? null,
      semester: g.semester ?? subj?.semester ?? null,
      // keep any original grade fields if present
      grade: g.grade ?? null,
      // keep other meta if needed
      _raw: { ...subj, ...g },
    };
  });
}

export default subjects;
