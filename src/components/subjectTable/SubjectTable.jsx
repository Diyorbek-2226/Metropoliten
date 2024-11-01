import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../person/person.css';
import BackButton from "../BackButton/BackButton";

export default function SubjectsTable() {
    const navigate = useNavigate();
    const [data, setData] = useState([]); // Bo'sh massiv bilan boshlaymiz

    

    async function fetchSubjects() {
        try {
            const response = await fetch('https://backend.ithouseedu.uz/api/v1/main/student-list/');
            const data = await response.json();
            setData(data.results || []); // 'results' bo'lmasa, bo'sh massiv bilan to'ldiramiz
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    console.log(data.results);
    

    useEffect(() => {
        fetchSubjects();
    }, []);

    return (
        <div className="person p-6 bg-gray-100 min-h-screen">
            <div className="container w-11/12 md:w-4/5 mx-auto">
                <div className="mb-4 flex items-center justify-between">
                   <BackButton to={'/metro'}  title={"Bosh sahifaga o'tish"}/>
                    <select className="border border-gray-300 p-2 rounded text-gray-600">
                        <option>2023-2024 yil</option>
                        <option>2022-2023 yil</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-left text-gray-600 font-medium">Fanlar</th>
                                <th className="py-2 px-4 border-b text-left text-gray-600 font-medium">O'qituvchi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b text-gray-700">{item.subject}</td>
                                        <td className="py-2 px-4 border-b text-gray-700">{item.teacher}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="text-center py-4 text-gray-600">
                                       {"Ma'lumotlar"} mavjud emas
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}