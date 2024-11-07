
import { Link, useParams } from 'react-router-dom';

const NotAuthorized = () => {
  const { resource } = useParams(); // Capture any dynamic parameter, e.g., resource or id

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {resource 
          ? `${resource} sahifasi mavjud emas yoki sizga ruxsat berilmagan!` 
          : "Saytga kirish uchun sizga ruxsat berilmagan!"
        }
      </h2>
      <Link 
        to="/login" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Kirish uchun bu yerni bosing
      </Link>
    </div>
  );
};

export default NotAuthorized;
