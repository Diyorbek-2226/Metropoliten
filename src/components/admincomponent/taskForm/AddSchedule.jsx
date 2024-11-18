import { useRef } from 'react';  
import useFetchData from '../../../hook/useFetch/UseFetch';  
import usePostRequest from '../../../hook/postRequest/PostRequest';
 // Import the new hook  

export default function AddSchedule() {  
  const { data: groupData, error: groupError, loading: groupLoading } = useFetchData('main/group/');  
  const { data: teacherData, error: teacherError, loading: teacherLoading } = useFetchData('main/teacher-list/');  
  const { data: courseData, error: courseError, loading: courseLoading } = useFetchData('main/course/');  

  const titleRef = useRef('');  
  const dayRef = useRef('2024-11-17'); // Set default day as needed  
  const startTimeRef = useRef('');  
  const endTimeRef = useRef('');  
  const groupRef = useRef(0);  
  const teacherRef = useRef(0);  
  const courseRef = useRef(0);  

  const { postRequest, loading: isSubmitting, error: postError } = usePostRequest('main/schedule/'); // Use the post request hook  

  const handleSubmit = async (e) => {  
    e.preventDefault();  

    // Collect form data and parse group, teacher, and course as integers  
    const formData = {  
      title: titleRef.current.value,  
      day: dayRef.current.value,  
      start_time: startTimeRef.current.value,  
      end_time: endTimeRef.current.value,  
      group: parseInt(groupRef.current.value, 10),   
      teacher: parseInt(teacherRef.current.value, 10),   
      course: parseInt(courseRef.current.value, 10),   
    };  

    // Basic validation for time  
    if (formData.start_time >= formData.end_time) {  
      alert('End time must be later than start time.');  
      return;  
    }  

    try {  
      await postRequest(formData); // Use the postRequest function from the hook  
      console.log('Schedule added successfully');  
      // Optionally reset form or redirect  
    } catch (error) {  
      alert(`Error: ${error.message}`);  
    }  
  };  

  if (groupLoading || teacherLoading || courseLoading) return <div className="text-center text-xl">Loading...</div>;  
  if (groupError || teacherError || courseError) return <div className="text-center text-xl text-red-500">Error occurred</div>;  

  const groups = groupData?.results || [];  
  const teachers = teacherData?.results || [];  
  console.log(groups);
  
  const courses = courseData?.results || [];  

  return (  
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">  
      <h1 className="text-2xl font-bold text-center mb-6">Add Schedule</h1>  

      <div className="space-y-2">  
        <input  
          type="text"  
          name="title"  
          ref={titleRef}  
          placeholder="Title"  
          required  
          className="w-full p-2 border border-gray-300 rounded-md"  
        />  

        <input  
          type="date"  
          name="day"  
          ref={dayRef}  
          className="w-full p-2 border border-gray-300 rounded-md"  
        />  

        <div className="flex space-x-4">  
          <input  
            type="time"  
            name="start_time"  
            ref={startTimeRef}  
            required  
            className="w-full p-2 border border-gray-300 rounded-md"  
          />  

          <input  
            type="time"  
            name="end_time"  
            ref={endTimeRef}  
            required  
            className="w-full p-2 border border-gray-300 rounded-md"  
          />  
        </div>  

        <select name="group" ref={groupRef} required className="w-full p-2 border border-gray-300 rounded-md">  
          {groups.map((group) => (  
            <option key={group.id} value={group.id}>  
              {group.name}  
            </option>  
          ))}  
        </select>  

        <select name="teacher" ref={teacherRef} required className="w-full p-2 border border-gray-300 rounded-md">  
          {teachers.map((teacher) => (  
            <option key={teacher.id} value={teacher.id}>  
              {teacher.fullname}  
            </option>  
          ))}  
        </select>  

        <select name="course" ref={courseRef} required className="w-full p-2 border border-gray-300 rounded-md">  
          {courses.map((course) => (  
            <option key={course.id} value={course.id}>  
              {course.name}  
            </option>  
          ))}  
        </select>  
      </div>  

      <button  
        type="submit"  
        disabled={isSubmitting}   
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"  
      >  
        {isSubmitting ? 'Submitting...' : 'Add Schedule'}  
      </button>  

      {postError && <div className="text-red-500">{postError.message}</div>} {/* Display error if any */}  
    </form>  
  );  
}