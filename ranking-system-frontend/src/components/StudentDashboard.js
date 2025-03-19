import React, { useState, useEffect } from 'react';
import api from '../api/api';

const StudentDashboard = ({ userId }) => {
  const [games, setGames] = useState([]);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/students/${userId}`);
        setGames(response.data.games);
        setRating(response.data.rating);
      } catch (err) {
        setError(err.message || 'Ошибка загрузки данных');
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div>
      <h2>Ваш рейтинг: {rating}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3>Ваши игры:</h3>
      <ul>
        {games.map(game => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
