import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', { username, password, role });
            setMessage(res.data.message);
            setUsername('');
            setPassword('');
            setRole('employee');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Sign up failed');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form className="flex flex-col gap-2 w-64" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" className="border p-2" value={username} onChange={e => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" className="border p-2" value={password} onChange={e => setPassword(e.target.value)} required />
                <select className="border p-2" value={role} onChange={e => setRole(e.target.value)}>
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="cursor-pointer bg-blue-500 text-white p-2 rounded">Sign Up</button>
            </form>
            {message && <div className="text-green-600 mt-2">{message}</div>}
            {error && <div className="text-red-600 mt-2">{error}</div>}
        </div>
    );
} 