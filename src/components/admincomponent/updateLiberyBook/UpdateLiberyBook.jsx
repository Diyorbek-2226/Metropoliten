import React, { useRef, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Book, FileText, Image, Upload } from 'lucide-react';

const AddLibraryBook = () => {
  const nameRef = useRef();
  const typeRef = useRef();
  const fileRef = useRef();
  const imageRef = useRef();
  const [fileName, setFileName] = useState('');
  const [imageName, setImageName] = useState('');

  const token = localStorage.getItem('token');

  const handleFileChange = (e, setNameFunc) => {
    if (e.target.files[0]) {
      setNameFunc(e.target.files[0].name);
    } else {
      setNameFunc('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', nameRef.current.value);
    formData.append('type', typeRef.current.value);
    
    if (fileRef.current.files[0]) {
      formData.append('file', fileRef.current.files[0]);
    }
    if (imageRef.current.files[0]) {
      formData.append('image', imageRef.current.files[0]);
    }

    try {
      const response = await axios.post('http://67.205.170.103:8001/api/v1/main/library/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success('Book added successfully!');
      
      nameRef.current.value = '';
      typeRef.current.value = 'artistic';
      fileRef.current.value = '';
      imageRef.current.value = '';
      setFileName('');
      setImageName('');
    } catch (error) {
      console.error('Error adding book:', error.response?.data || error.message);
      toast.error('Failed to add book. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
          <h2 className="text-2xl font-bold text-white text-center">Add New Book to Library</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center">
              <Book className="w-5 h-5 mr-2 text-blue-500" />
              Book Name
            </label>
            <input
              type="text"
              id="name"
              ref={nameRef}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter the book name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium text-gray-700 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-500" />
              Type
            </label>
            <select
              id="type"
              ref={typeRef}
              required
              defaultValue="artistic"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="artistic">Artistic</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="file" className="text-sm font-medium text-gray-700 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-blue-500" />
              Upload File (Optional)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                id="file"
                ref={fileRef}
                onChange={(e) => handleFileChange(e, setFileName)}
                className="hidden"
              />
              <label
                htmlFor="file"
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md cursor-pointer hover:bg-blue-200 transition flex-grow text-center"
              >
                {fileName || 'Choose file'}
              </label>
              {fileName && (
                <button
                  type="button"
                  onClick={() => {
                    fileRef.current.value = '';
                    setFileName('');
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium text-gray-700 flex items-center">
              <Image className="w-5 h-5 mr-2 text-blue-500" />
              Upload Image (Optional)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                id="image"
                ref={imageRef}
                onChange={(e) => handleFileChange(e, setImageName)}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md cursor-pointer hover:bg-blue-200 transition flex-grow text-center"
              >
                {imageName || 'Choose image'}
              </label>
              {imageName && (
                <button
                  type="button"
                  onClick={() => {
                    imageRef.current.value = '';
                    setImageName('');
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 rounded-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
          >
            Add Book
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default AddLibraryBook;