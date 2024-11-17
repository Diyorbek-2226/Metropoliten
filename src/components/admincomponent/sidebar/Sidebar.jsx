import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../../logout/Logout";
import { Link2, LogOut } from "lucide-react";
import { Calendar, BookOpen, Users, FileText, Beaker, UserPlus, ClipboardList, School, ChevronDown } from 'lucide-react';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [studentsDropdownOpen, setStudentsDropdownOpen] = useState(false);
  const [teachersDropdownOpen, setTeachersDropdownOpen] = useState(false);
  const [booksDropdownOpen, setBooksDropdownOpen] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-br from-blue-800 to-black  text-white p-6 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:inset-0`}
      >
        <ul className="space-y-2 h-[calc(100vh-2rem)] overflow-y-auto">
          <li>
            <Link to="/admin/addTable" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-colors">
              <Calendar className="w-5 h-5 mr-3" />
             jadval qoshish
            </Link>
          </li>
          <li>
            <Link className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-colors" to={'/admin/scheduleTable'}>
            Jadval 
             </Link>
          </li>
          
          <li>
            <div 
              className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-colors cursor-pointer" 
              onClick={() => setBooksDropdownOpen(!booksDropdownOpen)}
            >
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-3" />
                Kitoblar
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${booksDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            {booksDropdownOpen && (
              <div className="ml-6 space-y-1 mt-2 bg-blue-800/30 rounded-lg p-2">
                <Link to="/admin/addLibery" className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-700/50 transition-colors">
                  <UserPlus className="w-5 h-5 mr-3" />
                  Kitob qo'shish
                </Link>
                <Link to="/admin/editLibery" className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-700/50 transition-colors">
                  <BookOpen className="w-5 h-5 mr-3" />
                  Kitoblar
                </Link>
              </div>
            )}
          </li>

          <li>
            <div 
              className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-colors cursor-pointer" 
              onClick={() => setStudentsDropdownOpen(!studentsDropdownOpen)}
            >
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-3" />
                Talabalar
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${studentsDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            {studentsDropdownOpen && (
              <div className="ml-6 space-y-1 mt-2 bg-blue-800/30 rounded-lg p-2">
                <Link to="/admin/addStudent" className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-700/50 transition-colors">
                  <UserPlus className="w-5 h-5 mr-3" />
                  Add student
                </Link>
                <Link to="/admin/Student" className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-700/50 transition-colors">
                  <Users className="w-5 h-5 mr-3" />
                  Students
                </Link>
              </div>
            )}
          </li>
          
          <li>
            <Link to="/normativ-hujjatlar" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-colors">
              <FileText className="w-5 h-5 mr-3" />
              Normativ hujjatlar
            </Link>
          </li>

          <li>
            <Link to="/fan-yaratish" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-colors">
              <Beaker className="w-5 h-5 mr-3" />
              Fan yaratish
            </Link>
          </li>

          <li>
            <div 
              className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-colors cursor-pointer" 
              onClick={() => setTeachersDropdownOpen(!teachersDropdownOpen)}
            >
              <div className="flex items-center">
                <School className="w-5 h-5 mr-3" />
                O'qituvchilar
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${teachersDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            {teachersDropdownOpen && (
              <div className="ml-6 space-y-1 mt-2 bg-blue-800/30 rounded-lg p-2">
                <Link to="/admin/addteacher" className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-700/50 transition-colors">
                  <UserPlus className="w-5 h-5 mr-3" />
                  Add teacher
                </Link>
                <Link to="/admin/editTeacher" className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-700/50 transition-colors">
                  <School className="w-5 h-5 mr-3" />
                  Teacher
                </Link>
              </div>
            )}
          </li>

          <li>
            <Link to="/test-yaratish" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-colors">
              <ClipboardList className="w-5 h-5 mr-3" />
              Test yaratish
            </Link>
          </li>
          <li>
          <Link to="/logout" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-colors">
          <LogOut className="w-5 h-5 mr-3" />
              Logout
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