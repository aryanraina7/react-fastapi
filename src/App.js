import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const apiUrl = isSignUp
      ? `${process.env.REACT_APP_API_URL}/signup`
      : `${process.env.REACT_APP_API_URL}/signin`;

    try {
      const response = await axios.post(apiUrl, {
        username,
        email,
        password,
      });
      if (isSignUp) {
        setMessage(`User created: ${response.data.username}`);
      } else {
        setMessage(`Welcome back, ${response.data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.detail || error.message}`);
    }
  };

  return (
    <div className="App">
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;

