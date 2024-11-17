import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUsers, FiCalendar, FiClock, FiSave, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import axiosInstance from '../../../config/DataService';

export default function AddGroup() {
  const [formData, setFormData] = useState({
    name: '',
    study_period: '',
    training_hour: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [studyPeriods, setStudyPeriods] = useState([]);

  useEffect(() => {
    fetchStudyPeriods();
  }, []);

  const fetchStudyPeriods = async () => {
    try {
      const response = await axiosInstance.get('http://67.205.170.103:8001/api/v1/main/student-list/');
      const uniquePeriods = [...new Set(response.data.results.map(item => item.study_period))];
      setStudyPeriods(uniquePeriods);
    } catch (err) {
      console.error('Error fetching study periods:', err);
      setError('Failed to load study periods. Please try again later.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axiosInstance.post('http://67.205.170.103:8001/api/v1/main/group/', formData);
      setSuccess('Group created successfully!');
      setFormData({ name: '', study_period: '', training_hour: 0 });
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while creating the group');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
            Create New Group
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Group Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUsers className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none mt-2 mb-2 rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Group Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="study_period" className="sr-only">Study Period</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="study_period"
                  name="study_period"
                  required
                  className="appearance-none mt-2 mb-2 rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={formData.study_period}
                  onChange={handleChange}
                >
                  
                  {studyPeriods.map((period, index) => (
                    <option key={index} value={period}>{period}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="training_hour" className="sr-only">Training Hours</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiClock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="training_hour"
                  name="training_hour"
                  type="number"
                  required
                  min="0"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2 mb-2"
                  placeholder="Training Hours"
                  value={formData.training_hour}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center text-sm text-red-600">
              <FiAlertCircle className="mr-2" />
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center text-sm text-green-600">
              <FiCheckCircle className="mr-2" />
              {success}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FiSave className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
              </span>
              {loading ? 'Creating...' : 'Create Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}