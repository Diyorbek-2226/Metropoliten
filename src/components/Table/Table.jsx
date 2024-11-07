import { useEffect, useState } from 'react';
import '../person/person.css';
import BackButton from '../BackButton/BackButton';
import useFetchData from '../../hook/useFetch/UseFetch'; // Adjust the path as needed

const Table = () => {
  const [days, setDays] = useState([]);
  const [times, setTimes] = useState({});
  
  // Use the custom hook to fetch data
  const { data, loading, error } = useFetchData('main/schedule/?limit=10');
  const schedule = data?.results || [];  // Safely handle case when data is null

  // Process schedule data once it's available
  useEffect(() => {
    if (schedule.length > 0) {
      // Extract unique days
      const uniqueDays = [...new Set(schedule.map(item => item.day))];
      setDays(uniqueDays);

      // Set times for each day
      const timesByDay = {};
      uniqueDays.forEach(day => {
        const dayTimes = schedule
          .filter(item => item.day === day)
          .map(item => item.start_time.slice(0, 5)); // Format to HH:MM
        timesByDay[day] = [...new Set(dayTimes)];
      });
      setTimes(timesByDay);
    }
  }, [schedule]);

  // Display loading or error messages if needed
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading schedule: {error.message}</p>;

  return (
    <div className="person flex flex-col items-center py-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Haftalik Jadval</h2>
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-4xl">
        <div className="flex justify-between mb-2">
          <BackButton title={'⏮ Oldingi'} />
          <BackButton title={'Haftalik'} />
          <BackButton to={'/student'} title={"Bosh sahifaga o'tish"} />
        </div>
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 w-24 h-16">Vaqt / Kun</th>
              {days.map((day, index) => (
                <th key={index} className="border border-gray-300 p-2 w-24 h-16">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, dayIndex) => (
              times[day]?.map((time, timeIndex) => (
                <tr key={`${dayIndex}-${timeIndex}`}>
                  <td className="border border-gray-300 p-2 w-24 h-16">{time}</td>
                  {days.map((colDay, colDayIndex) => {
                    const scheduleItem = schedule.find(
                      (item) => item.day === colDay && item.start_time.startsWith(time)
                    );
                    return (
                      <td
                        key={colDayIndex}
                        className={`border border-gray-300 p-2 w-24 h-16 ${scheduleItem ? 'bg-yellow-200' : ''}`}
                      >
                        {scheduleItem ? (
                          <p>{scheduleItem.course.training}</p>
                        ) : ''}
                      </td>
                    );
                  })}
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
