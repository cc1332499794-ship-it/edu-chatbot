import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleRegister = () => {
    if (name && email && password) {
      login({ id: Date.now().toString(), name, email });
      navigate('/');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: 320, padding: 30, background: 'white', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <h2>Регистрация</h2>
        <input type="text" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: 10, marginBottom: 10 }} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: 10, marginBottom: 10 }} />
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: 10, marginBottom: 10 }} />
        <button onClick={handleRegister} style={{ width: '100%', padding: 10, background: '#4f6ef6', color: 'white', border: 'none', borderRadius: 8 }}>Зарегистрироваться</button>
        <p style={{ marginTop: 10 }}>Уже есть аккаунт? <a href="/login">Войти</a></p>
      </div>
    </div>
  );
};

export default RegisterForm;