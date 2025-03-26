import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import './Graph.css';
import { db } from '../../firebase';


export default function Graph() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Get stored work data from localStorage
    const storedData = JSON.parse(localStorage.getItem('timeLogs')) || [];
    setData(storedData);
  }, []);

  return (
    <div>
      <div className="graphNav">
        <div className="graphNav-elm1">
          <span onClick={() => navigate('/body')} className="nav-link">Go back to Timer</span>
        </div>
        <div className="nav-elm2">
          <span>User</span>
          <div className="nav-user-photo"></div>
        </div>
      </div>

      {/* Graph Container */}
      <div className="graph-container">
        <h2>Daily Work Time Analysis</h2>
        {data.length > 0 ? (
          <ResponsiveContainer width="90%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="duration" fill="#3498db" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available yet. Start working to generate a graph!</p>
        )}
      </div>
    </div>
  );
}
