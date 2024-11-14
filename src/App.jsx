// src/App.js
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import studentRoutes from "./routes/studentRoutes";
import teacherRoutes from "./routes/teacherRoutes";
import NotAuthorized from "./components/not-authorized/NotAutorized";
import AdminLayout from "./pages/admin/AdminLayout/AdminLayout";
import AddTeacher from "./components/admincomponent/addteacher/AddTeacher";
import EditTeacher from "./components/admincomponent/editteacher/EditTeacher";
import Student from "./components/admincomponent/student/Student";
import AddStudent from "./components/admincomponent/addStudent/AddStudent";
import NotFound from './components/notFound/not-found'
import TaskForm from "./components/admincomponent/taskForm/TaskForm";
import UpdateLibraryBook from "./components/admincomponent/updateLiberyBook/UpdateLiberyBook";
import AdminLibery from "./components/admincomponent/adminLibery/AdminLibery";



function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/admin" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes with AdminLayout */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} element={AdminLayout} />}>
        <Route path="/admin" element={<div>Admin Home</div>} />
        <Route path="/admin/addTeacher" element={<AddTeacher/>} />
        <Route path="/admin/editTeacher" element={<EditTeacher/>} />
        <Route path="/admin/Student" element={<Student/>} />
        <Route path="/admin/addStudent" element={<AddStudent/>}/>
        <Route path="/admin/addTable" element={<TaskForm/>}/>
        <Route path="/admin/addLibery" element={<UpdateLibraryBook/>}/>
        <Route path="/admin/editLibery" element={<AdminLibery/>}/>
      </Route>

      {/* Student and Teacher Routes */}
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

      <Route path="/not-authorized" element={<NotAuthorized />} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}

export default App;
