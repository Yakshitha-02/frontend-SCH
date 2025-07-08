import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post(`${API_URL}/api/v1/users/sign-up`, {
        email,
        password,
        name
      });
      console.log('Signup successful:', response.data);
      setMessage('Signup successful! Please login.');
      setEmail('');
      setPassword('');
      setName('');
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err);

      if (err.response && err.response.data) {
        // Most FastAPI errors are in err.response.data.detail
        const detail = err.response.data.detail;

        if (typeof detail === 'string') {
          setMessage(`Error: ${detail}`);
        } 
        else if (Array.isArray(detail)) {
          // Usually validation errors with loc and msg
          const messages = detail.map(item => {
            const path = item.loc ? item.loc.join('.') : '';
            return `${path}: ${item.msg}`;
          });
          setMessage(`Error: ${messages.join(', ')}`);
        } 
        else if (typeof detail === 'object') {
          // Any other structured error
          setMessage(`Error: ${JSON.stringify(detail, null, 2)}`);
        } 
        else {
          // Fallback
          setMessage(`Error: ${JSON.stringify(err.response.data)}`);
        }
      } 
      else {
        setMessage('Error signing up. Please try again.');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{message}</pre>}
    </div>
  );
}
