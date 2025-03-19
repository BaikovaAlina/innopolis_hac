
import React, { useState } from 'react';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import Chat from './components/Chat';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  if (!token) {
    return <Login setToken={setToken} setRole={setRole} setUserId={setUserId} />;
  }

  return (
    <div>
      {role === 'student' ? (
        <>
          <StudentDashboard userId={userId} />
          <Chat userId={userId} receiverId="teacherId" /> {/* Замените на ID учителя */}
        </>
      ) : (
        <>
          <TeacherDashboard />
          <Chat userId={userId} receiverId="studentId" /> {/* Замените на ID ученика */}
        </>
      )}
    </div>
  );
};

export default App;

