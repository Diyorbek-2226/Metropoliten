import { useRef } from 'react';
import '../../studentcomponent/person/person.css'; // Adjust the path if needed
import PostRequest from '../../../hook/postRequest/PostRequest';

export default function AddTeacher() {
  // references for inputs
  const fullName = useRef();
  const expertise = useRef();
  const gender = useRef();
  const birthday = useRef();
  const passport = useRef();
  const jshshr = useRef();
  const adress = useRef();
  const placeOfBirth = useRef();
  const workPlace = useRef();
  const avatar = useRef(); // Avatar URL input

  const { postRequest, loading, error } = PostRequest('main/teacher/');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      fullname: fullName.current.value,
      expertise: expertise.current.value,
      gender: gender.current.value,
      birthday: birthday.current.value,
      passport: passport.current.value,
      jshshr: jshshr.current.value,
      adress: adress.current.value,
      place_of_birth: placeOfBirth.current.value,
      work_place: workPlace.current.value,
      avatar: avatar.current?.value || null, // Avatar URL
    };

    try {
      await postRequest(data); // Send data without file upload
      alert('Muvofaqiyatli qo\'shildi');
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          alert('A teacher with this passport already exists.');
        } else if (err.response.status === 401) {
          alert('Unauthorized. Check authentication.');
        } else {
          alert('An error occurred. Try again later.');
        }
      } else {
        alert('Network error. Check your internet connection.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">O'qituvchi qo'shish</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                ref={fullName}
                type="text"
                placeholder="Enter Full Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Expertise</label>
              <input
                ref={expertise}
                type="text"
                placeholder="Enter Expertise"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                ref={gender}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Birthday</label>
              <input
                ref={birthday}
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Passport</label>
              <input
                ref={passport}
                type="text"
                placeholder="Enter Passport"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">JSHSHIR</label>
              <input
                ref={jshshr}
                type="text"
                placeholder="Enter JSHSHIR"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                ref={adress}
                type="text"
                placeholder="Enter Address"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Place of Birth</label>
              <input
                ref={placeOfBirth}
                type="text"
                placeholder="Enter Place of Birth"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Work Place</label>
              <input
                ref={workPlace}
                type="text"
                placeholder="Enter Work Place"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
              <input
                ref={avatar}
                type="url"
                placeholder="Enter Avatar URL (optional)"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
              />
            </div>

            <div className="col-span-1 sm:col-span-2 mt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-400 to-light-blue-500 text-white px-8 py-3 rounded-lg shadow-lg hover:from-cyan-500 hover:to-light-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 transition duration-200"
                disabled={loading}
              >
                {loading ? 'Saqlash...' : 'Saqlash'}
              </button>
            </div>
          </form>
          {error && (
            <div className="text-red-500 mt-4 text-center">
              {error?.response?.data?.message || 'An unexpected error occurred.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}