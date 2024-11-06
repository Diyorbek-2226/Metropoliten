import "./login.css";
import { useRef, useState } from "react";
import { login } from "../../redux/auth/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const userRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // State to manage login error messages

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 

    const obj = {
      passport: userRef.current.value,
      password: passwordRef.current.value,
    };

    const resultAction = await dispatch(login(obj));

    if (login.fulfilled.match(resultAction)) {
      const role = resultAction.payload.data.role; 
      localStorage.setItem("role", role); 
      
      // Rolega qarab yo'nalishni belgilaymiz
      if (role === "admin") {
        navigate('/admin');        
      } else if (role === "student") {        
        navigate("/student");  // navigate funksiyasidan foydalanish
      } else if (role === "teacher") {
        navigate('/teacher');   
      } 
    } else {
      setError("Login failed. Please check your credentials.");
    }

    setLoading(false);
  };

  return (
    <header className="h-screen bg-gradient-to-r from-blue-500 to-blue-700">
      <div className="container w-full grid place-items-center h-full">
        <form className="Form-submit rounded-[40px] text-white font-mono w-[580px] bg-opacity-80 ">
          <div className="mt-12 mb-12">
            <div>
              <h6 className="font-bold text-sm mt-2 mb-2">Your logo</h6>
              <h2 className="text-2xl font-bold mb-2 mt-2">Login</h2>
            </div>
            <div className="mt-4 mb-4 ">
              <label className="block mt-1 mb-1" htmlFor="username">
                Login
              </label>
              <input
                className="block w-full p-2 rounded text-black  outline-none "
                ref={userRef}
                id="username"
                placeholder="F.I.SH"
                type="text"
              />
            </div>
            <div className="mt-4 mb-4">
              <label className="block mt-1 mb-1" htmlFor="password">
                Parol
              </label>
              <input
                className="block w-full p-2 rounded text-black outline-none"
                ref={passwordRef}
                id="password"
                placeholder="Password"
                type="password"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
            <div className="mt-6">
              <button
                onClick={handleLogin}
                className="w-full bg-slate-500 p-2 rounded hover:bg-slate-600 transition mt-2 mb-2"
                type="submit"
              >
                {loading ? (
                  <div className="w-5 h-5 mx-auto border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                  "Kirish"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </header>
  );
}
