//AddLibraryBook
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddLibraryBook() {
  const [libraryData, setLibraryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    type: 'artistic',
    file: null,
    image: null
  });

  useEffect(() => {
    fetchLibraryData();
  }, [page]);

  const fetchLibraryData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://67.205.170.103:8001/api/v1/main/library/?limit=20&offset=${(page - 1) * 20}`);
      if (!response.ok) {
        throw new Error('Failed to fetch library data');
      }
      const data = await response.json();
      setLibraryData(data);
    } catch (err) {
      setError('Error fetching library data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file' || name === 'image') {
      setNewItem(prev => ({ ...prev, [name]: files[0] || null }));
    } else {
      setNewItem(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(newItem).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });

      const response = await fetch('http://67.205.170.103:8001/api/v1/main/library/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add new library item');
      }

      toast.success('New library item added successfully');
      setNewItem({ name: '', type: 'artistic', file: null, image: null });
      setShowForm(false);
      fetchLibraryData();
    } catch (err) {
      toast.error('Error adding new library item');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !libraryData) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kitoblar va Kitob Qo'shish</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white px-4 py-2 rounded">
          {showForm ? 'qoshish uchun' : 'Kitob qoshish'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-100 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input
                id="name"
                name="name"
                value={newItem.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="type" className="block mb-1">Type</label>
              <select
                id="type"
                name="type"
                value={newItem.type}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="artistic">Artistic</option>
                <option value="scientific">Scientific</option>
                <option value="educational">Educational</option>
              </select>
            </div>
            <div>
              <label htmlFor="file" className="block mb-1">File (PDF)</label>
              <input
                id="file"
                name="file"
                type="file"
                accept=".pdf"
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-1">Image</label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? 'Adding...' : 'Add Item'}
          </button>
        </form>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {libraryData?.results.map((item) => (
          <div key={item.id} className="border rounded-lg overflow-hidden">
            <div className="relative h-48 bg-gray-200">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-2">{item.name}</h2>
              <p className="text-sm text-gray-600">Type: {item.type}</p>
            </div>
            <div className="p-4 pt-0">
              <button
                onClick={() => handleDownload(item.file)}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded"
              >
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {(libraryData?.next || libraryData?.previous) && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            disabled={!libraryData.previous || loading}
            onClick={() => setPage(p => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            disabled={!libraryData.next || loading}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default AddLibraryBook;

