import { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetchData from '../../../hook/useFetch/UseFetch';
import usePutRequest from '../../../hook/putRequest/PutRequest';
import useDeleteRequest from '../../../hook/deleteRequest/DeleteRequest';

export default function Course() {
  // Fetch data for courses, groups, and teachers
  const { data: courses, error, loading, refetch: refetchCourses } = useFetchData('main/course/');
  const { data: groups } = useFetchData('main/group/');
  const { data: teachers } = useFetchData('main/teacher-list/');
  const { putRequest, loading: updating } = usePutRequest('main/course/');
  const { deleteRequest, loading: deleting } = useDeleteRequest('main/course/');

  const [editingCourse, setEditingCourse] = useState(null);

  // References for form fields
  const nameRef = useRef('');
  const studyPeriodRef = useRef('');
  const trainingRef = useRef('');
  const lessonDayRef = useRef('');
  const groupRef = useRef('');
  const teacherRef = useRef('');

  // Function to initiate editing of a course
  const handleEdit = (course) => {
    setEditingCourse(course);
    nameRef.current.value = course.name;
    studyPeriodRef.current.value = course.study_period;
    trainingRef.current.value = course.training;
    lessonDayRef.current.value = course.lesson_day;
    groupRef.current.value = course.group;
    teacherRef.current.value = course.teacher;
  };

  // Function to handle course update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      name: nameRef.current.value.trim(),
      study_period: studyPeriodRef.current.value,
      training: trainingRef.current.value.trim(),
      lesson_day: lessonDayRef.current.value,
      group: parseInt(groupRef.current.value, 10), // Ensures group is an integer
      teacher: parseInt(teacherRef.current.value, 10), // Ensures teacher is an integer
    };

    try {
      await putRequest(editingCourse.id, updatedData);
      toast.success('Course updated successfully!');
      refetchCourses(); // Refresh the course list
      setEditingCourse(null); // Close modal after successful update
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  // Function to handle course deletion
  const handleDelete = async (id) => {
    try {
      await deleteRequest(id);
      toast.success('Course deleted successfully!');
      refetchCourses(); // Refresh course list after deletion
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching courses</div>;

  return (
    <div className="p-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>

      {/* Courses Table */}
      <table className="table-auto w-full bg-white shadow-md rounded-md mb-4">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Study Period</th>
            <th className="px-4 py-2">Training</th>
            <th className="px-4 py-2">Lesson Day</th>
            <th className="px-4 py-2">Group</th>
            <th className="px-4 py-2">Teacher</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses?.results.map((course) => (
            <tr key={course.id} className="border-t">
              <td className="px-4 py-2">{course.name}</td>
              <td className="px-4 py-2">{course.study_period}</td>
              <td className="px-4 py-2">{course.training}</td>
              <td className="px-4 py-2">{course.lesson_day}</td>
              <td className="px-4 py-2">
                {groups?.results.find((group) => group.id === course.group)?.name || 'N/A'}
              </td>
              <td className="px-4 py-2">
                {teachers?.results.find((teacher) => teacher.id === course.teacher)?.fullname || 'N/A'}
              </td>
              <td className="px-4 py-2">  
                <button
                  onClick={() => handleEdit(course)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-gray-100 p-4 rounded-md shadow-md w-96"
          >
            <h3 className="text-lg font-bold mb-2">Edit Course</h3>
            <input
              type="text"
              ref={nameRef}
              placeholder="Course Name"
              className="w-full p-2 border mb-2 rounded-md"
            />
            <input
              type="date"
              ref={studyPeriodRef}
              className="w-full p-2 border mb-2 rounded-md"
            />
            <input
              type="text"
              ref={trainingRef}
              placeholder="Training"
              className="w-full p-2 border mb-2 rounded-md"
            />
            <input
              type="date"
              ref={lessonDayRef}
              className="w-full p-2 border mb-2 rounded-md"
            />
            <select
              ref={groupRef}
              className="w-full p-2 border mb-2 rounded-md"
              defaultValue={editingCourse.group}
            >
              {groups?.results?.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
            <select
              ref={teacherRef}
              className="w-full p-2 border mb-2 rounded-md"
              defaultValue={editingCourse.teacher}
            >
              {teachers?.results?.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher?.fullname}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              {updating ? 'Updating...' : 'Update'}
            </button>
            <button
              type="button"
              onClick={() => setEditingCourse(null)} // Close modal
              className="px-4 py-2 bg-gray-500 text-white rounded-md ml-2"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
