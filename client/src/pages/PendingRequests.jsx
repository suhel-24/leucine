import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/AuthContext';

export default function PendingRequests() {
    const { token, role } = useAuth();
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchRequests() {
            setIsLoading(true);
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/requests/pendingrequests`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRequests(res.data.filter(r => r.status === 'Pending'));
            } catch {
                setError('Failed to fetch requests');
            } finally {
                setIsLoading(false);
            }
        }
        fetchRequests();
    }, [token, message]);

    const handleAction = async (id, status) => {
        setError('');
        setMessage('');
        setIsLoading(true);
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/api/requests/${id}`, { status }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage(`Request ${status.toLowerCase()} successfully!`);
        } catch {
            setError('Failed to update request');
        } finally {
            setIsLoading(false);
        }
    };

    if (role === 'employee') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
                    <p className="mt-2 text-red-500">This page is only accessible to managers and admins.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Pending Access Requests</h2>

                {isLoading && (
                    <div className="flex items-center justify-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {!isLoading && requests.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No pending requests at this time.</p>
                    </div>
                )}

                <div className="space-y-4">
                    {requests.map(req => (
                        <div key={req.id} className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow duration-200">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">User</label>
                                    <p className="text-gray-800">{req.user.username}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Software</label>
                                    <p className="text-gray-800">{req.software.name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Access Type</label>
                                    <p className="text-gray-800">{req.accessType}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Status</label>
                                    <p className="text-gray-800">{req.status}</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-500">Reason</label>
                                <p className="text-gray-800 mt-1">{req.reason}</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    className="cursor-pointer flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 disabled:bg-green-400 disabled:cursor-not-allowed"
                                    onClick={() => handleAction(req.id, 'Approved')}
                                    disabled={isLoading}
                                >
                                    Approve
                                </button>
                                <button
                                    className="cursor-pointer flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 disabled:bg-red-400 disabled:cursor-not-allowed"
                                    onClick={() => handleAction(req.id, 'Rejected')}
                                    disabled={isLoading}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

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