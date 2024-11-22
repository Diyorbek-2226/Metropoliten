import { useState } from 'react';
import axiosInstance from '../../config/DataService';

const usePostRequest = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postRequest = async (data, file = null) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');

    const formData = new FormData();
    
    // If there's a file, append it to formData
    if (file) {
      formData.append('file', file);
    }
    
    // Append other data to formData
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    try {
      const response = await axiosInstance.post(
        `${endpoint}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            // Don't set Content-Type, it will be set automatically for FormData
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

