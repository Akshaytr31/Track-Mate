import React, { useState } from 'react';
import "./SignUp.css";
import { Link } from 'react-router-dom';
import { auth } from '../../firebase'; // Make sure this path is correct
import { createUserWithEmailAndPassword } from 'firebase/auth';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset previous errors

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Account created');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message); // Show error in UI
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="signup-div">
      <div className="container">
        <div className="container-elm1">
          <h2 classname="head">Welcome to TrackMate</h2>
          <p>
            TrackMate monitors and visualizes the time employees spend in front of their computers, 
            providing insightful graphs to analyze productivity. Stay informed with clear, 
            data-driven reports and optimize work efficiency effortlessly!
          </p>
        </div>

        <div className="container-elm2">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>

            {error && <p className="error-message">{error}</p>}

            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email} 
              required 
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password} 
              required 
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="confirm-password">Confirm Password:</label>
            <input 
              type="password" 
              id="confirm-password" 
              name="confirm-password" 
              value={confirmPassword} 
              required 
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button className="btn" type="submit">Sign Up</button>

            <p>Already Registered? <Link to="/login">Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
