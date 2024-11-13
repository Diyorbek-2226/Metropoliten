import React, { useRef } from 'react';
import axios from 'axios';

const AddLibraryBook = () => {
  const nameRef = useRef();
  const typeRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      type: typeRef.current.value,
    };

    try {
      const response = await axios.post('http://67.205.170.103:8001/api/v1/main/library/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Book added successfully:', response.data);
      alert('Book added successfully!');
      
      // Clear the inputs after successful submission
      nameRef.current.value = '';
      typeRef.current.value = 'artistic';
    } catch (error) {
      console.error('Error adding book:', error.response?.data || error.message);
      alert('Failed to add book. Please check the console for more details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Add New Book to Library</h2>

      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Book Name</label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the book name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <select
          id="type"
          ref={typeRef}
          required
          defaultValue="artistic"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="artistic">Artistic</option>
          <option value="scientific">Scientific</option>
          <option value="historical">Historical</option>
          <option value="fiction">Fiction</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
      >
        Add Book
      </button>
    </form>
  );
};

export default AddLibraryBook;
