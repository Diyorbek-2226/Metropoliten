import { useNavigate } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import '../person/person.css'

export default function TasksTable() {
    const navigate = useNavigate();

    const changePages = () => {
        navigate('/metro');
    };

    const tasks = [
        { subject: "Metropoliten vagonlarning elektr jihozlari", task: "Vazifa_1.docx", deadline: "29.05.2024", file: "Vazifa_1.docx", remark: "Yuklang va topshiring" },
        { subject: "Metropoliten vagonlarning elektr jihozlari", task: "Vazifa_1.docx", deadline: "30.05.2024", file: "Vazifa_2.docx", remark: "Yuklang va topshiring" },
        { subject: "Metropoliten vagonlarning elektr jihozlari", task: "Vazifa_1.docx", deadline: "30.04.2024", file: "Muddati o‘tib ketdi", remark: "Yuklang va topshiring", expired: true },
        { subject: "Metropoliten vagonlarning elektr jihozlari", task: "Vazifa_1.docx", deadline: "31.05.2024", file: "Fayl yuklash", remark: "Yuklang va topshiring" },
        { subject: "Metropoliten vagonlarning elektr jihozlari", task: "Vazifa_1.docx", deadline: "01.06.2024", file: "Fayl yuklash", remark: "Yuklang va topshiring" },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen person">
            <div className="container w-11/12 md:w-4/5 mx-auto">
                <div className="mb-4 flex items-center justify-between">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => changePages('/')}
                    >
                        Bosh sahifaga qaytish
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={() => changePages(-1)}
                    >
                        Orqaga qaytish
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-left text-gray-600 font-medium">Fanlar</th>
                                <th className="py-2 px-4 border-b text-left text-gray-600 font-medium">Vazifa</th>
                                <th className="py-2 px-4 border-b text-left text-gray-600 font-medium">Topshirish muddati</th>
                                <th className="py-2 px-4 border-b text-left text-gray-600 font-medium">Fayl</th>
                                <th className="py-2 px-4 border-b text-left text-gray-600 font-medium">Izoh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b text-gray-700">{item.subject}</td>
                                    <td className="py-2 px-4 border-b text-blue-600 font-semibold flex items-center space-x-2">
                                        <FaDownload className="text-blue-500" />
                                        <span>{item.task}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b text-gray-700">{item.deadline}</td>
                                    <td className="py-2 px-4 border-b">
                                        {item.expired ? (
                                            <span className="text-red-500 bg-red-100 px-2 py-1 rounded">{item.file}</span>
                                        ) : (
                                            <span className="text-blue-500 bg-blue-100 px-2 py-1 rounded cursor-pointer">
                                                {item.file}
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b text-gray-700">{item.remark}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
