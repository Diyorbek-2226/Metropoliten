import { useNavigate } from "react-router-dom";
import '../person/person.css'

export default function SubjectsTable() {
    const navigate = useNavigate();
  


    const changePages = () => {
        navigate('/metro');
    };

    const subjects = [
        { subject: "Metropoliten vagonlarning elektr jihozlari", teacher: "Abdurashidov Abdugani" },
        { subject: "Metropoliten vagonlarning elektr jihozlari", teacher: "Abdurashidov Abdugani" },
        { subject: "Metropoliten vagonlarning elektr jihozlari", teacher: "Abdurashidov Abdugani" },
        { subject: "Metropoliten vagonlarning elektr jihozlari", teacher: "Abdurashidov Abdugani" },
        { subject: "Metropoliten vagonlarning elektr jihozlari", teacher: "Abdurashidov Abdugani" },
    ];
    async function fetchSubjects() {
        try {
            const response = await fetch('http://67.205.170.103:8001/api/v1/main/student-list/');
          
            const data = await response.json();
            setData(data.results); // Logs the API data to the console
            return data; // Returns the fetched data
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    
    useEffect(()=>{
        fetchSubjects();
    },[])
    
    

    return (
        <div className="person p-6 bg-gray-100 min-h-screen">
            <div className="container w-11/12 md:w-4/5 mx-auto">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-700 cursor-pointer" onClick={changePages}>
                        Bosh sahifaga qaytish
                    </h2>
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
                            {subjects.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b text-gray-700">{item.subject}</td>
                                    <td className="py-2 px-4 border-b text-gray-700">{item.teacher}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
