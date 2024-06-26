import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import css from './Login.module.css';

export default function Login() {
  const {autorizado, setAutorizado} = useContext(Context)
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const correctPassword = '1234'; 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setAutorizado(true)
      navigate('/');
    } else {
      alert('Palavra passe incorreta!');
    }
  };

  return (
    <div className={css.container}>
      <h1>Academia de Futebol</h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="password"
          placeholder="Palavra Passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}