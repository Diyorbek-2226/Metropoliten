import React, { useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const AddLibraryBook = () => {
  const nameRef = useRef();
  const typeRef = useRef();
  const fileRef = useRef(); // For the file input
  const imageRef = useRef(); // For the image input (if needed)

  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object to send both file and image along with text data
    const formData = new FormData();
    formData.append('name', nameRef.current.value);
    formData.append('type', typeRef.current.value);
    
    // Append file and image if available
    if (fileRef.current.files[0]) {
      formData.append('file', fileRef.current.files[0]);
    }
    if (imageRef.current.files[0]) {
      formData.append('image', imageRef.current.files[0]);
    }

    try {
      const response = await axios.post('http://67.205.170.103:8001/api/v1/main/library/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the correct content type for file upload
          'Authorization': `Bearer ${token}`, // Add the token in the Authorization header
        },
      });
      console.log('Book added successfully:', response.data);
      alert('Book added successfully!');
      
      // Clear the inputs after successful submission
      nameRef.current.value = '';
      typeRef.current.value = 'artistic'; // Reset to default value
      fileRef.current.value = ''; // Reset the file input
      imageRef.current.value = ''; // Reset the image input
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
          defaultValue="artistic" // Default value
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="artistic">Artistic</option>
         
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload File (Optional)</label>
        <input
          type="file"
          id="file"
          ref={fileRef}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image (Optional)</label>
        <input
          type="file"
          id="image"
          ref={imageRef}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
