'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '../store';
import { login as apiLogin } from '../utils/api';
import styles from '../styles/Form.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await apiLogin({ username, password });
    if (response.access) {
      localStorage.setItem('token', response.access);
      localStorage.setItem('user', JSON.stringify({ username }));
      dispatch(login({ username }));
      router.push('/events');
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className={styles['form-container']}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
