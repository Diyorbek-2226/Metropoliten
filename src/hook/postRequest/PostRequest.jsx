import { useState } from 'react';
import axiosInstance from '../../config/DataService';

const usePostRequest = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postRequest = async (data) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');

    try {
      const response = await axiosInstance.post(
        `${endpoint}`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (err) {
      setError(err);
      console.error('Error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postRequest, loading, error };
};

export default usePostRequest;
