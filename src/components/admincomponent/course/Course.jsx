import { useState, useRef, useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetchData from '../../../hook/useFetch/UseFetch';

export default function Course() {
  // Fetch data for courses, groups, and teachers
  const { data: courses, error, loading, refetch: refetchCourses } = useFetchData('main/course/');
  const { data: groups } = useFetchData('main/group/');
  const { data: teachers } = useFetchData('main/teacher-list/');

  const [editingCourse, setEditingCourse] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // References for form fields
  const nameRef = useRef(null);
  const studyPeriodRef = useRef(null);
  const trainingRef = useRef(null);
  const lessonDayRef = useRef(null);
  const groupRef = useRef(null);
  const teacherRef = useRef(null);

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
  const handleUpdate = async () => {
    setUpdating(true);
    const updatedData = {
      name: nameRef.current.value.trim(),
      study_period: studyPeriodRef.current.value,
      training: trainingRef.current.value.trim(),
      lesson_day: lessonDayRef.current.value,
      group: parseInt(groupRef.current.value, 10),
      teacher: parseInt(teacherRef.current.value, 10),
    };

    try {
      const response = await fetch(`http://67.205.170.103:8001/api/v1/main/course/${editingCourse.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success('Course updated successfully!');
      refetchCourses();
      setEditingCourse(null);
    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      setUpdating(false);
    }
  };

  // Function to handle course deletion
  const handleDelete = useCallback(async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setDeleting(true);
      try {
        const response = await fetch(`http://67.205.170.103:8001/api/v1/main/course/${id}/`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        toast.success('Course deleted successfully!');
        refetchCourses();
      } catch (error) {
        toast.error(`Error deleting course: ${error.message}`);
      } finally {
        setDeleting(false);
      }
    }
  }, [refetchCourses]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error fetching courses: {error.message}</div>;

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
                  className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  disabled={deleting}
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
            className="bg-white p-6 rounded-lg shadow-xl w-96"
          >
            <h3 className="text-xl font-bold mb-4">Edit Course</h3>
            <input
              type="text"
              ref={nameRef}
              placeholder="Course Name"
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
              required
            />
            <input
              type="date"
              ref={studyPeriodRef}
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
              required
            />
            <input
              type="text"
              ref={trainingRef}
              placeholder="Training"
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
              required
            />
            <input
              type="date"
              ref={lessonDayRef}
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
              required
            />
            <select
              ref={groupRef}
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
              defaultValue={editingCourse.group}
              required
            >
              <option value="">Select Group</option>
              {groups?.results?.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
            <select
              ref={teacherRef}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              defaultValue={editingCourse.teacher}
              required
            >
              <option value="">Select Teacher</option>
              {teachers?.results?.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher?.fullname}
                </option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors mr-2"
                disabled={updating}
              >
                {updating ? 'Updating...' : 'Update'}
              </button>
              <button
                type="button"
                onClick={() => setEditingCourse(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

