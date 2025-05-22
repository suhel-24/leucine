import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/AuthContext';

export default function RequestAccess() {
    const { token, role } = useAuth();
    const [softwareList, setSoftwareList] = useState([]);
    const [selectedSoftware, setSelectedSoftware] = useState('');
    const [accessLevel, setAccessLevel] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchSoftware() {
            try {
                setIsLoading(true);
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/software`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSoftwareList(res.data);
            } catch (err) {
                setError('Failed to fetch software list');
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSoftware();
    }, [token]);

    const selected = softwareList.find(s => s.id === Number(selectedSoftware));
    const accessLevels = selected ? selected.accessLevels : [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/requests`, {
                softwareId: selectedSoftware,
                accessType: accessLevel,
                reason,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage('Request submitted successfully!');
            setSelectedSoftware('');
            setAccessLevel('');
            setReason('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit request');
        } finally {
            setIsLoading(false);
        }
    };

    if (role !== 'employee') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
                    <p className="mt-2 text-red-500">This page is only accessible to employees.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Request Software Access</h2>

                {isLoading && (
                    <div className="flex items-center justify-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Software
                        </label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={selectedSoftware}
                            onChange={e => setSelectedSoftware(e.target.value)}
                            required
                            disabled={isLoading}
                        >
                            <option value="">Select Software</option>
                            {softwareList.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Access Level
                        </label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={accessLevel}
                            onChange={e => setAccessLevel(e.target.value)}
                            required
                            disabled={!selectedSoftware || isLoading}
                        >
                            <option value="">Select Access Level</option>
                            {accessLevels.map((lvl, idx) => (
                                <option key={idx} value={lvl}>{lvl}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Reason for Request
                        </label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
                            placeholder="Please explain why you need access to this software..."
                            value={reason}
                            onChange={e => setReason(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`cursor-pointer w-full py-3 px-4 rounded-md text-white font-medium transition-colors duration-200
                            ${isLoading
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {isLoading ? 'Submitting...' : 'Submit Request'}
                    </button>
                </form>

                {message && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-green-600">{message}</p>
                    </div>
                )}

                {error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
} 