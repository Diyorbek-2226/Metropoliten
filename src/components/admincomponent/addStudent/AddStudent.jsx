import { useRef, useState } from 'react';
import usePostRequest from '../../../hook/postRequest/PostRequest';
import useFetchData from '../../../hook/useFetch/UseFetch';

const AddStudent = () => {
  const fullName = useRef();
  const gender = useRef();
  const birthday = useRef();
  const passport = useRef();
  const jshshr = useRef();
  const adress = useRef();
  const group = useRef();
  const expertise = useRef();
  const placeOfBirth = useRef();
  const workPlace = useRef();
  const studyPeriod = useRef();
  const studyType = useRef();
  const avatar = useRef();

  const { postRequest, loading: postLoading, error: postError } = usePostRequest('main/student/');
  const { data: groupsData, error: fetchError, loading: fetchLoading } = useFetchData('main/group/');
  const Groups = groupsData?.results || [];

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      fullname: fullName.current.value,
      birthday: birthday.current.value,
      gender: gender.current.value,
      passport: passport.current.value,
      jshshr: jshshr.current.value,
      adress: adress.current.value,
      group: group.current.value,
      expertise: expertise.current.value,
      place_of_birth: placeOfBirth.current.value,
      work_place: workPlace.current.value,
      study_period: studyPeriod.current.value,
      study_type: studyType.current.value,
    };

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

 await postRequest(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h2 className="text-2xl font-semibold mb-6 text-center">Talaba Qo'shish</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input ref={fullName} type="text" placeholder="Enter Full Name" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" required />
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select ref={gender} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Birthday</label>
              <input ref={birthday} type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" required />
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Passport</label>
              <input ref={passport} type="text" placeholder="Enter Passport" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" required />
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">JSHSHIR</label>
              <input ref={jshshr} type="text" placeholder="Enter JSHSHIR" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" required />
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input ref={adress} type="text" placeholder="Enter Address" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" required />
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Group</label>
              {fetchLoading ? (
                <div>Loading groups...</div>
              ) : (
                <select ref={group} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" required>
                  {Groups.map((el) => (
                    <option key={el.id} value={el.id}>{el.name}</option>
                  ))}
                </select>
              )}
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Expertise</label>
              <input ref={expertise} type="text" placeholder="Enter Expertise" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" required />
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Place of Birth</label>
              <input ref={placeOfBirth} type="text" placeholder="Enter Place of Birth" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" required />
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Work Place</label>
              <input ref={workPlace} type="text" placeholder="Enter Work Place" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" required />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Study Period</label>
              <input ref={studyPeriod} type="date" placeholder="Enter Study Period" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" required />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Study Type</label>
              <input ref={studyType} type="text" placeholder="Enter Study Type" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" required />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
              <input 
                ref={avatar} 
                type="url" 
                placeholder="Enter Avatar URL" 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>
            <div className="col-span-1 sm:col-span-2 mt-6">
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200" 
                disabled={postLoading}
              >
                {postLoading ? 'Qoshilmoqda...' : "Talaba Qo'shish"}
              </button>
            </div>
          </form>
          {postError && <div className="text-red-600 text-center mt-4">{postError}</div>}
        </div>
      </div>
    </div>
  );
};

export default AddStudent;