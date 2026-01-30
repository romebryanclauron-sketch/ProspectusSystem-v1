// src/components/ProgramSelector.js
import React from 'react';
import DepartmentSelector from './DepartmentSelector';

// Thin wrapper to keep naming clear in UI usage
export default function ProgramSelector(props) {
  return <DepartmentSelector {...props} />;
}
