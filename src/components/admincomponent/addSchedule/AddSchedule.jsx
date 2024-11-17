import { useState } from 'react';  
import useFetchData from '../../../hook/useFetch/UseFetch';  
import axiosInstance from '../../../config/DataService';

export default function AddSchedule() {  
  const { data: groupData, error: groupError, loading: groupLoading } = useFetchData('main/group/');  
  const { data: teacherData, error: teacherError, loading: teacherLoading } = useFetchData('main/teacher-list/');  
  const { data: courseData, error: courseError, loading: courseLoading } = useFetchData('main/course/');  

  const [formData, setFormData] = useState({  
    title: '',  
    day: '2024-11-17', // Set default day as needed  
    start_time: '',  
    end_time: '',  
    group: 0,  
    teacher: 0,  
    course: 0,  
  });  

  const handleChange = (e) => {  
    const { name, value } = e.target;  
    setFormData({  
      ...formData,  
      [name]: value,  
    });  
  };  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    try {  
      const response = await fetch('http://67.205.170.103:8001/api/v1/main/schedule/', {  
        method: 'POST',  
        headers: {  
          'Content-Type': 'application/json',  
        },  
        body: JSON.stringify(formData),  
      });  
      if (!response.ok) {  
        throw new Error('Network response was not ok');  
      }  
      // Handle success if needed  
    } catch (error) {  
      // Handle error if needed  
      console.error('Error:', error);  
    }  
  };  

  if (groupLoading || teacherLoading || courseLoading) return <div className="text-center text-xl">Loading...</div>;  
  if (groupError || teacherError || courseError) return <div className="text-center text-xl text-red-500">Error occurred</div>;  

  const groups = groupData.results || [];  
  const teachers = teacherData.results || [];  
  const courses = courseData.results || [];  

  return (  
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">  
      <h1 className="text-2xl font-bold text-center mb-6">Add Schedule</h1>  

      <div className="space-y-2">  
        <input  
          type="text"  
          name="title"  
          value={formData.title}  
          onChange={handleChange}  
          placeholder="Title"  
          required  
          className="w-full p-2 border border-gray-300 rounded-md"  
        />  

        <input  
          type="date"  
          name="day"  
          value={formData.day}  
          onChange={handleChange}  
          className="w-full p-2 border border-gray-300 rounded-md"  
        />  

        <div className="flex space-x-4">  
          <input  
            type="time"  
            name="start_time"  
            value={formData.start_time}  
            onChange={handleChange}  
            required  
            className="w-full p-2 border border-gray-300 rounded-md"  
          />  

          <input  
            type="time"  
            name="end_time"  
            value={formData.end_time}  
            onChange={handleChange}  
            required  
            className="w-full p-2 border border-gray-300 rounded-md"  
          />  
        </div>  

        <select name="group" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md">  
           
          {groups.map((group) => (  
            <option key={group.id} value={group.id}>{group.name}</option>  
          ))}  
        </select>  

        <select name="teacher" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md">  
         
          {teachers.map((teacher) => (  
            <option key={teacher.id} value={teacher.id}>{teacher.fullname}</option>  
          ))}  
        </select>  

        <select name="course" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md">  
         
          {courses.map((course) => (  
            <option key={course.id} value={course.id}>{course.name}</option>  
          ))}  
        </select>  
      </div>  

      <button type="submit" className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">Add Schedule</button>  
    </form>  
  );  
}
