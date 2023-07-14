import React, { useState } from 'react';
import './App.css';

// Read the student data from studentsData.json
import studentsData from './data.json';

function App() {
  const [studentData, setStudentData] = useState(null);
  const [collegeName, setCollegeName] = useState('');
  const [department, setDepartment] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [hoveredStudent, setHoveredStudent] = useState(null);
  const [error, setError] = useState('');

  const fetchStudentDetails = () => {
    const student = studentsData.students.find((student) => student.roll_number === rollNumber);

    if (student) {
      setStudentData(student);
      setError('');
    } else {
      setStudentData(null);
      setError('Student not found');
    }
  };

  const fetchAllStudentsByCollege = () => {
    if (collegeName.trim() === '') {
      setError('Please enter a valid college name');
      return;
    }

    const filteredStudents = studentsData.students.filter((student) => student.college === collegeName);
    if (filteredStudents.length > 0) {
      setStudentData(filteredStudents);
      setError('');
    } else {
      setStudentData(null);
      setError('No students found for the specified college');
    }
  };

  const fetchAllStudentsByCollegeAndDepartment = () => {
    if (collegeName.trim() === '' || department.trim() === '') {
      setError('Please enter a valid college name and department');
      return;
    }

    const filteredStudents = studentsData.students.filter(
      (student) => student.college === collegeName && student.department === department
    );
    if (filteredStudents.length > 0) {
      setStudentData(filteredStudents);
      setError('');
    } else {
      setStudentData(null);
      setError('No students found for the specified college and department');
    }
  };

  const handleRollNumberChange = (event) => {
    setRollNumber(event.target.value);
  };

  const handleCollegeNameChange = (event) => {
    setCollegeName(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleHover = (rollNumber) => {
    const student = studentsData.students.find((student) => student.roll_number === rollNumber);
    setHoveredStudent(student);
  };

  return (
    <div className="container">
      <h1>Student Information</h1>
      <section>
        <h2>Fetch Individual Student Data</h2>
        <div>
          <input
            type="text"
            placeholder="Enter Roll Number"
            value={rollNumber}
            onChange={handleRollNumberChange}
          />
          <button onClick={fetchStudentDetails}>Fetch Student</button>
        </div>
      </section>
      <section>
        <h2>Fetch All Students by College</h2>
        <div>
          <input
            type="text"
            placeholder="Enter College Name"
            value={collegeName}
            onChange={handleCollegeNameChange}
          />
          <button onClick={fetchAllStudentsByCollege}>Fetch Students</button>
        </div>
      </section>
      <section>
        <h2>Fetch All Students by College and Department</h2>
        <div>
          <input
            type="text"
            placeholder="Enter College Name"
            value={collegeName}
            onChange={handleCollegeNameChange}
          />
          <input
            type="text"
            placeholder="Enter Department"
            value={department}
            onChange={handleDepartmentChange}
          />
          <button onClick={fetchAllStudentsByCollegeAndDepartment}>Fetch Students</button>
        </div>
      </section>
      {hoveredStudent && (
        <section>
          <h2>Hovered Student Details</h2>
          <div className="student">
            <span>Roll Number: {hoveredStudent.roll_number}</span>
            <span>Name: {hoveredStudent.name}</span>
            <span>Email: {hoveredStudent.email}</span>
            <span>College: {hoveredStudent.college}</span>
            <span>Department: {hoveredStudent.department}</span>
          </div>
        </section>
      )}
      {studentData && !Array.isArray(studentData) && (
        <section>
          <h2>Student Details</h2>
          <div className="student">
            <span>Roll Number: {studentData.roll_number}</span>
            <span>Name: {studentData.name}</span>
            <span>Email: {studentData.email}</span>
            <span>College: {studentData.college}</span>
            <span>Department: {studentData.department}</span>
          </div>
        </section>
      )}
      {studentData && Array.isArray(studentData) && (
        <section>
          <h2>Student List</h2>
          {studentData.map((student) => (
            <div
              key={student.roll_number}
              className="student-group"
              onMouseEnter={() => handleHover(student.roll_number)}
              onMouseLeave={() => setHoveredStudent(null)}
            >
              <span>{student.roll_number}</span>
              <span>{student.name}</span>
            </div>
          ))}
        </section>
      )}
      {error && (
        <div className="error">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default App;
