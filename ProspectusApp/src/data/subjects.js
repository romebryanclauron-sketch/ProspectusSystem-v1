// src/data/subjects.js
// Sample subject list and helper utilities for the prospectus/gradesheet

const subjects = [
  //Year 1, Semester 1
  // BSIT and BSIS Programs
  { courseCode: 'GEC-RPH', descriptiveTitle: 'Reading in Phillippine History', programs: ['BSIT','BSIS'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 1, semester: 1 },
  { courseCode: 'GEC-MMW', descriptiveTitle: 'Mathematics in the Modern World ', programs: ['BSIT','BSIS'], coPrerequisite: 'none', units: 3,lec:3, lab:0, hours: 3, remarks: ' ', year: 1, semester: 1 },
  { courseCode: 'GEE-TEM', descriptiveTitle: 'The Entrepreneurial Mind', programs: ['BSIT','BSIS'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 1, semester: 1 },
  { courseCode: 'CC 111', descriptiveTitle: 'Introduction to Computing', programs: ['BSIT','BSIS'], coPrerequisite: 'none', units: 3, lec:3, lab:2, hours: 5, remarks: ' ', year: 1, semester: 1 },
  { courseCode: 'CC 112', descriptiveTitle: 'Computer Programming 1 (Lec)', programs: ['BSIT','BSIS'], coPrerequisite: 'none', units: 2, lec:2, lab:0, hours: 2, remarks: ' ', year: 1, semester: 1 },
  { courseCode: 'CC 112 L', descriptiveTitle: 'Computer Programming 1 (Lab)', programs: ['BSIT','BSIS'], coPrerequisite: 'none', units: 3, lec:0, lab:9, hours: 9, remarks: ' ', year: 1, semester: 1 },
  { courseCode: 'AP 1', descriptiveTitle: 'Multimedia', programs: ['BSIT'], coPrerequisite: 'none', units: 3, lec:3, lab:2, hours: 5, remarks: ' ', year: 1, semester: 1 },
  { courseCode: 'PATHFIT 1', descriptiveTitle: 'Physical Activities Towards Health and Fitness 1: Movement Competency Training ', programs: ['BSIT','BSIS'], coPrerequisite: 'none', units: 2, lec:3, lab:0, hours: 2, remarks: ' ', year: 1, semester: 1 },
  { courseCode: 'NSTP 1', descriptiveTitle: 'National Service Training Program 1 ( CWST 1/ LTS 1 / ROTC 1)', programs: ['BSIT','BSIS'], coPrerequisite: 'none', units: 3, lec:3, lab:0,  hours: 3, remarks: ' ', year: 1, semester: 1 },
// BIT Programs
  { courseCode: 'CompTech 111', descriptiveTitle: 'Computer Electronics', programs: ['BIT'], coPrerequisite: 'none', units: 7, lec:3, lab:9, hours: 12, remarks: ' ', year: 1, semester: 1 },
  { courseCode: 'Draw 111', descriptiveTitle: 'Fundamentals of Technical Drawing and Sketching ', programs: ['BIT'], coPrerequisite: 'none', units: 1, lec:0, lab:3, hours: 3, remarks: ' ', year: 1, semester: 1 },
  { courseCode: 'AST 111', descriptiveTitle: 'Fundamental of Electrical and Electronics', programs: ['BIT'], coPrerequisite: 'none', units: 3,  lec:3, lab:0, hours: 3, remarks: ' ', year: 1, semester: 1 },
  { courseCode: 'GEC-PC', descriptiveTitle: 'Pursposive Communication', programs: ['BIT'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 1, semester: 1 },
  { courseCode: 'GEC-STS', descriptiveTitle: 'Science Technology and Society', programs: ['BIT'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 1, semester: 1 },
  { courseCode: 'GEC-US ', descriptiveTitle: 'Understanding the Self ', programs: ['BIT'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 1, semester: 1 },
  { courseCode: 'PE 1', descriptiveTitle: 'Physical Education', programs: ['BIT'], coPrerequisite: 'none', units: 2,lec:2, lab:0,  hours: 2,  remarks: ' ', year: 1, semester: 1 },
  { courseCode: 'NSTP 1', descriptiveTitle: 'National Service Training Program 1 ', programs: ['BIT'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 1, semester: 1 },

//Year 1, Semester 2
  // BSIT and BSIS Programs
  { courseCode: 'GEC-PC', descriptiveTitle: 'Pursposive Communication', programs: ['BSIT','BSIS'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 1, semester: 2 },
  { courseCode: 'GEC-STS', descriptiveTitle: 'Science Technology and Society', programs: ['BSIT','BSIS'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 1, semester: 2 },
  { courseCode: 'GEC-US ', descriptiveTitle: 'Understanding the Self ', programs: ['BSIT','BSIS'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 1, semester: 2 },
  { courseCode: 'GEE-GSPS ', descriptiveTitle: 'Gender and Society with Peace Studies ', programs: ['BSIT'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 1, semester: 2 },
  { courseCode: 'CC 123', descriptiveTitle: 'Computer Programming 2 (Lec)', programs: ['BSIT','BSIS'], coPrerequisite: 'CC 112, CC 112 L', units: 2, lec:2, lab:0, hours: 2, remarks: ' ', year: 1, semester: 2 },
  { courseCode: 'CC 123 L', descriptiveTitle: 'Computer Programming 2 (Lab)', programs: ['BSIT','BSIS'], coPrerequisite: 'CC 112, CC 112 L', units: 3, lec:0, lab:9, hours: 9, remarks: ' ', year: 1, semester: 2 },
  { courseCode: 'PC 121', descriptiveTitle: 'Discrete Mathematics', programs: ['BSIT','BSIS'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 1, semester: 2 },
  { courseCode: 'AP 2', descriptiveTitle: 'Digital Logic Design', programs: ['BSIT','BSIS'], coPrerequisite: 'CC 111', units: 3, lec:3, lab:2, hours: 5, remarks: ' ', year: 1, semester: 2 },
  { courseCode: 'PC 121', descriptiveTitle: 'Fundamental of Information Systems', programs: ['BSIS'], coPrerequisite: 'CC 111', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 1, semester: 2 },
  { courseCode: 'PC 122', descriptiveTitle: 'Organization and Management Concepts', programs: ['BSIS'], coPrerequisite: 'CC 111', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 1, semester: 2 },
  { courseCode: 'PATHFIT 2', descriptiveTitle: 'Physical Activities Towards Health and Fitness 2: Excercise-based Fithness Activities', programs: ['BSIT','BSIS'], coPrerequisite: 'PATHFIT 1', units: 2, lec:3, lab:0, hours: 2, remarks: ' ', year: 1, semester: 2 },
  { courseCode: 'NSTP 2', descriptiveTitle: 'National Service Training Program 1 ( CWST 2/ LTS 2 / ROTC 2)', programs: ['BSIT','BSIS'], coPrerequisite: 'NSTP 1', units: 3, lec:3, lab:0,  hours: 3, remarks: ' ', year: 1, semester: 2 },
  // BIT Programs
  { courseCode: 'CompTech 122', descriptiveTitle: 'Computer Systems', programs: ['BIT'], coPrerequisite: 'CompTech 111', units: 7, lec:3, lab:12, hours: 15, remarks: ' ', year: 1, semester: 2 },
  { courseCode: 'Draw 122', descriptiveTitle: 'Advance Technical Drawing and Blueprint Reading ', programs: ['BIT'], coPrerequisite: 'Draw 111', units: 1, lec:0, lab:3, hours: 3, remarks: ' ', year: 1, semester: 2 },
  { courseCode: 'Comp 1', descriptiveTitle: 'Office Productivity Application Software', programs: ['BIT'], coPrerequisite: 'none', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 1, semester: 2 },
  { courseCode: 'AST 122', descriptiveTitle: 'Digital Electronics', programs: ['BIT'], coPrerequisite: 'AST 111', units: 3, lec:3, lab:2,  hours: 5, remarks: ' ', year: 1, semester: 2 },
  { courseCode: 'GEC-RPH', descriptiveTitle: 'Reading in Phillippine History', programs: ['BIT'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 1, semester: 2 },
  { courseCode: 'PE 2', descriptiveTitle: 'Physical Education 2', programs: ['BSIT','BSIS'], coPrerequisite: 'PE 1', units: 2, lec:2, lab:0, lec:3, lab:0, hours: 2, remarks: ' ', year: 1, semester: 2 },
  { courseCode: 'NSTP 2 ', descriptiveTitle: 'National Service Training Program 2 ', programs: ['BIT'], coPrerequisite: 'NSTP 1', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 1, semester: 2 },
// 2nd Year
//1st Semester
// BSIT, BSIS Programs
  { courseCode: 'GEC-E', descriptiveTitle: 'Ethics', programs: ['BSIT','BSIS'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 2, semester: 1 },
  { courseCode: 'GEC-ES', descriptiveTitle: 'Environmental Science ', programs: ['BSIT','BSIS'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 2, semester: 1 },
  { courseCode: 'GEC-LWR ', descriptiveTitle: 'Life and Works of Rizal ', programs: ['BSIT','BSIS'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 2, semester: 1 },
  { courseCode: 'PC 212', descriptiveTitle: 'Quantitative Methods (Modeling & Simulations)', programs: ['BSIT'], coPrerequisite: 'PC 121', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 2, semester: 1 },
  { courseCode: 'CC 214', descriptiveTitle: 'Data Structures and Algorithm (Lec)', programs: ['BSIT','BSIS'], coPrerequisite: 'CC 123, CC 123 L', units: 2, lec:2, lab:0, hours: 2, remarks: ' ', year: 2, semester: 1 },
  { courseCode: 'CC 214 L', descriptiveTitle: 'Data Structures and Algorithm (Lab)', programs: ['BSIT','BSIS'], coPrerequisite: 'CC 123, CC 123 L', units: 3, lec:0, lab:9, hours: 9, remarks: ' ', year: 2, semester: 1 },
  { courseCode: 'P Elec 1', descriptiveTitle: 'Object-Oriented Programming', programs: ['BSIT'], coPrerequisite: 'CC 123, CC 123 L, AP 1', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 2, semester: 1 },
  { courseCode: 'P Elec 2', descriptiveTitle: 'Web Systems and Technologies', programs: ['BSIT'], coPrerequisite: 'CC 123, CC 123 L, AP 1', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 2, semester: 1 },
  { courseCode: 'PC 213', descriptiveTitle: 'Professional Issues in Information Systems', programs: ['BSIS'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 2, semester: 1 },
  { courseCode: 'PC 214', descriptiveTitle: 'Financial Management', programs: ['BSIS'], coPrerequisite: 'PC 122', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 2, semester: 1 },
  { courseCode: 'AP 1', descriptiveTitle: 'Computer Architecture and Organization', programs: ['BSIS'], coPrerequisite: 'CC 123, CC 123 L', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 2, semester: 1 },
  { courseCode: 'PATHFIT 3', descriptiveTitle: 'Physical Activities Towards Health and Fitness 3: Dance/Sports/ Martial Arts/ Group Excercise/ Outdoor and Adventure  Activities', programs: ['BSIT','BSIS'], coPrerequisite: 'PATHFIT 1 and 2', units: 2, lec:3, lab:0, hours: 2, remarks: ' ', year: 2, semester: 1 },

//BIT Programs
  { courseCode: 'CompTech 213', descriptiveTitle: 'Computer Network and Security', programs: ['BIT'], coPrerequisite: 'CompTech 122', units: 7, lec:3, lab:12, hours: 15, remarks: ' ', year: 2, semester: 1 },
  { courseCode: 'CTC 211', descriptiveTitle: 'Fundamentals of Programming ', programs: ['BIT'], coPrerequisite: 'none', units: 2, lec:0, lab:6, hours: 6, remarks: ' ', year: 2, semester: 1 },
  { courseCode: 'Draw 213', descriptiveTitle: 'Computer-Aided Design 1 (CAD 1) ', programs: ['BIT'], coPrerequisite: 'Draw 111', units: 1, lec:0, lab:3, hours: 3, remarks: ' ', year: 2, semester: 1 },
  { courseCode: 'AST 213', descriptiveTitle: 'Basic Pneumatics/ Hydraulics', programs: ['BIT'], coPrerequisite: 'AST 122', units: 1, lec:3, lab:0,  hours: 3, remarks: ' ', year: 2, semester: 1 },
  { courseCode: 'GEC-TCW', descriptiveTitle: 'The Contemporay World', programs: ['BIT'], coPrerequisite: 'none', units: 1, lec:3, lab:0, hours: 3, remarks: ' ', year: 2, semester: 1 },
  { courseCode: 'GEC-AA', descriptiveTitle: 'Art Appreciation', programs: ['BIT'], coPrerequisite: 'none', units: 3,lec:3, lab:0, hours: 3, remarks: ' ', year: 2, semester: 1 },
  { courseCode: 'GEE-LIE', descriptiveTitle: 'Living in the IT ERA', programs: ['BIT'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 2, semester: 1 },
  { courseCode: 'PE 3', descriptiveTitle: 'Physical Education 3', programs: ['BIT'], coPrerequisite: 'None', units: 2, lec:2, lab:0, lec:3, lab:0, hours: 2, remarks: ' ', year: 2, semester: 1 },

//2nd Semester
// BSIT, BSIS Programs
 { courseCode: 'GEC-TCW', descriptiveTitle: 'The Contemporay World', programs: ['BSIT','BSIS'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 2, semester: 2 },
  { courseCode: 'PC 223', descriptiveTitle: 'Integrative Programming and Technologies 1', programs: ['BSIT'], coPrerequisite: 'CC 123, CC 123 L', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 2, semester: 2 },
 { courseCode: 'GEE-GSPS ', descriptiveTitle: 'Gender and Society with Peace Studies ', programs: [,'BSIS'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 2, semester: 2 },
 { courseCode: 'PC 224', descriptiveTitle: 'Networking', programs: ['BSIT'], coPrerequisite: 'AP 2', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 2, semester: 2 },
 { courseCode: 'GEE_PEE', descriptiveTitle: 'People and the Earth s Ecosystem', programs: ['BSIS'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 2, semester: 2 },
{ courseCode: 'CC 214', descriptiveTitle: 'Information Management (Lec) ', programs: ['BSIT','BSIS'], coPrerequisite: 'CC 214, CC 214 L', units: 2, lec:2, lab:0, hours: 2, remarks: ' ', year: 2, semester: 2 },
  { courseCode: 'CC 214 L', descriptiveTitle: 'Information Management (Lab)', programs: ['BSIT','BSIS'], coPrerequisite: 'CC 214, CC 214 L', units: 3, lec:0, lab:9, hours: 9, remarks: ' ', year: 2, semester: 2 },
  { courseCode: 'GEC-STS', descriptiveTitle: 'Platform Technologies', programs: ['BSIT'], coPrerequisite: '2nd Year Standing', units: 3, lec:0, lab:9, hours: 9, remarks: ' ', year: 2, semester: 2 },
  { courseCode: 'P Elec 3', descriptiveTitle: 'ASP.NET', programs: ['BSIT'], coPrerequisite: 'none', units: 3, lec:3, lab:2, hours: 5, remarks: ' ', year: 2, semester: 2 },
  { courseCode: 'AP 3', descriptiveTitle: 'IT Infrastructure and Network Technologies', programs: ['BSIS'], coPrerequisite: 'AP 1', units: 3, lec:0, lab:9, hours: 9, remarks: ' ', year: 2, semester: 2 },
  { courseCode: 'PCC 225', descriptiveTitle: 'Business Process Management', programs: ['BSIS'], coPrerequisite: 'PC 214', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 2, semester: 2 },
  { courseCode: 'PC 226', descriptiveTitle: 'Web 1: Client Development ', programs: ['BSIS'], coPrerequisite: 'none', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 2, semester: 2 },
  { courseCode: 'PATHFIT 4', descriptiveTitle: 'Physical Activities Towards Health and Fitness 4: Dance/Sports/ Martial Arts/ Group Excercise/ Outdoor and Adventure  Activities', programs: ['BSIT','BSIS'], coPrerequisite: 'PATHFIT 1 and 2', units: 2, lec:3, lab:0, hours: 2, remarks: ' ', year: 2, semester: 2 },

//BIT Programs
  { courseCode: 'CompTech 224', descriptiveTitle: 'Programming', programs: ['BIT'], coPrerequisite: 'CompTech 213, CTC 211', units: 7, lec:3, lab:12, hours: 15, remarks: ' ', year: 2, semester: 2 },
  { courseCode: 'CTC 222', descriptiveTitle: 'Programming Logic and Design', programs: ['BIT'], coPrerequisite: 'CTC 211', units: 2, lec:0, lab:3, hours: 3, remarks: ' ', year: 2, semester: 2 },
  { courseCode: 'CTC 223', descriptiveTitle: 'Logic Circuit', programs: ['BIT'], coPrerequisite: 'CTC 211', units: 2, lec:0, lab:3, hours: 3, remarks: ' ', year: 2, semester: 2 },
  { courseCode: 'Draw 224', descriptiveTitle: 'Computer-Aided Design 2 (CAD 2) ', programs: ['BIT'], coPrerequisite: 'Draw 113', units: 1, lec:0, lab:3, hours: 3, remarks: ' ', year: 2, semester: 2 },
  { courseCode: 'AST 224', descriptiveTitle: 'Programmer Logic Controller', programs: ['BIT'], coPrerequisite: 'AST 213', units: 1, lec:3, lab:3,  hours: 3, remarks: ' ', year: 2, semester: 2 },
{    courseCode: 'GEC-ES', descriptiveTitle: 'Environmental Science ', programs: ['BIT'], coPrerequisite: 'none', units: 0, lec:3, lab:0, hours: 3, remarks: ' ', year: 2, semester: 2 },
  {  courseCode: 'GEC-MMW', descriptiveTitle: 'Mathematics in the Modern World ', programs: ['BIT'], coPrerequisite: 'none', units: 3,lec:3, lab:0, hours: 3, remarks: ' ', year: 2, semester: 2 },
{ courseCode: 'PE 4', descriptiveTitle: 'Physical Education 4', programs: ['BIT'], coPrerequisite: 'None', units: 2, lec:2, lab:0, lec:3, lab:0, hours: 2, remarks: ' ', year: 2, semester: 2 },

//3rd Year
//1st Semester
// BSIT Programs
  { courseCode: 'GEE-FE', descriptiveTitle: 'Functional English', programs: ['BSIT'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 1 },
  { courseCode: 'PC 315', descriptiveTitle: 'Networking 2 (Lec)', programs: ['BSIT'], coPrerequisite: 'PC 224', units: 2, lec:2, lab:0, hours: 3, remarks: ' ', year: 3, semester: 1 },
  { courseCode: 'PC 315L', descriptiveTitle: 'Networking 2 (Lab)', programs: ['BSIT'], coPrerequisite: 'PC 224', units: 3, lec:0, lab:9, hours: 9, remarks: ' ', year: 3, semester: 1 },
  { courseCode: 'PC 316', descriptiveTitle: ' Systems Integration and Architecture 1', programs: ['BSIT'], coPrerequisite: 'PC 223', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 3, semester: 1 },
  { courseCode: 'PC 317', descriptiveTitle: 'Introduction to Human  Computer Interactions', programs: ['BSIT'], coPrerequisite: 'AP1, CC 225/CC 225 L', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 3, semester: 1 },
  { courseCode: 'PC 3180', descriptiveTitle: 'Database Management Systems', programs: ['BSIT'], coPrerequisite: 'CC 225,CC 225 L', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 3, semester: 1 },
  { courseCode: 'CC 31 CC 316', descriptiveTitle: 'Application Development and Emerging Technologies', programs: ['BSIT'], coPrerequisite: 'CC 225,CC 225 L', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 3, semester: 1 },

// BSIS Programs
{ courseCode: 'PC 317', descriptiveTitle: 'System Analysis and Design(Lec)', programs: ['BSIS'], coPrerequisite: 'CC 225,CC 225 L', units: 2, lec:2, lab:0, hours: 3, remarks: ' ', year: 3, semester: 1 },
  { courseCode: 'PC 317 L', descriptiveTitle: 'System Analysis and Design (Lab)', programs: ['BSIS'], coPrerequisite: 'CC 225,CC 225 L', units: 3, lec:0, lab:9, hours: 9, remarks: ' ', year: 3, semester: 1 },
  { courseCode: 'PC 318', descriptiveTitle: 'Enterprise Architecture', programs: ['BSIS'], coPrerequisite: 'PC 225', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 3, semester: 1 },
  { courseCode: 'PC 319', descriptiveTitle: 'Evaluation of Business Performance', programs: ['BSIS'], coPrerequisite: '226', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 1 },
  { courseCode: 'PC 3110', descriptiveTitle: 'Qualitative Methods', programs: ['BSIS'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 1 },
  { courseCode: 'AP 3', descriptiveTitle: 'Web II Web Application Development', programs: ['BSIS'], coPrerequisite: 'AP 2', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 3, semester: 1 },
  { courseCode: 'AP 4', descriptiveTitle: 'Database Administration DBMS', programs: ['BSIS'], coPrerequisite: 'CC 225,CC 225 L', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 3, semester: 1 },
//BIT Programs
   { courseCode: 'CompTech 315', descriptiveTitle: 'Microprocessor System', programs: ['BIT'], coPrerequisite: 'CompTech 224', units: 7, lec:3, lab:12, hours: 15, remarks: ' ', year: 3, semester: 1 },
  { courseCode: 'IM 311', descriptiveTitle: 'Fundamentals of Research', programs: ['BIT'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 1 },
  { courseCode: 'IM 312', descriptiveTitle: 'Industrial Psychology and Group Dynamics', programs: ['BIT'], coPrerequisite: 'CTC 211', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 1 },
  { courseCode: 'IM 313', descriptiveTitle: 'Occupational Safety and Health ', programs: ['BIT'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 1 },
{    courseCode: 'IM 314', descriptiveTitle: 'Shop Supervision and Apprenticeship Training ', programs: ['BIT'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 1 },
   { courseCode: 'AST 315', descriptiveTitle: 'Workshop Management', programs: ['BIT'], coPrerequisite: 'none', units: 3, lec:3, lab:3,  hours: 3, remarks: ' ', year: 3, semester: 1 },
{  courseCode: 'GEE-FE', descriptiveTitle: 'Functional English', programs: ['BIT'], coPrerequisite: 'none', units: 3,lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 1 },
{ courseCode: 'FoLa 1', descriptiveTitle: 'Chinese 1/ Korean 1/ Nihonggo 1 / Spanish 1', programs: ['BIT'], coPrerequisite: 'None', units: 3, lec:2, lab:0, lec:3, lab:0, hours: 2, remarks: ' ', year: 3, semester: 1 },
//2nd Semester
// BSIT and BSIS Programs
  { courseCode: 'GEC-AA', descriptiveTitle: 'Art Appreciation', programs: ['BSIT','BSIS'], coPrerequisite: 'none', units: 3,lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 2 },
  { courseCode: 'GEE_PEE', descriptiveTitle: 'People and the Earth s Ecosystem', programs: ['BSIT'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 2 },
  { courseCode: 'PC 329', descriptiveTitle: 'Capstone Project and Research 1', programs: ['BSIT'], coPrerequisite: '3rd Year Standing', units: 3,lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 2 },
  { courseCode: 'PC 3210', descriptiveTitle: 'Social and Professional Issues', programs: ['BSIT'], coPrerequisite: 'none', units: 3,lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 2 },
{ courseCode: 'PC 3111', descriptiveTitle: 'Information Assurance and Security (Lec) ', programs: ['BSIT'], coPrerequisite: 'PC 315,PC 315L ', units: 2, lec:2, lab:0, hours: 3, remarks: ' ', year: 3, semester: 2 },
  { courseCode: 'PC 3111L', descriptiveTitle: 'Information Assurance and Security (Lab)', programs: ['BSIT'], coPrerequisite: 'PC 315,PC 315L ', units: 3, lec:0, lab:9, hours: 9, remarks: ' ', year: 3, semester: 2 },
  { courseCode: 'AP 4', descriptiveTitle: 'iOS Mobile Application Development Cross-Platform ', programs: ['BSIT'], coPrerequisite: 'PC 223', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 3, semester: 2 },
  { courseCode: 'AP 5', descriptiveTitle: 'Technologies and the Application of the Internet of Things', programs: ['BSIT'], coPrerequisite: 'CC 316', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 3, semester: 2 },
  { courseCode: 'PC-3211', descriptiveTitle: 'IS Project Management 1', programs: ['BSIS'], coPrerequisite: 'PC 317, PC 317 L', units: 3,lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 2 },
  { courseCode: 'PC-3112', descriptiveTitle: 'Capstone Project 1', programs: ['BSIS'], coPrerequisite: 'PC 317, PC 317 L', units: 3,lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 2 },
  { courseCode: 'P Elec 1', descriptiveTitle: 'Data Mining', programs: ['BSIS'], coPrerequisite: 'AP 4', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 3, semester: 2 },
  { courseCode: 'P Elec 2', descriptiveTitle: 'Customer Relationship Management', programs: ['BSIS'], coPrerequisite: 'PC 319', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 3, semester: 2 },
  { courseCode: 'CC 326', descriptiveTitle: 'Application Development and Emerging Technologies', programs: ['BSIS'], coPrerequisite: 'PC 317, PC 317 L', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 3, semester: 2 },
  { courseCode: 'AP 5', descriptiveTitle: 'Foundation of Software Engineering', programs: ['BSIS'], coPrerequisite: 'PC 317, PC 317 L', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 3, semester: 2 },
  { courseCode: 'AP 6', descriptiveTitle: 'System Administration and Maintenance', programs: ['BSIS'], coPrerequisite: 'PC 225', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 3, semester: 2 },
//BIT Programs
  { courseCode: 'CompTech 326', descriptiveTitle: 'Embedded Systems', programs: ['BIT'], coPrerequisite: 'CompTech 315', units: 7, lec:3, lab:12, hours: 15, remarks: ' ', year: 3, semester: 1 },
{ courseCode: 'IM 325', descriptiveTitle: 'Industrial Organization and Management', programs: ['BIT'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 1 },
  { courseCode: 'IM 326', descriptiveTitle: 'Personnel Administration', programs: ['BIT'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 1 },
  { courseCode: 'IM 327', descriptiveTitle: 'Organization Behavior and Work Ethics ', programs: ['BIT'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 1 },
{    courseCode: 'IM 328', descriptiveTitle: 'Product Output (Research) ', programs: ['BIT'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 1 },
   { courseCode: 'AST 326', descriptiveTitle: 'Emerging Technologies', programs: ['BIT'], coPrerequisite: 'none', units: 3, lec:3, lab:3,  hours: 3, remarks: ' ', year: 3, semester: 1 },
{ courseCode: 'GEC-LWR ', descriptiveTitle: 'Life and Works of Rizal ', programs: ['BIT'], coPrerequisite: 'none', units: 3, lec:3, lab:0, hours: 3, remarks: ' ', year: 3, semester: 1 },
{ courseCode: 'FoLa 2', descriptiveTitle: 'Chinese 2/ Korean 2/ Nihonggo 2 / Spanish 2', programs: ['BIT'], coPrerequisite: 'None', units: 3, lec:2, lab:0, lec:3, lab:0, hours: 2, remarks: ' ', year: 3, semester: 1 },

  //4th Year
  //1st Semester
  // BSIT Programs
  { courseCode: 'PC 4412', descriptiveTitle: 'Platform Information Assurance and Security (Lec) ', programs: ['BSIT'], coPrerequisite: 'PC 3211, PC 3211 L', units: 2, lec:2, lab:0, hours: 2, remarks: ' ', year: 4, semester: 1 },
    { courseCode: 'PC 4412', descriptiveTitle: 'Platform Information Assurance and Security (Lab) ', programs: ['BSIT'], coPrerequisite: 'PC 3211, PC 3211 L', units: 3, lec:0, lab:9, hours: 9, remarks: ' ', year: 4, semester: 1 },
  { courseCode: 'PC 4113', descriptiveTitle: 'System Administration and Maintenance', programs: ['BSIT'], coPrerequisite: 'PC 3211, PC 3211 L', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 3, semester: 2 },
    { courseCode: 'PC 4114', descriptiveTitle: 'Capstone Project and Research 2', programs: ['BSIT'], coPrerequisite: 'PC 329', units: 3,lec:3, lab:0, hours: 3, remarks: ' ', year: 4, semester: 1 },
    { courseCode: 'PC 4113', descriptiveTitle: 'Systems Integration and Architecture 2', programs: ['BSIT'], coPrerequisite: 'PC 316', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 3, semester: 2 },
    { courseCode: 'PC 4113', descriptiveTitle: 'Cross Platform Script Development and Technology', programs: ['BSIT'], coPrerequisite: 'PC 316', units: 3, lec:2, lab:3, hours: 5, remarks: ' ', year: 3, semester: 2 },
 // BSIS Programs
    { courceCode: 'GEE-FE', descriptiveTitle: 'Functional English', programs: ['BSIS'], coPrerequisite: 'none', units: 3,lec:3, lab:0, hours: 3, remarks: ' ', year: 4, semester: 1 },
 { courseCode: 'PC-4213', descriptiveTitle: 'IS Strategy, Management and Acquisition', programs: ['BSIS'], coPrerequisite: 'PC-3211', units: 3,lec:3, lab:0, hours: 3, remarks: ' ', year: 4, semester: 1 },
{courseCode: 'PC-4114', descriptiveTitle: 'Capstone Project 2', programs: ['BSIS'], coPrerequisite: 'PC-3212', units: 3,lec:3, lab:0, hours: 3, remarks: ' ', year: 4, semester: 1 },
{courseCode: 'P Elec 3', descriptiveTitle: 'Enterprise System', programs: ['BSIS'], coPrerequisite: 'PC-318', units: 3,lec:3, lab:0, hours: 3, remarks: ' ', year: 4, semester: 1 },
{courseCode: 'P Elec 4', descriptiveTitle: 'IT Audit and Controls', programs: ['BSIS'], coPrerequisite: 'PC-3111', units: 3,lec:3, lab:0, hours: 3, remarks: ' ', year: 4, semester: 1 },
//BIT Programs
   { courseCode: 'OJT 411', descriptiveTitle: 'On-The-Job-Training 1', programs: ['BIT'], coPrerequisite: '4th Year ', units: 15, lec:0, lab:0, hours: 729, remarks: ' ', year: 4, semester: 1 },

//2nd Semester
//BSIT
   { courseCode: 'PC 4215', descriptiveTitle: 'On-The-Job-Training', programs: ['BSIT'], coPrerequisite: '4th Year ', units: 9, lec:0, lab:0, hours: 729, remarks: ' ', year: 4, semester: 2 },
 //BSIS
   { courseCode: 'PC 3215', descriptiveTitle: 'On-The-Job-Training', programs: ['BSIS'], coPrerequisite: '4th Year ', units: 9, lec:0, lab:0, hours: 729, remarks: ' ', year: 4, semester: 2 },
//BIT Programs
   { courseCode: 'OJT 411', descriptiveTitle: 'On-The-Job-Training 2', programs: ['BIT'], coPrerequisite: '4th Year ', units: 15, lec:0, lab:0, hours: 729, remarks: ' ', year: 4, semester: 2 },

  ];

export function getAllDepartments() {
  const set = new Set(subjects.map((s) => s.department || 'General'));
  return ['All', ...Array.from(set).sort()];
}

export function getAllPrograms() {
  const set = new Set();
  subjects.forEach((s) => {
    if (Array.isArray(s.programs)) s.programs.forEach((p) => set.add(p));
  });
  return ['All', ...Array.from(set).sort()];
}  

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

// Minimal runtime API used by dashboards
export function getAllSubjects() {
  return subjects.slice();
}

// No-op subscription (future-proofing if runtime addition is implemented later)
export function subscribeToSubjects(listener) {
  // accept a function and immediately return an unsubscribe no-op
  if (typeof listener === 'function') {
    try { listener(getAllSubjects()); } catch (e) { /* ignore */ }
  }
  return () => {};
}

export default subjects;
