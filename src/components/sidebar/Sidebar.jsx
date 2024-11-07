// Sidebar.js
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white p-6 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:inset-0`}
      >
        <h2 className="text-2xl font-semibold mb-6">Menyu</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/dars-jadvali" className="block py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Dars jadvalid yaratish
            </Link>
          </li>
          <li>
            <Link to="/kutubxona" className="block py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Kutubxona
            </Link>
          </li>
          <li>
            <Link to="/talabalar" className="block py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Talabalar
            </Link>
          </li>
          <li>
            <Link to="/normativ-hujjatlar" className="block py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Normativ hujjatlar
            </Link>
          </li>
          <li>
            <Link to="/fan-yaratish" className="block py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Fan yaratish
            </Link>
          </li>
          <li>
            <Link to="/guruh-yaratish" className="block py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Guruh yaratish
            </Link>
          </li>
          <li>
            <Link to="/test-yaratish" className="block py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Test yaratish
            </Link>
          </li>
          <li>
            <Link to="/oquvchi-qoshish" className="block py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              O'quvchi qo'shish
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay for Sidebar on Mobile */}
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
