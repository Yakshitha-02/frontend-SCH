import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ Use login from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post(`${API_URL}/api/v1/users/login`, {
        email,
        password
      });

      const { token } = response.data.data;

      login(token);               // ✅ Save token & set auth state
      navigate('/posts');         // ✅ Redirect after login
    } catch (err) {
      console.error(err);
      if (err.response?.data?.detail) {
        setMessage(`Error: ${err.response.data.detail}`);
      } else {
        setMessage('Error logging in. Please try again.');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label>Email:</label><br />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '6px' }}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label>Password:</label><br />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '6px' }}
          />
        </div>
        <button type="submit" style={{
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>Login</button>
      </form>
      {message && <p style={{ marginTop: '16px', color: 'red' }}>{message}</p>}
    </div>
  );
}
