import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const apiUrl = process.env.REACT_APP_API_URL; // Accessing the API URL from the .env file

    try {
      // Sending the POST request to the FastAPI backend
      const response = await axios.post(`${apiUrl}/signup`, {
        username,
        email,
        password,
      });

      // Handle success
      setMessage(`User ${response.data.username} signed up successfully!`);
    } catch (error) {
      // Handle errors (network, response, etc.)
      setMessage(`Error: ${error.response ? error.response.data.detail : error.message}`);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;

