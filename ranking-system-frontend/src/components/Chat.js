import React, { useState, useEffect } from 'react';
import api from '../api/api';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chat = ({ userId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(`/messages/${userId}/${receiverId}`);
        setMessages(response.data);
      } catch (err) {
        setError(err.message || 'Ошибка загрузки сообщений');
      }
    };
    fetchMessages();

    socket.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [userId, receiverId]);

  const handleSend = async () => {
    if (!text) return;

    try {
      await api.post('/messages/send', { sender: userId, receiver: receiverId, text });
      setText('');
    } catch (err) {
      setError(err.message || 'Ошибка отправки сообщения');
    }
  };

  return (
    <div>
      <h2>Чат</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {messages.map((msg) => (
          <div key={msg._id}>
            <strong>{msg.sender === userId ? 'Вы' : 'Учитель'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSend}>Отправить</button>
    </div>
  );
};

export default Chat;

