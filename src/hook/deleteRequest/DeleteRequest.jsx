import { useState } from 'react';
import axios from 'axios';

const apiUrl = 'http://67.205.170.103:8001/api/v1/';

const DeleteRequest = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteRequest = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(`${apiUrl}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteRequest, loading, error };
};

export default DeleteRequest;
