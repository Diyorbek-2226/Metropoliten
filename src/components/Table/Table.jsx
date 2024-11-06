import '../person/person.css';  
import BackButton from '../BackButton/BackButton';  
import { useState, useEffect } from 'react';  

const Table = () => {  
  const [schedules, setSchedules] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  const fetchSchedule = async () => {  
    try {  
      const response = await fetch('http://67.205.170.103:8001/api/v1/main/schedule/');  
      if (!response.ok) {  
        throw new Error('Failed to fetch data');  
      }  
      const data = await response.json();  
      console.log(data.results); // Verify the structure of data  
      setSchedules(data.results || []); // Assuming data has a 'results' key  
    } catch (err) {  
      console.error("Error fetching schedule:", err);  
      setError(err.message);  
    } finally {  
      setLoading(false);  
    }  
  };  

  useEffect(() => {  
    fetchSchedule();  
  }, []);  

  // Define time slots and days  
  const times = ['08:00', '09:30', '11:00', '12:00', '13:30', '15:00']; // Adjust based on your API  
  const days = ['Dushanba ', 'Seshanba', 'Chorshanba','Payshanba','Juma','Shanba']; // Adjust days according to your data  

  return (  
    <div className="person flex flex-col items-center py-4 bg-gray-100 min-h-screen">  
      <h2 className="text-xl font-semibold mb-4">Haftalik Jadval</h2>  
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-4xl">  
        <div className="flex justify-between mb-2">  
          <BackButton title={'⏮ Oldingi'} />  
          <BackButton title={'Haftalik'} />  
          <BackButton to={'/student'} title={"Bosh sahifaga o'tish"} />  
        </div>  
        <table className="w-full border-collapse border border-gray-200 text-center">  
          <thead>  
            <tr>  
              <th className="border border-gray-200 p-2">Vaqt</th>  
              {days.map((day, index) => (  
                <th key={index} className="border border-gray-200 p-2">{day}</th>  
              ))}  
            </tr>  
          </thead>  
          <tbody>  
            {schedules.map((el,index) => (<> 
              <tr key={index}>  
                <td className="border border-gray-200 p-2">{el.start_time}</td> 
                <td className="border border-gray-200 p-2">{el.course.name}</td>  
                <td className="border border-gray-200 p-2">{el.end_time}</td> 
              </tr> 
              <tr>
                <td className="border border-gray-200 p-2">{el.start_time}</td> 
              
              </tr> 
              <tr>
                <td className="border border-gray-200 p-2">{el.end_time}</td> 
              
              </tr> 
              
              </> ))}  
          </tbody>  
        </table>  
        {loading && <p>Loading...</p>}  
        {error && <p>Error: {error}</p>}  
      </div>  
    </div>  
  );  
};  

export default Table;