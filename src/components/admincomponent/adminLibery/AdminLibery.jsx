import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminLibery() {
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [data, setData] = useState([]);  // API'dan ma'lumotlarni saqlash

  // API'dan ma'lumotlarni olish
  useEffect(() => {
    axios.get('http://67.205.170.103:8001/api/v1/main/library/')
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Faylni tanlash
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('File selected:', file); // Diagnostics
    setImageFile(file);
  };

  // Ma'lumotni yangilash (PUT so'rovi)
  const handleSave = (id, updatedData) => {
    const formData = new FormData();
    formData.append('name', updatedData.name);
    formData.append('type', updatedData.type);

    // Fayl qo'shish
    if (imageFile) {
      formData.append('image', imageFile);  // Faylni qo'shish
      console.log('File added to FormData:', imageFile); // Diagnostics
    } else {
      console.log('No file selected.'); // Fayl tanlanmagan holat
    }

    // PUT so'rovini yuborish
    axios.put(`http://67.205.170.103:8001/api/v1/main/library/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Faylni yuborish uchun zarur
      }
    })
    .then((response) => {
      console.log('Item updated:', response.data); // Diagnostics
      alert('Item updated successfully');
      setIsEditing(false); // Edit rejimini o'chirish
      // Yangilangan ma'lumotlarni qayta olish
      axios.get('http://67.205.170.103:8001/api/v1/main/library/')
        .then((response) => {
          setData(response.data.results);  // API'dan yangilangan ma'lumotlarni olish
        })
        .catch((error) => {
          console.error('Error fetching updated data:', error);
        });
    })
    .catch((error) => {
      console.log('Error:', error.response); // Errorni ko'rsatish
      alert('Error updating item: ' + (error.response ? error.response.data : error.message));
    });
  };

  // Delete funksiyasi (agar kerak bo'lsa)
  const handleDelete = (id) => {
    axios.delete(`http://67.205.170.103:8001/api/v1/main/library/${id}/`)
      .then((response) => {
        console.log('Item deleted:', response.data);
        alert('Item deleted successfully');
        // Delete dan keyin ma'lumotlarni yangilash
        setData(data.filter(item => item.id !== id));
      })
      .catch((error) => {
        console.log('Error deleting item:', error);
        alert('Error deleting item: ' + error.response.data);
      });
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4 bg-gray-100">
      <h2 className="text-center text-2xl font-semibold mb-6">Library Management</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data && data.length > 0 ? data.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:transform hover:scale-105 transition-all">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{item.type}</p>
              {isEditing && currentItem?.id === item.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={currentItem.name}
                    onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <select
                    value={currentItem.type}
                    onChange={(e) => setCurrentItem({ ...currentItem, type: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="artistic">Artistic</option>
                    <option value="scientific">Scientific</option>
                  </select>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <button
                    className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    onClick={() => handleSave(item.id, currentItem)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex justify-between">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    onClick={() => {
                      setIsEditing(true);
                      setCurrentItem(item);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        )) : (
          <p className="text-center text-lg text-gray-500">No data available</p>
        )}
      </div>
    </div>
  );
}
