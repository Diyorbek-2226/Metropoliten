import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [editStudent, setEditStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const limit = 20;
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStudents();
  }, [currentPage]);

  useEffect(() => {
    // Filter students based on the search query
    const filtered = students.filter((student) =>
      student.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchQuery, students]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://67.205.170.103:8001/api/v1/main/student-list/?limit=${limit}&offset=${(currentPage - 1) * limit}`);
      setStudents(response.data.results);
      setFilteredStudents(response.data.results); // Initialize filteredStudents with all students
      setTotalCount(response.data.count);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };
  const fetchSingleStudent = async (id) => {
    try {
      const response = await axios.get(`http://67.205.170.103:8001/api/v1/main/student/${id}/`);
      setEditStudent(response.data);
      setShowModal(true); // Modalni ochish
    } catch (error) {
      console.error('Error fetching student data:', error);
      alert('Student ma’lumotlarini olishda xatolik yuz berdi.');
    }
  };
  const updateStudent = async () => {
    try {
      const updatedData = {
        fullname: editStudent.fullname,
        birthday: editStudent.birthday,
        gender: editStudent.gender,
        adress: editStudent.adress,
        expertise: editStudent.expertise,
        place_of_birth: editStudent.place_of_birth,
        work_place: editStudent.work_place,
        study_period: editStudent.study_period,
        study_type: editStudent.study_type,
        user: editStudent.user.id,
        group: editStudent.group.id,
      };
  
      const response = await axios.put(
        `http://67.205.170.103:8001/api/v1/main/student/${editStudent.id}/`,
        updatedData
      );
  
      if (response.status === 200) {
        fetchStudents(); // Yangilangan ma'lumotlarni olish
        setShowModal(false); // Modalni yopish
      }
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Student ma’lumotlarini yangilashda xatolik yuz berdi.');
    }
  };

  const handlePagination = (direction) => {
    if (direction === 'next' && currentPage * limit < totalCount) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by full name..."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <table className="w-full border-collapse border text-sm sm:text-base">
        <thead>
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Birthday</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Expertise</th>
            <th className="border p-2">Place of Birth</th>
            <th className="border p-2">Study Period</th>
            <th className="border p-2">Study Type</th>
            <th className="border p-2">Group</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student.id}>
              <td className="border p-2">{(currentPage - 1) * limit + index + 1}</td>
              <td className="border p-2">{student.fullname}</td>
              <td className="border p-2">{student.birthday}</td>
              <td className="border p-2">{student.gender}</td>
              <td className="border p-2">{student.adress}</td>
              <td className="border p-2">{student.expertise}</td>
              <td className="border p-2">{student.place_of_birth}</td>
              <td className="border p-2">{student.study_period}</td>
              <td className="border p-2">{student.study_type}</td>
              <td className="border p-2">{student.group?.name}</td>
              <td className="border p-2 flex justify-center gap-2">
                <button
                  onClick={() => fetchSingleStudent(student.id)}
                  className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteStudent(student.id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePagination('prev')}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => handlePagination('next')}
          disabled={currentPage * limit >= totalCount}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Next
        </button>
      </div>

      {showModal && editStudent && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg w-full sm:w-96 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Student</h2>
        <button onClick={() => setShowModal(false)} className="text-gray-500">
          <FaTimes size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={editStudent.fullname || ''}
          onChange={(e) => setEditStudent({ ...editStudent, fullname: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Full Name"
        />
        <input
          type="date"
          value={editStudent.birthday || ''}
          onChange={(e) => setEditStudent({ ...editStudent, birthday: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Birthday"
        />
        <select
          value={editStudent.gender || ''}
          onChange={(e) => setEditStudent({ ...editStudent, gender: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="text"
          value={editStudent.adress || ''}
          onChange={(e) => setEditStudent({ ...editStudent, adress: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Address"
        />
        <input
          type="text"
          value={editStudent.expertise || ''}
          onChange={(e) => setEditStudent({ ...editStudent, expertise: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Expertise"
        />
        <input
          type="text"
          value={editStudent.place_of_birth || ''}
          onChange={(e) => setEditStudent({ ...editStudent, place_of_birth: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Place of Birth"
        />
        <input
          type="text"
          value={editStudent.work_place || ''}
          onChange={(e) => setEditStudent({ ...editStudent, work_place: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Work Place"
        />
        <select
          value={editStudent.study_period || ''}
          onChange={(e) => setEditStudent({ ...editStudent, study_period: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="" disabled>
            Select Study Period
          </option>
          <option value="2020-2024">2020-2024</option>
          <option value="2021-2025">2021-2025</option>
        </select>
        <select
          value={editStudent.study_type || ''}
          onChange={(e) => setEditStudent({ ...editStudent, study_type: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="" disabled>
            Select Study Type
          </option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
        </select>
        <input
          type="text"
          value={editStudent.group?.name || ''}
          onChange={(e) => setEditStudent({ ...editStudent, group: { ...editStudent.group, name: e.target.value } })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Group"
        />
        <input
          type="file"
          onChange={(e) => setEditStudent({ ...editStudent, avatar: e.target.files[0] })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Avatar"
        />
      </div>

      <div className="flex justify-between gap-4 mt-6">
        <button
          onClick={updateStudent}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Save
        </button>
        <button
          onClick={() => setShowModal(false)}
          className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Student;
