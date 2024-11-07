// src/App.js
import { Route, Routes, Navigate, Link } from "react-router-dom";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import studentRoutes from "./routes/studentRoutes";
import adminRoutes from "./routes/adminRoutes";
import teacherRoutes from "./routes/teacherRoutes";
import NotAuthorized from "./components/not-authorized/NotAutorized";

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

      <Route path="/not-authorized" element={<NotAuthorized/>} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}

export default App;
