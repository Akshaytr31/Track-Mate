import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // Ensure correct path to firebase config
import "./Login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For redirecting

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset previous errors

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('isLoggedIn', 'true'); // Save login state
      navigate('/body'); // Redirect to Body page
    } catch (err) {
      setError('Invalid email or password'); // Display friendly error
      console.error('Login error:', err);
    }
  };

  return (
    <div className="signup-div">
      <div className="container">
        <div className="container-elm1">
          <h2 className="head">Welcome to TrackMate</h2>
          <p>
            TrackMate monitors and visualizes the time employees spend in front of their computers, 
            providing insightful graphs to analyze productivity. Stay informed with clear, 
            data-driven reports and optimize work efficiency effortlessly!
          </p>
        </div>

        <div className="container-elm2">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Log in</h2>

            {error && <p className="error-message">{error}</p>}

            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button className="btn" type="submit">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
