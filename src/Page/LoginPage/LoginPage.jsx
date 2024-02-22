
import React, { useState } from 'react';
import './LoginPage.css'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 const navigate=useNavigate()
  const handleLogin = () => {
    if (email === 'admin@demo.com' && password === 'admin') {
      console.log('Login successful');
      navigate('/profile')
      // You can redirect the user to another page upon successful login
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
   
      <div className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
