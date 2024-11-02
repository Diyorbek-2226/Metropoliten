import "./login.css";
import { useRef, useState } from "react";
import { login } from "../../redux/auth/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login({ setUserRole }) {
  const dispatch = useDispatch();
  const userRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const errorLoginPost = localStorage.getItem("errorLogin");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const credentials = {
      passport: userRef.current.value,
      password: passwordRef.current.value,
    };
    
    const resultAction = await dispatch(login(credentials));
    
    if (login.fulfilled.match(resultAction)) {
      const role = resultAction.payload.role; // Assuming role comes from login API response
      localStorage.setItem("userRole", role);
      setUserRole(role);
      setLoading(false);

      // Navigate based on role
      if (role === "admin") navigate("/admin");
      else if (role === "student") navigate("/student");
      else if (role === "teacher") navigate("/teacher");
    } else {
      setLoading(false);
    }
  };

  return (
    <header className="h-screen bg-gradient-to-r from-blue-500 to-blue-700">
      <div className="container w-full grid place-items-center h-full">
        <form onSubmit={handleLogin} className="Form-submit rounded-[40px] text-white font-mono w-[580px] bg-opacity-80">
          <h6 className="font-bold text-sm mt-2 mb-2">Your logo</h6>
          <h2 className="text-2xl font-bold mb-2 mt-2">Login</h2>
          <div className="mt-4">
            <label className="block mt-1 mb-1" htmlFor="username">Login</label>
            <input
              className="block w-full p-2 rounded text-black"
              ref={userRef}
              id="username"
              placeholder="Enter login"
              type="text"
            />
            {errorLoginPost && <p className="text-red-500">{errorLoginPost}</p>}
          </div>
          <div className="mt-4">
            <label className="block mt-1 mb-1" htmlFor="password">Password</label>
            <input
              className="block w-full p-2 rounded text-black"
              ref={passwordRef}
              id="password"
              placeholder="Password"
              type="password"
            />
            {errorLoginPost && <p className="text-red-500">{errorLoginPost}</p>}
            <small className="block mt-2 mb-2">Forgot password?</small>
          </div>
          <div className="mt-6">
            <button
              disabled={loading}
              className="w-full bg-slate-500 p-2 rounded hover:bg-slate-600 transition"
              type="submit"
            >
              {loading ? (
                <div className="w-5 h-5 mx-auto border-4 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
