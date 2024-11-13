import { useRef, useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
  const finishedDateRef = useRef();
  const descriptionRef = useRef();
  const courseRef = useRef();
  const teacherRef = useRef();
  const groupRef = useRef();

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data from refs
    const dataToSend = {
      finished_date: finishedDateRef.current.value || '',
      description: descriptionRef.current.value || '',
      course: parseInt(courseRef.current.value, 10) || 0,
      teacher: parseInt(teacherRef.current.value, 10) || 0,
      group: parseInt(groupRef.current.value, 10) || 0
    };

    try {
      const response = await axios.post('http://67.205.170.103:8001/api/v1/main/task/', dataToSend);
      setSuccessMessage('Task created successfully!');
      setError(null);

      // Clear the input fields after submission
      finishedDateRef.current.value = '';
      descriptionRef.current.value = '';
      courseRef.current.value = '';
      teacherRef.current.value = '';
      groupRef.current.value = '';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Invalid input data. Please check your entries.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Dars jadvali ma'lumotlari</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Dars sanasi</label>
          <input
            type="date"
            ref={finishedDateRef}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Juftlik</label>
          <input
            type="text"
            ref={descriptionRef}
            placeholder="Juftlikni tanlang"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Fanlar</label>
            <select
              ref={courseRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Fanlarni tanlang</option>
              <option value="1">Matematika</option>
              <option value="2">Fan</option>
              <option value="3">Tarix</option>
              <option value="4">Til</option>
            </select>
          </div>
          
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Xodim</label>
            <select
              ref={teacherRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Xodimni tanlang</option>
              <option value="1">Xodim 1</option>
              <option value="2">Xodim 2</option>
              <option value="3">Xodim 3</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Guruh</label>
          <select
            ref={groupRef}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Guruh tanlang</option>
            <option value="1">Guruh 1</option>
            <option value="2">Guruh 2</option>
            <option value="3">Guruh 3</option>
          </select>
        </div>

        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        {successMessage && <p className="text-green-500 text-xs italic">{successMessage}</p>}

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Saqlash
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
