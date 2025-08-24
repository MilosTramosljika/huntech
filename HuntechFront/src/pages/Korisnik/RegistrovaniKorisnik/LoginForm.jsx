import React, { useState } from 'react';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ovde ide poziv ka backendu, npr. fetch('/api/login', ...)
    console.log('Prijava:', { username, password });
  };

  return (
    <div className={styles.container}>
      <h2>Prijava korisnika</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="username">Korisničko ime:</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Lozinka:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Prijavi se</button>
      </form>
    </div>
  );
};

export default LoginForm;