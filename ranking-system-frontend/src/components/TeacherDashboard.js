import React, { useState, useEffect } from 'react';
import api from '../api/api';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/students');
        setStudents(response.data);
      } catch (err) {
        setError(err.message || 'Ошибка загрузки данных');
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Ученики</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {students.map(student => (
          <li key={student.id}>{student.name} - {student.rating} баллов</li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherDashboard;

