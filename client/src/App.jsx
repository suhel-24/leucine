import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import PrivateRoute from './hooks/PrivateRoute';
import CreateSoftware from './pages/CreateSoftware';
import PendingRequests from './pages/PendingRequests';
import RequestAccess from './pages/RequestAccess';
import { useAuth } from './hooks/AuthContext';

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      <p className="mt-4 text-gray-600">Welcome to your personalized dashboard</p>
    </div>
  );
}

function NavBar() {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/"
              className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${isActive('/')}`}>
              Home
            </Link>
            {token && role === 'admin' && (
              <Link to="/create-software"
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${isActive('/create-software')}`}>
                Create Software
              </Link>
            )}
            {token && (role === 'admin' || role === 'manager') && (
              <Link to="/pending-requests"
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${isActive('/pending-requests')}`}>
                Pending Requests
              </Link>
            )}
            {token && role === 'employee' && (
              <Link to="/request-access"
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${isActive('/request-access')}`}>
                Request Access
              </Link>
            )}
          </div>
          <div className="flex items-center gap-4">
            {!token && (
              <>
                <Link to="/signup"
                  className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${isActive('/signup')}`}>
                  Sign Up
                </Link>
                <Link to="/login"
                  className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${isActive('/login')}`}>
                  Login
                </Link>
              </>
            )}
            {token && (
              <button
                onClick={handleLogout}
                className="cursor-pointer px-4 py-2 rounded-md font-medium text-red-600 hover:bg-red-50 transition-colors duration-200">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-software" element={<CreateSoftware />} />
              <Route path="/pending-requests" element={<PendingRequests />} />
              <Route path="/request-access" element={<RequestAccess />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}