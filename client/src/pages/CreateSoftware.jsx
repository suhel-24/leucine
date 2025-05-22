import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/AuthContext';

export default function CreateSoftware() {
  const { token, role } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accessLevels, setAccessLevels] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
          <p className="mt-2 text-red-500">This page is only accessible to administrators.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/software',
        {
          name,
          description,
          accessLevels: accessLevels.split(',').map(lvl => lvl.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message);
      setName('');
      setDescription('');
      setAccessLevels('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add software');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Software</h2>

        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Software Name
            </label>
            <input
              type="text"
              placeholder="Enter software name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter software description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Access Levels
            </label>
            <input
              type="text"
              placeholder="e.g., Read, Write, Admin"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={accessLevels}
              onChange={e => setAccessLevels(e.target.value)}
              required
              disabled={isLoading}
            />
            <p className="mt-1 text-sm text-gray-500">Separate access levels with commas</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`cursor-pointer w-full py-3 px-4 rounded-md text-white font-medium transition-colors duration-200
              ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isLoading ? 'Adding Software...' : 'Add Software'}
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