import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import iiitbLogo from './logo.png';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');
  const [placementFilter, setPlacementFilter] = useState('');
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      const response = await axios.get('http://localhost:9001/student', {
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('No students found for this keyword');
    }
  };

  const handleSearchFocus = () => {
    setError('');
    setKeyword('');
    fetchStudents();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleFilterChange = (e) => {
    setPlacementFilter(e.target.value);
  };

  const filteredStudents = students.filter(student => {
    if (placementFilter === '') return true;
    return student[10] === placementFilter;
  });

  return (
    <div className="dashboard-container">
      <div className="header">
        <div className="logo-container">
          <img src={iiitbLogo} alt="IIITB Logo" className="iiitb-logo" />
        </div>
        <div className="title-container">
          <h1>STUDENT DASHBOARD</h1>
        </div>
        <a href="/" className="logout-link" onClick={handleLogout}>
          Logout
        </a>
      </div>

      <div className="search-container">
  <div className="search-wrapper">
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        placeholder="Search by keyword..."
        value={keyword}
        onFocus={handleSearchFocus}
        onChange={(e) => setKeyword(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <i className="fa fa-search">&nbsp;Search</i>
      </button>
    </form>
  </div>
  <div className="placement-filter">
    <select 
      value={placementFilter} 
      onChange={handleFilterChange} 
      className="filter-select"
    >
      <option value="">All Students</option>
      <option value="Placed">Placed</option>
      <option value="Unplaced">Unplaced</option>
    </select>
  </div>
</div>

      

      {error && <div className="error-message">{error}</div>}

      <div className="students-list">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <div key={index} className="student-card">
              <h3>{student[0]} {student[1]}</h3>
              <p><strong>Course:</strong> {student[2]}</p>
              <p><strong>Specialization Code:</strong> {student[3]}</p>
              <p><strong>Specialization Description:</strong> {student[4]}</p>
              <p><strong>Placement Organization:</strong> {student[5]}</p>
              <p><strong>Join Date:</strong> {student[6]}</p>
              <p><strong>Leave Date:</strong> {student[7]}</p>
              <p><strong>Graduation Year:</strong> {student[8]}</p>
              <p><strong>Alumni Status:</strong> {student[9]}</p>
              <p><strong>Placement Status:</strong> {student[10]}</p>
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
