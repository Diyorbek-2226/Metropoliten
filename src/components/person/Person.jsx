import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import './person.css';

export default function Person() {
    const user = useSelector((state) => state.auth.currentUser); // Select user from Redux
    const navigate = useNavigate();

    const changePages = () => {
        navigate('/metro');
    };

    return (
        <header className="person p-6 bg-gray-100">
            <div className="container w-11/12 md:w-4/5 mx-auto">
                <div className="mt-4 mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-700">Shaxsiy Ma'lumotlar</h2>
                    <h2 
                        className="onpages text-blue-500 cursor-pointer hover:text-blue-700"
                        onClick={changePages}
                    >
                        Bosh sahifaga qaytish
                    </h2>
                </div>

                <div className="data-person grid grid-cols-1 lg:grid-cols-2 items-start gap-6 mt-12 mb-12">
                    {user ? (
                        <div className="titles w-full bg-white p-4 rounded-lg shadow">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <h1 className="text-lg font-medium text-gray-600">F. I. SH</h1>
                                    <h1 className="text-lg text-gray-800">{user.fullname}</h1>
                                </div>
                                <div className="flex justify-between">
                                    <h1 className="text-lg font-medium text-gray-600">Tug'ilgan kun</h1>
                                    <h1 className="text-lg text-gray-800">{user.birthday}</h1>
                                </div>
                                <div className="flex justify-between">
                                    <h1 className="text-lg font-medium text-gray-600">Jinsi</h1>
                                    <h1 className="text-lg text-gray-800">{user.gender}</h1>
                                </div>
                                <div className="flex justify-between">
                                    <h1 className="text-lg font-medium text-gray-600">Manzil</h1>
                                    <h1 className="text-lg text-gray-800">{user.adress}</h1>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">Yuklanmoqda...</p>
                    )}
                </div>
            </div>
        </header>
    );
}
