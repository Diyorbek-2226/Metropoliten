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
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
            {title}
        </button>
    );
}
