import React, { useState } from 'react';
import api from '../api/api';

const Login = ({ setToken, setRole, setUserId }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!code) {
      setError('Код обязателен');
      return;
    }

    try {
      const response = await api.post('/auth/login', { code });
      setToken(response.data.token);
      setRole(response.data.role);
      setUserId(response.data.userId);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка авторизации');
    }
  };

  return (
    <div>
      <h2>Авторизация</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите код"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;

