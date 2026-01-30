// src/data/students.js
// Student store with AsyncStorage persistence and pub/sub

import { Platform } from 'react-native';
let AsyncStorage;
try {
  // preferred community module
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  try {
    // fallback (older RN) - may not exist
    AsyncStorage = require('react-native').AsyncStorage;
  } catch (e2) {
    AsyncStorage = null;
    console.warn('AsyncStorage not available; students will not persist across restarts. Install @react-native-async-storage/async-storage for persistence.');
  }
}

const STORAGE_KEY = '@prospectus:students';

const students = [
  { id: 'S001', name: 'John Doe', program: 'BSIT', gpa: 3.7, grades: [{ courseCode: 'MATH101', grade: 'A' }] },
  { id: 'S002', name: 'Jane Smith', program: 'BSIS', gpa: 3.9, grades: [{ courseCode: 'ENG102', grade: 'A' }] },
];

const _listeners = new Set();
let _loaded = false;

async function loadFromStorage() {
  if (!AsyncStorage) return;
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // clear and push
        students.length = 0;
        parsed.forEach((s) => students.push(s));
      }
    }
  } catch (e) {
    console.warn('Failed to load students from storage:', e.message || e);
  } finally {
    _loaded = true;
    // notify listeners
    _listeners.forEach((l) => {
      try { l(getAllStudents()); } catch (e) { }
    });
  }
}

async function saveToStorage() {
  if (!AsyncStorage) return;
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (e) {
    console.warn('Failed to save students to storage:', e.message || e);
  }
}

// try load immediately (fire and forget)
loadFromStorage();

export function getAllStudents() {
  return students.slice();
}

export function findStudentById(id) {
  if (!id) return null;
  return students.find((s) => String(s.id).toLowerCase() === String(id).toLowerCase()) || null;
}

export function addStudent(student) {
  if (!student || !student.id || !student.name) return false;
  const id = String(student.id).trim();
  if (findStudentById(id)) return false; // already exists

  const s = {
    id: id,
    name: student.name,
    program: student.program || 'All',
    gpa: typeof student.gpa === 'number' ? student.gpa : (student.gpa ? Number(student.gpa) : null),
    grades: Array.isArray(student.grades) ? student.grades : [],
  };

  students.push(s);
  // persist
  saveToStorage();

  _listeners.forEach((l) => {
    try { l(getAllStudents()); } catch (e) { /* ignore */ }
  });
  return true;
}

export function updateStudent(id, changes) {
  const idx = students.findIndex((s) => String(s.id).toLowerCase() === String(id).toLowerCase());
  if (idx === -1) return false;
  students[idx] = { ...students[idx], ...changes };
  saveToStorage();
  _listeners.forEach((l) => {
    try { l(getAllStudents()); } catch (e) { /* ignore */ }
  });
  return true;
}

export function removeStudent(id) {
  const idx = students.findIndex((s) => String(s.id).toLowerCase() === String(id).toLowerCase());
  if (idx === -1) return false;
  students.splice(idx, 1);
  saveToStorage();
  _listeners.forEach((l) => {
    try { l(getAllStudents()); } catch (e) { /* ignore */ }
  });
  return true;
}

export function subscribeToStudents(listener) {
  if (typeof listener !== 'function') return () => {};
  _listeners.add(listener);
  // call immediately with current state (once loaded)
  if (_loaded) {
    try { listener(getAllStudents()); } catch (e) { }
  } else {
    // attempt to load first, then call when done
    loadFromStorage();
    try { listener(getAllStudents()); } catch (e) { }
  }

  return () => _listeners.delete(listener);
}

export default students;
