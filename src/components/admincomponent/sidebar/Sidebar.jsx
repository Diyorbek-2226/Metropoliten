import { Link } from "react-router-dom";
import { Calendar, BookOpen, Users, FileText, Beaker, UserPlus, ClipboardList, GraduationCap, School } from 'lucide-react';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white p-6 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:inset-0`}
      >
     
        <ul className="space-y-2 h-[100vh]">
          <li>
            <Link to="/admin/addTable" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              <Calendar className="w-5 h-5 mr-3" />
              Dars jadval yaratish
            </Link>
          </li>
          <li>
            <Link to="/admin/addLibery" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              <BookOpen className="w-5 h-5 mr-3" />
              Kitob qo'shish
            </Link>
            <Link to="/admin/editLibery" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              <BookOpen className="w-5 h-5 mr-3" />
              Kutubxona
            </Link>
          </li>
          <li>
            <Link to="/admin/Student" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              <Users className="w-5 h-5 mr-3" />
              Talabalar
            </Link>
            <Link className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors" to={'/admin/addStudent'}>
              <UserPlus className="w-5 h-5 mr-3" />
              Talaba qo'shish
            </Link>
          </li>
          <li>
            <Link to="/normativ-hujjatlar" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              <FileText className="w-5 h-5 mr-3" />
              Normativ hujjatlar
            </Link>
          </li>
          <li>
            <Link to="/fan-yaratish" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              <Beaker className="w-5 h-5 mr-3" />
              Fan yaratish
            </Link>
          </li>
          <li>
            <Link to="/guruh-yaratish" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              <School className="w-5 h-5 mr-3" />
              Guruh yaratish
            </Link>
          </li>
          <li>
            <Link to="/test-yaratish" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              <ClipboardList className="w-5 h-5 mr-3" />
              Test yaratish
            </Link>
          </li>
          <li>
            <Link to="/admin/addteacher" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              <UserPlus className="w-5 h-5 mr-3" />
              O'qituvchi qo'shish
            </Link>
            <Link className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors" to={'/admin/editTeacher'}>
              <Users className="w-5 h-5 mr-3" />
              Oqituvchini ro'yxati
            </Link>
           
           
          </li>
        </ul>
      </div>

     
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;