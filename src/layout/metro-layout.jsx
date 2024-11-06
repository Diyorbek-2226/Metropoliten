import { Navigate, Outlet } from "react-router-dom";

export const MetroLayout = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Redirect to login if no token
  if (!token) return <Navigate to="/" />;

  // Role-based redirection
  if (role === "admin") {
    return <Navigate to="/admin" />;
  } else if (role === "teacher") {
    return <Navigate to="/teacher" />;
  } else if (role === "student") {
    return <Navigate to="/student" />;
  }

  return (
    <header>
      
      <main className="bg-custom-gray">
        <Outlet /> 
      </main>
    </header>
  );
};
