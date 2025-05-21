import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import PrivateRoute from './hooks/PrivateRoute';

function Dashboard() {
  return <div className="flex flex-col items-center justify-center min-h-screen"><h2 className="text-xl font-bold">Dashboard (Protected)</h2></div>;
}

export default function App() {
  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-gray-100">
        <Link to="/">Home</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}