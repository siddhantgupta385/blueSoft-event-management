'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../utils/api';
import styles from '../styles/Form.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    const response = await login({ username, password });
    if (response.access) {
      localStorage.setItem('token', response.access);
      router.push('/events');
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className={styles['form-container']}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;