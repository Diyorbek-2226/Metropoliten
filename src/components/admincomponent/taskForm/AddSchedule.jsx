import { useRef } from 'react';  
import useFetchData from '../../../hook/useFetch/UseFetch';  
import usePostRequest from '../../../hook/postRequest/PostRequest';  
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  

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

  const { postRequest, loading: isSubmitting, error: postError } = usePostRequest('main/schedule/');  

  const handleSubmit = async (e) => {  
    e.preventDefault();  

    const formData = {  
      title: titleRef.current.value,  
      day: dayRef.current.value,  
      start_time: startTimeRef.current.value,  
      end_time: endTimeRef.current.value,  
      group: parseInt(groupRef.current.value, 10),   
      teacher: parseInt(teacherRef.current.value, 10),   
      course: parseInt(courseRef.current.value, 10),   
    };  

    if (formData.start_time >= formData.end_time) {  
      toast.error('Tugash vaqti boshlanish vaqtidan keyin bo‘lishi kerak!');  
      return;  
    }  

    try {  
      await postRequest(formData);  
      toast.success('Dars jadvali muvaffaqiyatli qo‘shildi!');  
    } catch (error) {  
      toast.error(`Xatolik yuz berdi: ${error.message}`);  
    }  
  };  

  if (groupLoading || teacherLoading || courseLoading) return <div className="text-center text-xl">Yuklanmoqda...</div>;  
  if (groupError || teacherError || courseError) return <div className="text-center text-xl text-red-500">Xatolik yuz berdi</div>;  

  const groups = groupData?.results || [];  
  const teachers = teacherData?.results || [];  
  const courses = courseData?.results || [];  

  return (  
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">  
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />  
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded-lg p-8 space-y-6">  
        <h1 className="text-3xl font-bold text-gray-800 text-center">Add Schedule</h1>  

        <div className="space-y-4">  
          <input  
            type="text"  
            name="title"  
            ref={titleRef}  
            placeholder="Title"  
            required  
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"  
          />  

          <input  
            type="date"  
            name="day"  
            ref={dayRef}  
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"  
          />  

          <div className="flex space-x-4">  
            <input  
              type="time"  
              name="start_time"  
              ref={startTimeRef}  
              required  
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"  
            />  

            <input  
              type="time"  
              name="end_time"  
              ref={endTimeRef}  
              required  
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"  
            />  
          </div>  

          <select  
            name="group"  
            ref={groupRef}  
            required  
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"  
          >  
            <option value="" disabled selected hidden>Guruhni tanlang</option>  
            {groups.map((group) => (  
              <option key={group.id} value={group.id}>{group.name}</option>  
            ))}  
          </select>  

          <select  
            name="teacher"  
            ref={teacherRef}  
            required  
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"  
          >  
            <option value="" disabled selected hidden>O‘qituvchini tanlang</option>  
            {teachers.map((teacher) => (  
              <option key={teacher.id} value={teacher.id}>{teacher.fullname}</option>  
            ))}  
          </select>  

          <select  
            name="course"  
            ref={courseRef}  
            required  
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"  
          >  
            <option value="" disabled selected hidden>Fani tanlang</option>  
            {courses.map((course) => (  
              <option key={course.id} value={course.id}>{course.name}</option>  
            ))}  
          </select>  
        </div>  

        <button  
          type="submit"  
          disabled={isSubmitting}  
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition disabled:opacity-50"  
        >  
          {isSubmitting ? 'Yuborilmoqda...' : 'Dars jadvalini qo‘shish'}  
        </button>  

        {postError && <div className="text-red-500">{postError.message}</div>}  
      </form>  
    </div>  
  );  
}  
