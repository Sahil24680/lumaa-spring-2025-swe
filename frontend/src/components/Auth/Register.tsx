import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  // State for storing user input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle user registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send registration request to backend
      const response = await axios.post('http://localhost:5001/auth/register', {
        username,
        password,
      });

      // Show success message and redirect to login page
      alert(response.data.message);
      navigate('/login');
    } catch (err: any) {
      // Show error message if registration fails
      setError(err.response.data.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        {/* Input for username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Input for password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Submit button */}
        <button type="submit">Register</button>

        {/* Error message display */}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
