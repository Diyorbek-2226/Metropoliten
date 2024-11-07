import AddTeacher from "../components/addteacher/AddTeacher";
import AdminLayout from "../pages/admin/AdminLayout/AdminLayout";

const adminRoutes = [
  { id: 1, path: "/admin", element: AdminLayout },
  {id:2 , path:"/admin/addTeacher" , element:AddTeacher},
  

];

export default adminRoutes;
