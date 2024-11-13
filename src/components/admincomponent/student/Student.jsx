import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [editStudentId, setEditStudentId] = useState(null);
  const [editData, setEditData] = useState({});
  const limit = 20;

  useEffect(() => {
    fetchStudents();
  }, [currentPage]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://67.205.170.103:8001/api/v1/main/student-list/?limit=${limit}&offset=${(currentPage - 1) * limit}`);
      setStudents(response.data.results);
      setTotalCount(response.data.count);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const updateStudent = async (id) => {
    try {
      await axios.put(`http://67.205.170.103:8001/api/v1/main/student/${id}/`, editData);
      fetchStudents();
      setEditStudentId(null); // Exit edit mode
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://67.205.170.103:8001/api/v1/main/student/${id}/`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEditClick = (student) => {
    setEditStudentId(student.id);
    setEditData(student); // Initialize editData with the student's current info
  };

  const handleCancelEdit = () => {
    setEditStudentId(null); // Exit edit mode without saving
    setEditData({}); // Clear edit data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const filteredStudents = students.filter(student =>
    student.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
      <table className="w-full border-collapse border">
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
            <th className="border p-2">Passport</th>
            <th className="border p-2">JSHSHIR</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student.id}>
              <td className="border p-2">{(currentPage - 1) * limit + index + 1}</td>
              <td className="border p-2">
                {editStudentId === student.id ? (
                  <input
                    type="text"
                    name="fullname"
                    value={editData.fullname}
                    onChange={handleInputChange}
                    className="p-1 border rounded"
                  />
                ) : (
                  student.fullname
                )}
              </td>
              <td className="border p-2">{editStudentId === student.id ? (
                  <input
                    type="text"
                    name="birthday"
                    value={editData.birthday}
                    onChange={handleInputChange}
                    className="p-1 border rounded"
                  />
                ) : (
                  student.birthday
                )}
              </td>
              <td className="border p-2">{editStudentId === student.id ? (
                  <input
                    type="text"
                    name="gender"
                    value={editData.gender}
                    onChange={handleInputChange}
                    className="p-1 border rounded"
                  />
                ) : (
                  student.gender
                )}
              </td>
              <td className="border p-2">{editStudentId === student.id ? (
                  <input
                    type="text"
                    name="adress"
                    value={editData.adress}
                    onChange={handleInputChange}
                    className="p-1 border rounded"
                  />
                ) : (
                  student.adress
                )}
              </td>
              <td className="border p-2">{student.expertise}</td>
              <td className="border p-2">{student.place_of_birth}</td>
              <td className="border p-2">{student.study_period}</td>
              <td className="border p-2">{student.study_type}</td>
              <td className="border p-2">{student.user.passport}</td>
              <td className="border p-2">{student.user.jshshr}</td>
              <td className="border p-2">
                {editStudentId === student.id ? (
                  <>
                    <button 
                      onClick={() => updateStudent(student.id)} 
                      className="mr-2 bg-green-500 text-white p-1 rounded hover:bg-green-600"
                    >
                      <FaSave/>
                    </button>
                    <button 
                      onClick={handleCancelEdit} 
                      className="bg-gray-500 text-white p-1 rounded hover:bg-gray-600"
                    >
                      <FaTimes/>
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => handleEditClick(student)} 
                      className="mr-2 bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                    >
                      <FaEdit/>
                    </button>
                    <button 
                      onClick={() => deleteStudent(student.id)} 
                      className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                    >
                      <FaTrash/>
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded ${
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Student;
