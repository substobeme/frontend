import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';  

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      
      if (!token) {
        navigate('/');
        return;
      }

      const response = await axios.get('http://localhost:9001/student', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setStudents(response.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching student data');
    }
  };


  useEffect(() => {
    fetchStudents();
  }, []);


  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/');
        return;
      }

      const response = await axios.get(`http://localhost:9001/student/${keyword}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setStudents(response.data);
    } catch (err) {
      console.error(err);
      setError('No students found for this keyword');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Student Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search by keyword..." 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="students-list">
        {students.length > 0 ? (
          students.map((student, index) => (
            <div key={index} className="student-card">
              <h3>{student.first_name} {student.last_name}</h3>
              <p><strong>Specialization:</strong> {student.specialization}</p>
              <p><strong>Graduation Year:</strong> {student.graduation_year}</p>
              <p><strong>Placement Organization:</strong> {student.placement_organisation}</p>
              <p><strong>Alumni Status:</strong> {student.is_alumni}</p>
              <p><strong>Placement Status:</strong> {student.is_placed}</p>
              <p><strong>Join Date:</strong> {student.join_date}</p>
              <p><strong>Leave Date:</strong> {student.leave_date}</p>
            </div>
          ))
        ) : (
          <div>No students to display</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

