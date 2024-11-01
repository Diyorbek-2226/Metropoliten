import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../person/person.css'

const Table = () => {
  const schedule = [
    { day: 'Dush', date: '13/05', time: '8:30', title: 'Tadbir 1', color: 'bg-blue-400' },
    { day: 'Sesh', date: '14/05', time: '10:30', title: 'Matematika', color: 'bg-yellow-300' },
    { day: 'Chor', date: '15/05', time: '11:30', title: 'Dasturlash', color: 'bg-green-300' },
    { day: 'Pay', date: '16/05', time: '15:00', title: 'Uchrashuv', color: 'bg-yellow-100' },
    { day: 'Jum', date: '17/05', time: '9:00', title: 'Leksiya', color: 'bg-red-300' },
  ];
  const navigate=useNavigate()
  const onSubmitPage=(e)=>{
    e.preventDefault();

    navigate('/metro')
  }

  return (
    <div className="person flex flex-col items-center py-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Haftalik Jadval</h2>
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-4xl">
        <div className="flex justify-between mb-2">
          <button className="text-blue-500">⏮ Oldingi</button>
          <button className="text-gray-600">Haftalik</button>
          <button type='submit' onClick={onSubmitPage} className="text-blue-500">Bosh sahifaga qaytish</button>
        </div>
        <table className="w-full border-collapse border border-gray-200 text-center">
          <thead>
            <tr>
              <th className="border border-gray-200 p-2">Vaqt</th>
              {['Dush 13/05', 'Sesh 14/05', 'Chor 15/05', 'Pay 16/05', 'Jum 17/05'].map((day) => (
                <th key={day} className="border border-gray-200 p-2">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {['8:30', '9:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30'].map((time) => (
              <tr key={time}>
                <td className="border border-gray-200 p-2">{time}</td>
                {Array.from({ length: 5 }).map((_, index) => {
                  const event = schedule.find(e => e.time === time && e.day === ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum'][index]);
                  return (
                    <td key={index} className="border border-gray-200 p-2">
                      {event ? (
                        <div className={`${event.color} p-2 rounded-md`}>
                          <span>{event.title}</span>
                        </div>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
