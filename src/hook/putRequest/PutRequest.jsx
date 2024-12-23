import { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../config/DataService';

const apiUrl = 'http://67.205.170.103:8001/api/v1/';

const PutRequest = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const putRequest = async (data) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');

    try {
      console.log("aesfrtyu" , endpoint);
      
      const response = await axiosInstance.put(`${apiUrl}${endpoint}`, data, {
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

  return { putRequest, loading, error };
};

export default PutRequest;
