// BackButton.js
import { useNavigate } from "react-router-dom";

export default function BackButton({title, to }) {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(to);
    };

    return (
        <button 
            onClick={handleBackClick} 
            className="text-xl font-semibold text-gray-700 cursor-pointer hover:text-blue-500"
        >
            {title}
        </button>
    );
}
