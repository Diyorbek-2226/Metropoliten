import { useNavigate } from 'react-router-dom';  
import { MdErrorOutline } from 'react-icons/md'; // Xato belgisini import qilish  

const NotAuthorized = () => {  
 // Har qanday dinamik parametrni olish  
  const navigate = useNavigate(); // Navigatsiya uchun hook  

  const handleRedirect = () => {  
    navigate('/login');   
  };  

  return (  
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700 px-4">  
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center space-y-6">  
        <MdErrorOutline className="text-red-500 text-6xl" /> {/* Xato ikoni */}  
        <h2 className="text-3xl font-semibold">  
          "Saytga kirish uchun sizga ruxsat berilmagan!"  
        </h2>  
        <p className="text-center text-gray-600 max-w-md">  
          Ushbu qidirayotgan sahifa mavjud emas yoki siz bu sahifaga kirish huquqiga ega emassiz.   
          Agar kirish huquqiga ega ekanligingizga ishonchingiz komil bo'lsa, iltimos tizimga kirishingizni so'raymiz.  
        </p>  
        <button  
          onClick={handleRedirect}   
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"  
        >  
          Kirish uchun bu yerni bosing  
        </button>  
      </div>  
    </div>  
  );  
};  

export default NotAuthorized;