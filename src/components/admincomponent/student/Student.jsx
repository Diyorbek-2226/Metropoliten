import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [editStudentId, setEditStudentId] = useState(null);
  const limit = 20;

  // useRef hooks for each field in StudentGet schema
  const fullnameRef = useRef(null);
  const birthdayRef = useRef(null);
  const genderRef = useRef(null);
  const addressRef = useRef(null);
  const expertiseRef = useRef(null);
  const placeOfBirthRef = useRef(null);
  const workPlaceRef = useRef(null);
  const studyPeriodRef = useRef(null);
  const studyTypeRef = useRef(null);
  const userRef = useRef(null);
  const groupRef = useRef(null);

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
    if (
      fullnameRef.current &&
      birthdayRef.current &&
      genderRef.current &&
      addressRef.current &&
      expertiseRef.current &&
      placeOfBirthRef.current &&
      workPlaceRef.current &&
      studyPeriodRef.current &&
      studyTypeRef.current &&
      userRef.current &&
      groupRef.current
    ) {
      const updatedData = {
        fullname: fullnameRef.current.value,
        birthday: birthdayRef.current.value,
        gender: genderRef.current.value,
        address: addressRef.current.value,
        expertise: expertiseRef.current.value,
        place_of_birth: placeOfBirthRef.current.value,
        work_place: workPlaceRef.current.value,
        study_period: studyPeriodRef.current.value || null,
        study_type: studyTypeRef.current.value || null,
        user: parseInt(userRef.current.value, 10),
        group: parseInt(groupRef.current.value, 10),
      };

      try {
        const response = await axios.put(`http://67.205.170.103:8001/api/v1/main/student/${id}/`, updatedData);
        if (response.status === 200) {
          fetchStudents(); // Refresh the list
          setEditStudentId(null); // Exit edit mode
        }
      } catch (error) {
        console.error('Error updating student:', error.response ? error.response.data : error.message);
      }
    }
  };

  const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(`http://67.205.170.103:8001/api/v1/main/student/${id}/`);
      if (response.status === 204) {
        fetchStudents(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error('Error deleting student:', error.response ? error.response.data : error.message);
    }
  };

  const handleEditClick = (student) => {
    setEditStudentId(student.id);
    if (
      fullnameRef.current &&
      birthdayRef.current &&
      genderRef.current &&
      addressRef.current &&
      expertiseRef.current &&
      placeOfBirthRef.current &&
      workPlaceRef.current &&
      studyPeriodRef.current &&
      studyTypeRef.current &&
      userRef.current &&
      groupRef.current
    ) {
      fullnameRef.current.value = student.fullname || '';
      birthdayRef.current.value = student.birthday || '';
      genderRef.current.value = student.gender || '';
      addressRef.current.value = student.address || '';
      expertiseRef.current.value = student.expertise || '';
      placeOfBirthRef.current.value = student.place_of_birth || '';
      workPlaceRef.current.value = student.work_place || '';
      studyPeriodRef.current.value = student.study_period || '';
      studyTypeRef.current.value = student.study_type || '';
      userRef.current.value = student.user || '';
      groupRef.current.value = student.group || '';
    }
  };

  const handleCancelEdit = () => {
    setEditStudentId(null); // Exit edit mode without saving
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
          onChange={(e) => setSearchTerm(e.target.value)} // Ensure this updates correctly
          className="p-2 border rounded w-full sm:w-96"
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
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <tr key={student.id}>
                <td className="border p-2">{(currentPage - 1) * limit + index + 1}</td>
                <td className="border p-2">
                  {editStudentId === student.id ? (
                    <input
                      ref={fullnameRef}
                      type="text"
                      name="fullname"
                      className="p-1 border rounded w-full"
                    />
                  ) : (
                    student.fullname
                  )}
                </td>
                <td className="border p-2">
                  {editStudentId === student.id ? (
                    <input
                      ref={birthdayRef}
                      type="date"
                      name="birthday"
                      className="p-1 border rounded w-full"
                    />
                  ) : (
                    student.birthday
                  )}
                </td>
                <td className="border p-2">
                  {editStudentId === student.id ? (
                    <select ref={genderRef} className="w-full p-1 border rounded">
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  ) : (
                    student.gender
                  )}
                </td>
                <td className="border p-2">
                  {editStudentId === student.id ? (
                    <input
                      ref={addressRef}
                      type="text"
                      name="address"
                      className="p-1 border rounded w-full"
                    />
                  ) : (
                    student.address
                  )}
                </td>
                <td className="border p-2 flex justify-center gap-2">
                  {editStudentId === student.id ? (
                    <>
                      <button 
                        onClick={() => updateStudent(student.id)} 
                        className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
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
                        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
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
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
      
      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`p-2 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Student;
