import React, { useState } from 'react';
import usePostRequest from '../../../hook/postRequest/PostRequest';

export default function AddDocument() {
  const [formData, setFormData] = useState({
    command_number: '',
    order_date: '2024-11-19',
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const { postRequest, loading, error } = usePostRequest('/main/documents/');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Fayl tanlangan bo'lsa, uni saqlaymiz
    } else {
      setSelectedFile(null); // Fayl tanlanmagan bo'lsa, null qilib qo'yamiz
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitFormData = new FormData();
    // Formadagi boshqa maydonlarni qo'shamiz
    Object.keys(formData).forEach(key => {
      submitFormData.append(key, formData[key]);
    });
    // Fayl bor bo'lsa, uni qo'shamiz
    if (selectedFile) {
      submitFormData.append('file', selectedFile, selectedFile.name);
    }

    try {
      const response = await postRequest(submitFormData);
      console.log('Response:', response);
      // Formani muvaffaqiyatli yuborganidan so'ng tozalash
      setFormData({
        command_number: '',
        order_date: '2024-11-19',
        description: ''
      });
      setSelectedFile(null);
      e.target.reset();
      alert('Document uploaded successfully!');
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to upload document. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Command Number
          </label>
          <input
            type="text"
            name="command_number"
            value={formData.command_number}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Order Date
          </label>
          <input
            type="date"
            name="order_date"
            value={formData.order_date}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            File Upload
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {selectedFile && (
            <p className="text-sm text-gray-500 mt-1">
              Selected file: {selectedFile.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Uploading...' : 'Upload Document'}
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-2">
            Error: {error.message}
          </p>
        )}
      </form>
    </div>
  );
}
