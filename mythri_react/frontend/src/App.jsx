import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <AppRoutes />
    </div>
  );
}

export default App;
