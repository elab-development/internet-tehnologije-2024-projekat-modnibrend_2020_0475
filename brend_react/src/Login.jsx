import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); 
        navigate('/'); 
      } else {
        setError(data.message || 'Došlo je do greške. Pokušajte ponovo.');
      }
    } catch (error) {
      setError('Greška na serveru. Pokušajte kasnije.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Prijava</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Lozinka"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-button">Prijavi se</button>
      </form>
      {error && <p className="auth-error">{error}</p>}
      <p className="auth-text">Nemate nalog? <a href="/register">Registrujte se</a></p>
    </div>
  );
};

export default Login;
