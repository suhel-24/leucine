import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            auth.login(res.data.token, res.data.role);
            if (res.data.role === 'admin') navigate('/create-software');
            else if (res.data.role === 'manager') navigate('/pending-requests');
            else navigate('/request-access');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form className="flex flex-col gap-2 w-64" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" className="border p-2" value={username} onChange={e => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" className="border p-2" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit" className="bg-green-500 text-white p-2 rounded cursor-pointer">Login</button>
            </form>
            {error && <div className="text-red-600 mt-2">{error}</div>}
        </div>
    );
} 