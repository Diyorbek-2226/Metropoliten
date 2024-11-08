import { useEffect, useState } from "react";
import './person.css';  
import BackButton from "../BackButton/BackButton";  
import useFetchData from "../../hook/useFetch/UseFetch";
 // Replace with the actual path of your hook

export default function Person() {  
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Retrieve the ID from localStorage on mount
        const id = localStorage.getItem("id");
        setUserId(id);
    }, []);

    // Call the hook only if userId is available
    const { data: user, loading, error } = useFetchData(
        userId ? `/main/student/${userId}/` : null
    );
    console.log(user, userId);
    

    return (  
        <header className="person p-6">  
            <div className="container mx-auto max-w-3xl">  
                <div className="flex items-center justify-between mb-6">  
                    <h2 className="text-2xl font-semibold text-gray-800">Shaxsiy Ma'lumotlar</h2>  
                    <BackButton title={"Bosh sahifa"} to={'/student'} />  
                </div>  

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">  
                    {loading ? (  
                        <p className="text-center text-gray-600">Yuklanmoqda...</p>  
                    ) : error ? (  
                        <p className="text-center text-red-600">Xatolik: {error.message || error}</p>  
                    ) : user ? (  
                        <>  
                            <div className="space-y-4">  
                                {user.avatar && (  
                                    <div className="mt-4 flex justify-center">  
                                        <img 
                                            src={user.avatar} 
                                            alt="User Avatar" 
                                            className="rounded-full w-28 h-28 object-cover border-4 border-blue-300 shadow-md" 
                                        />  
                                    </div>  
                                )}
                                <InfoRow title="F. I. SH" value={user.fullname || 'Ma\'lumot yo\'q'} />  
                                <InfoRow title="Tug'ilgan kun" value={user.birthday || 'Ma\'lumot yo\'q'} />  
                                <InfoRow title="Jinsi" value={user.gender || 'Ma\'lumot yo\'q'} />  
                                <InfoRow title="Manzil" value={user.address || 'Ma\'lumot yo\'q'} />  
                            </div>  
                        </>  
                    ) : (  
                        <p className="text-center text-gray-600">Ma'lumot topilmadi.</p>  
                    )}  
                </div>  

                <div className="bg-white rounded-lg shadow-lg p-6">  
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Darslar</h2>  
                    <ul className="space-y-2">  
                        {user && user.results && user.results.length > 0 ? user.results.map(result => (  
                            <li 
                                key={result.id} 
                                className="flex justify-between bg-blue-50 hover:bg-blue-100 p-2 rounded-md transition duration-200"
                            >  
                                <span className="text-gray-800">{result.name}</span>  
                                <span className="text-gray-600">{result.study_period}</span>  
                            </li>  
                        )) : (
                            <li className="text-gray-600">Darslar mavjud emas</li>
                        )}  
                    </ul>  
                </div>  
            </div>  
        </header>  
    );  
}  

// Reusable component for displaying information rows
const InfoRow = ({ title, value }) => (  
    <div className="flex justify-between bg-gray-100 p-3 rounded-md shadow-md">  
        <h1 className="text-lg font-medium text-gray-600">{title}</h1>  
        <h1 className="text-lg text-gray-800">{value}</h1>  
    </div>  
);  
