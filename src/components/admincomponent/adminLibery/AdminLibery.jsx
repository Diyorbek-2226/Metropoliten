import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash2, FiSave, FiX, FiBook, FiImage } from 'react-icons/fi';

export default function AdminLibrary() {
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://67.205.170.103:8001/api/v1/main/library/')
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSave = (id, updatedData) => {
    const formData = new FormData();
    formData.append('name', updatedData.name);
    formData.append('type', updatedData.type);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    axios.put(`http://67.205.170.103:8001/api/v1/main/library/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then((response) => {
      console.log('Item updated:', response.data);
      alert('Item updated successfully');
      setIsEditing(false);
      fetchData();
    })
    .catch((error) => {
      console.log('Error:', error.response);
      alert('Error updating item: ' + (error.response ? error.response.data : error.message));
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://67.205.170.103:8001/api/v1/main/library/${id}/`)
      .then((response) => {
        console.log('Item deleted:', response.data);
        alert('Item deleted successfully');
        setData(data.filter(item => item.id !== id));
      })
      .catch((error) => {
        console.log('Error deleting item:', error);
        alert('Error deleting item: ' + error.response.data);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto ">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">Library Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data && data.length > 0 ? data.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <FiBook className="text-white text-4xl" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-4 capitalize">{item.type}</p>
                {isEditing && currentItem?.id === item.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={currentItem.name}
                      onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={currentItem.type}
                      onChange={(e) => setCurrentItem({ ...currentItem, type: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="artistic">Artistic</option>
                      <option value="scientific">Scientific</option>
                    </select>
                    <div className="flex items-center space-x-2">
                      <FiImage className="text-gray-400" />
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
                        onClick={() => handleSave(item.id, currentItem)}
                      >
                        <FiSave className="mr-2" />
                        Save
                      </button>
                      <button
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300"
                        onClick={() => setIsEditing(false)}
                      >
                        <FiX className="mr-2" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <button
                      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                      onClick={() => {
                        setIsEditing(true);
                        setCurrentItem(item);
                      }}
                    >
                      <FiEdit className="mr-2" />
                      Edit
                    </button>
                    <button
                      className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FiTrash2 className="mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          )) : (
            <p className="col-span-full text-center text-lg text-gray-500">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}