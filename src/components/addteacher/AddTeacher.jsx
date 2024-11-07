import React, { useState } from 'react';

export default function AddTeacher() {
  const [formData, setFormData] = useState({
    fullname: '',
    birthday: '',
    gender: '',
    passport: '',
    jshshr: '',
    address: '',
    expertise: '',
    place_of_birth: '',
    work_place: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Simple validation function
  const validateForm = () => {
    console.log('Form Data:', formData); // Log form data for debugging
    // Check if any field is empty
    for (const key in formData) {
      if (formData[key].trim() === '') {
        setError('Please fill in all the fields.');
        return false;
      }
    }
    setError(null); // Clear any previous errors
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before proceeding
    if (!validateForm()) return;

    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch('http://67.205.170.103:8001/api/v1/main/teacher/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: formData.fullname,
          birthday: formData.birthday,
          gender: formData.gender,
          passport: formData.passport,
          jshshr: formData.jshshr,
          address: formData.address,
          expertise: formData.expertise,
          place_of_birth: formData.place_of_birth,
          work_place: formData.work_place,
        }),
      });

      if (response.ok) {
        const data = await response.json();  // Log the response data
        console.log('Teacher added successfully:', data); // Log response for debugging

        setSuccess(true);
        setFormData({
          fullname: '',
          birthday: '',
          gender: '',
          passport: '',
          jshshr: '',
          address: '',
          expertise: '',
          place_of_birth: '',
          work_place: '',
        });
      } else {
        throw new Error('Failed to add teacher');
      }
    } catch (error) {
      setError(error.message); // Log the error message
      console.error('Error adding teacher:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-white bg-blue-600 p-4 rounded-t-lg text-center">
          O'qituvchi qo'shish
        </h2>
        <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
          {/* F I O and Mutaxassislik */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">F I O</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="F I O kiriting"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Mutaxassislik</label>
              <input
                type="text"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                placeholder="Mutaxassislik kiriting"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Gender and Birthday */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Birthday</label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                placeholder="Birthday"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Passport and JSHSHIR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Passport</label>
              <input
                type="text"
                name="passport"
                value={formData.passport}
                onChange={handleChange}
                placeholder="Passport"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">JSHSHIR</label>
              <input
                type="text"
                name="jshshr"
                value={formData.jshshr}
                onChange={handleChange}
                placeholder="JSHSHIR"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Address and Work Place */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Work Place</label>
              <input
                type="text"
                name="work_place"
                value={formData.work_place}
                onChange={handleChange}
                placeholder="Work Place"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? 'Yuklanmoqda...' : 'Saqlash'}
            </button>
          </div>
        </form>

        {/* Error or Success Messages */}
        {error && (
          <div className="text-red-600 mt-4 text-center">
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="text-green-600 mt-4 text-center">
            <p>O'qituvchi muvaffaqiyatli qo'shildi!</p>
          </div>
        )}
      </div>
    </div>
  );
}
``
