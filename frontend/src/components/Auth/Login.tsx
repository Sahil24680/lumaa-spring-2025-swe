import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  // State for storing user input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  // Handle user login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:5001/auth/login', {
        username,
        password,
      });

      // Store access token in local storage
      localStorage.setItem('accessToken', response.data.accessToken);

      // Show success message and redirect to tasks page
      toast.success('Login successful!'); 
      navigate('/tasks');
    } catch (err: any) {
      // Show error message for invalid credentials
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>

        
      </form>
    </div>
  );
};

export default Login;
