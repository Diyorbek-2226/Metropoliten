import { useRef } from 'react';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetchData from '../../../hook/useFetch/UseFetch';
import usePostRequest from '../../../hook/postRequest/PostRequest';

export default function AddCourse() {
  const { data: groupData, error: groupError, loading: groupLoading } = useFetchData('main/group/');
  const { data: teacherData, error: teacherError, loading: teacherLoading } = useFetchData('main/teacher-list/');
  const { postRequest, loading: isSubmitting, error: postError } = usePostRequest('main/course/');

  // Refs for inputs
  const nameRef = useRef('');
  const studyPeriodRef = useRef('');
  const trainingRef = useRef('');
  const lessonDayRef = useRef('');
  const groupRef = useRef('');
  const teacherRef = useRef('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value.trim(),
      study_period: studyPeriodRef.current.value,
      training: trainingRef.current.value.trim(),
      lesson_day: lessonDayRef.current.value,
      group: parseInt(groupRef.current.value, 10),
      teacher: parseInt(teacherRef.current.value, 10),
    };

    try {
      await postRequest(formData);
      toast.success('Course added successfully!');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  if (groupLoading || teacherLoading) return <div className="text-center text-xl">Loading...</div>;
  if (groupError || teacherError) return <div className="text-center text-xl text-red-500">Error fetching data</div>;

  const groups = groupData?.results || [];
  const teachers = teacherData?.results || [];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Add Course</h1>

        {/* Course Name */}
        <input
          type="text"
          name="name"
          ref={nameRef}
          placeholder="Course Name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Study Period */}
        <input
          type="date"
          name="study_period"
          ref={studyPeriodRef}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Training */}
        <input
          type="text"
          name="training"
          ref={trainingRef}
          placeholder="Training Details"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Lesson Day */}
        <input
          type="date"
          name="lesson_day"
          ref={lessonDayRef}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Group */}
        <select
          name="group"
          ref={groupRef}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="" disabled selected hidden>Select Group</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>

        {/* Teacher */}
        <select
          name="teacher"
          ref={teacherRef}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="" disabled selected hidden>Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.fullname}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Add Course'}
        </button>

        {postError && <div className="text-red-500">{postError.message}</div>}
      </form>
    </div>
  );
}
