import { useState } from 'react';
import Axios from 'axios';


const apiUrl = 'http://67.205.170.103:8001/api/v1/';

const usePostRequest = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postRequest = async (data) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');

    try {
      const response = await Axios.post(
        `${apiUrl}${endpoint}`,
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
