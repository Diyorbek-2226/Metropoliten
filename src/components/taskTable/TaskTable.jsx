import { FaDownload } from "react-icons/fa";
import '../../components/studentcomponent/person/person.css'

import { useState, useEffect } from "react";
import BackButton from "../BackButton/BackButton";

export default function TasksTable() {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchedule = async () => {
    try {
      const response = await fetch('http://67.205.170.103:8001/api/v1/main/task/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setTask(data.results || []);
      console.log(data.results);
      
    } catch (err) {
      console.error("Error fetching schedule:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen person">
      <div className="container w-full md:w-4/5 mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <BackButton to={'/student'} title={'Bosh sahifaga qaytish'} />
          <BackButton to={'/student'} title={'Orqaga qaytish'} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="hidden md:table-row">
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-medium">Fanlar</th>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-medium">Vazifa</th>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-medium">Topshirish muddati</th>
                  <th className="py-2 px-4 border-b text-left text-gray-600 font-medium">Izoh</th>
                </tr>
              </thead>
              <tbody>
                {task.map((item, index) => (
                  <tr key={index} className="md:table-row block mb-4 md:mb-0 md:border-b border-gray-200">
                    <td className="py-2 px-4 border-b md:border-none text-gray-700 block md:table-cell">
                      <span className="font-medium md:hidden">Fanlar:</span> {item.description}
                    </td>
                    <td className="py-2 px-4 border-b md:border-none text-blue-600 font-semibold block md:table-cell">
                      <span className="font-medium md:hidden">Vazifa:</span>
                      {item.file ? (
                        <a
                          href={item.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="flex items-center space-x-2 text-blue-500"
                        >
                          <FaDownload className="mr-2" /> {item.name || "Yuklab olish"}
                        </a>
                      ) : (
                        "Vazifa mavjud emas"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b md:border-none text-gray-700 block md:table-cell">
                      <span className="font-medium md:hidden">Topshirish muddati:</span>
                      {item.expired ? (
                        <span className="text-red-500 bg-red-100 px-2 py-1 rounded">Muddat o'tib ketti</span>
                      ) : (
                        item.finished_date
                      )}
                    </td>
                    <td className="py-2 px-4 border-b md:border-none text-gray-700 block md:table-cell">
                      <span className="font-medium md:hidden">Izoh:</span> {item.comment || "Izoh mavjud emas"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
