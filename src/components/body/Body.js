import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Body.css';

export default function Body() {
  const navigate = useNavigate();

  // Load saved time and running state from localStorage
  const [time, setTime] = useState(() => parseInt(localStorage.getItem('currentTime')) || 0);
  const [isRunning, setIsRunning] = useState(() => JSON.parse(localStorage.getItem('isRunning')) || false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;

          // Save updated time every second
          localStorage.setItem('currentTime', newTime);

          // Log every second for graph
          const logs = JSON.parse(localStorage.getItem('timeLogs')) || [];
          logs.push({ time: new Date().toLocaleTimeString(), duration: newTime });
          localStorage.setItem('timeLogs', JSON.stringify(logs));

          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Reset timer at midnight (runs only once when component mounts)
  useEffect(() => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const timeUntilMidnight = midnight - now;

    const resetTimer = setTimeout(() => {
      // Store today's final value before reset
      const storedLogs = JSON.parse(localStorage.getItem('timeLogs')) || [];
      storedLogs.push({ time: new Date().toLocaleDateString(), duration: time });

      localStorage.setItem('timeLogs', JSON.stringify(storedLogs));
      localStorage.removeItem('currentTime'); // Reset saved time
      setTime(0);
    }, timeUntilMidnight);

    return () => clearTimeout(resetTimer);
  }, [time]);

  // Function to start and stop the timer
  const toggleTimer = (status) => {
    setIsRunning(status);
    localStorage.setItem('isRunning', JSON.stringify(status)); // Persist running state
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div>
      <div className="navbar">
        <div className="nav-elm1">
          <span onClick={() => navigate('/graph')} className="nav-link">Analyze Graph</span>
        </div>
        <div className='nav-elm2'>
          <div className="nav-user">User</div>
          <div className="nav-user-photo"></div>
        </div>
      </div>
      <div className="timer-container">
        <div className='body-container'>
          <h2>Time Spent</h2>
          <div className="timer-display">{formatTime(time)}</div>
          <div className="timer-buttons">
            <button className="tBtns" onClick={() => toggleTimer(true)}>Start</button>
            <button className="tBtnb" onClick={() => toggleTimer(false)}>Break</button>
          </div>
        </div>
      </div>
    </div>
  );
}
