import React, { useState } from 'react';
import axios from 'axios';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/signin', {
        email,
        password,
      });

      setMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid email or password. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="SignIn">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
      </form>

      {message && <div className="message">{message}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
}

export default SignIn;

