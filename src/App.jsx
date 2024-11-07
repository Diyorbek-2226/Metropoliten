// src/App.js
import { Route, Routes, Navigate, Link } from "react-router-dom";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import studentRoutes from "./routes/studentRoutes";
import adminRoutes from "./routes/adminRoutes";
import teacherRoutes from "./routes/teacherRoutes";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/admin" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      {adminRoutes.map(({ id, path, element }) => (
        <Route
          key={`admin-${id}`}
          path={path}
          element={<ProtectedRoute element={element} allowedRoles={["admin"]} />}
        />
      ))}

      {studentRoutes.map(({ id, path, element }) => (
        <Route
          key={`student-${id}`}
          path={path}
          element={<ProtectedRoute element={element} allowedRoles={["student"]} />}
        />
      ))}
       {teacherRoutes.map(({ id, path, element }) => (
        <Route
          key={`teacher-${id}`}
          path={path}
          element={<ProtectedRoute element={element} allowedRoles={["teacher"]} />}
        />
      ))}

      <Route path="/not-authorized" element={<Link className="flex justify-center bg-slate-500 p-2" to={'/login'}> saytga kirish uchun manashu yerga bosing </Link>} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}

export default App;
