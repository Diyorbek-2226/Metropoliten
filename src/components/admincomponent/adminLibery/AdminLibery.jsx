import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiDownload, FiTrash2 } from 'react-icons/fi';

export default function AdminLibrary() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('artistic'); // Default to 'artistic'
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://67.205.170.103:8001/api/v1/main/library/')
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://67.205.170.103:8001/api/v1/main/library/${id}/`)
      .then(() => {
        setData(data.filter((item) => item.id !== id));
        alert('Item deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredData = data.filter(
    (item) =>
      item.type === selectedCategory &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">Library Management</h2>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <button
            className={`px-4 py-2 rounded-lg font-bold ${
              selectedCategory === 'artistic'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleCategoryChange('artistic')}
          >
            Artistic
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-bold ${
              selectedCategory === 'foreign'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleCategoryChange('foreign')}
          >
            Foreign
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-bold ${
              selectedCategory === 'textbook'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleCategoryChange('textbook')}
          >
            Textbook
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-bold ${
              selectedCategory === 'guides'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleCategoryChange('guides')}
          >
            Guides
          </button>
        </div>

        {/* Display Items Based on Selected Category and Search */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600 capitalize">{item.type}</p>
                <div className="mt-4 flex justify-between">
                  <a
                    href={item.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                  >
                    <FiDownload className="mr-2" />
                    Download
                  </a>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                  >
                    <FiTrash2 className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
