import "./login.css";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const UserRef = useRef();
  const PasswordRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const errorLoginPost = localStorage.getItem("errorLogin");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = UserRef.current.value;
    const password = PasswordRef.current.value;

    try {
      const response = await axios.post(
        "http://67.205.170.103:8001/api/v1/common/token/obtain",
        {
          passport: user,
          password: password,
        }
      );

      localStorage.setItem("token", response.data.access);
      navigate("/metro");
    } catch (error) {
      console.error("Login failed:", error);
      localStorage.setItem("errorLogin", error.message);
      // Xato bo'lsa, foydalanuvchiga xabar berish
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="h-screen bg-gradient-to-r from-blue-500 to-blue-700">
      <div className="container w-full grid place-items-center h-full">
        <form className="Form-submit rounded-[40px] text-white font-mono w-[580px] bg-opacity-80 ">
          <div className="">
            <div>
              <h6 className="font-bold text-sm mt-2 mb-2">Your logo</h6>
              <h2 className="text-2xl font-bold mb-2 mt-2">Login</h2>
            </div>
            <div className="mt-4 ">
              <label className="block mt-1 mb-1" htmlFor="username">
                Login
              </label>
              <input
                className=" block w-full p-2 rounded"
                ref={UserRef}
                id="username"
                placeholder="F.I.SH"
                type="text"
              />
              {errorLoginPost ? errorLoginPost : ""}
            </div>
            <div className="mt-4">
              <label className="block mt-1 mb-1" htmlFor="password">
                Parol
              </label>
              <input
                className=" block w-full p-2 rounded"
                ref={PasswordRef}
                id="password"
                placeholder="Password"
                type="password"
              />
              {errorLoginPost ? errorLoginPost : ""}
              <small className="block mt-2 mb-2">Forgot password?</small>
            </div>
            <div className="mt-6">
              <button
                onClick={handleLogin}
                className="w-full bg-slate-500 p-2 rounded hover:bg-slate-600 transition"
                type="submit"
              >
                {loading ? (
                  <div className="w-5 h-5 mx-auto border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                  "Kirish"
                )}
              </button>
              <p className="mt-8 mb-2 text-center cursor-pointer">
                or continue with
              </p>
            </div>
            <div className="mt-8 text-center w-full">
              <small className="">
                Don't have an account yet?{" "}
                <a href="#" className="text-blue-300">
                  Register for free
                </a>
              </small>
            </div>
          </div>
        </form>
      </div>
    </header>
  );
}
