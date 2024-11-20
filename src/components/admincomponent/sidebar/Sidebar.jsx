import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, BookOpen, Users, FileText, Beaker, UserPlus, ClipboardList, School, ChevronDown, LogOut } from 'lucide-react';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [studentsDropdownOpen, setStudentsDropdownOpen] = useState(false);
  const [teachersDropdownOpen, setTeachersDropdownOpen] = useState(false);
  const [booksDropdownOpen, setBooksDropdownOpen] = useState(false);
  const [scheduleDropdownOpen, setScheduleDropdownOpen] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [normativeDropdownOpen, setNormativeDropdownOpen] = useState(false);

  // Function to toggle dropdowns, closing others when opening a new one
  const handleDropdownToggle = (dropdown) => {
    switch(dropdown) {
      case 'schedule':
        setScheduleDropdownOpen(!scheduleDropdownOpen);
        setBooksDropdownOpen(false);
        setStudentsDropdownOpen(false);
        setTeachersDropdownOpen(false);
        setCourseDropdownOpen(false);
        setNormativeDropdownOpen(false);
        break;
      case 'books':
        setBooksDropdownOpen(!booksDropdownOpen);
        setScheduleDropdownOpen(false);
        setStudentsDropdownOpen(false);
        setTeachersDropdownOpen(false);
        setCourseDropdownOpen(false);
        setNormativeDropdownOpen(false);
        break;
      case 'students':
        setStudentsDropdownOpen(!studentsDropdownOpen);
        setScheduleDropdownOpen(false);
        setBooksDropdownOpen(false);
        setTeachersDropdownOpen(false);
        setCourseDropdownOpen(false);
        setNormativeDropdownOpen(false);
        break;
      case 'teachers':
        setTeachersDropdownOpen(!teachersDropdownOpen);
        setScheduleDropdownOpen(false);
        setBooksDropdownOpen(false);
        setStudentsDropdownOpen(false);
        setCourseDropdownOpen(false);
        setNormativeDropdownOpen(false);
        break;
      case 'courses':
        setCourseDropdownOpen(!courseDropdownOpen);
        setScheduleDropdownOpen(false);
        setBooksDropdownOpen(false);
        setStudentsDropdownOpen(false);
        setTeachersDropdownOpen(false);
        setNormativeDropdownOpen(false);
        break;
      case 'normative':
        setNormativeDropdownOpen(!normativeDropdownOpen);
        setScheduleDropdownOpen(false);
        setBooksDropdownOpen(false);
        setStudentsDropdownOpen(false);
        setTeachersDropdownOpen(false);
        setCourseDropdownOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-br from-blue-800 to-black text-white p-6 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:inset-0`}
      >
        <ul className="space-y-2 h-[calc(100vh-2rem)] mt-8 overflow-y-auto">
          
          {/* Schedule Dropdown */}
          <li>
            <div
              className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-colors cursor-pointer"
              onClick={() => handleDropdownToggle('schedule')}
            >
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3" />
                Schedule
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  scheduleDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {scheduleDropdownOpen && (
              <div className="ml-6 space-y-1 mt-2 bg-blue-800/30 rounded-lg p-2">
                <Link
                  to="/admin/addTable"
                  className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-700/50 transition-colors"
                >
                  Add Table
                </Link>
                <Link
                  to="/admin/scheduleTable"
                  className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-700/50 transition-colors"
                >
                  Table
                </Link>
              </div>
            )}
          </li>

          {/* Books Dropdown */}
          <li>
            <div
              className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-colors cursor-pointer"
              onClick={() => handleDropdownToggle('books')}
            >
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-3" />
                Books
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  booksDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {booksDropdownOpen && (
              <div className="ml-6 space-y-1 mt-2 bg-blue-800/30 rounded-lg p-2">
                <Link
                  to="/admin/addLibery"
                  className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-700/50 transition-colors"
                >
                  Add Book
                </Link>
                <Link
                  to="/admin/editLibery"
                  className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-700/50 transition-colors"
                >
                  Books
                </Link>
              </div>
            )}
          </li>

          {/* Students Dropdown */}
          <li>
            <div
              className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-colors cursor-pointer"
              onClick={() => handleDropdownToggle('students')}
            >
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-3" />
                Students
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  studentsDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {studentsDropdownOpen && (
              <div className="ml-6 space-y-1 mt-2 bg-blue-800/30 rounded-lg p-2">
                <Link
                  to="/admin/addStudent"
                  className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-700/50 transition-colors"
                >
                  Add Student
                </Link>
                <Link
                  to="/admin/Student"
                  className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-700/50 transition-colors"
                >
                  Students
                </Link>
              </div>
            )}
          </li>

          {/* Teachers Dropdown */}
          <li>
            <div
              className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-colors cursor-pointer"
              onClick={() => handleDropdownToggle('teachers')}
            >
              <div className="flex items-center">
                <School className="w-5 h-5 mr-3" />
                Teachers
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  teachersDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {teachersDropdownOpen && (
              <div className="ml-6 space-y-1 mt-2 bg-blue-800/30 rounded-lg p-2">
                <Link
                  to="/admin/addteacher"
                  className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-700/50 transition-colors"
                >
                  Add Teacher
                </Link>
                <Link
                  to="/admin/editTeacher"
                  className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-700/50 transition-colors"
                >
                  Teachers
                </Link>
              </div>
            )}
          </li>

          {/* Course Dropdown */}
          <li>
            <div
              className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-colors cursor-pointer"
              onClick={() => handleDropdownToggle('courses')}
            >
              <div className="flex items-center">
                <Beaker className="w-5 h-5 mr-3" />
                Courses
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  courseDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {courseDropdownOpen && (
              <div className="ml-6 space-y-1 mt-2 bg-blue-800/30 rounded-lg p-2">
                <Link
                  to="/admin/addCourse"
                  className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-700/50 transition-colors"
                >
                  Add Course
                </Link>
                <Link
                  to="/admin/Course"
                  className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-700/50 transition-colors"
                >
                  Courses
                </Link>
              </div>
            )}
          </li>

          {/* Normative Dropdown */}
          <li>
            <div
              className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-colors cursor-pointer"
              onClick={() => handleDropdownToggle('normative')}
            >
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-3" />
                Normative Documents
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  normativeDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {normativeDropdownOpen && (
              <div className="ml-6 space-y-1 mt-2 bg-blue-800/30 rounded-lg p-2">
                <Link
                  to="/admin/addDocument"
                  className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-700/50 transition-colors"
                >
                  Add Document
                </Link>
                <Link
                  to="/admin/Document"
                  className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-700/50 transition-colors"
                >
                  Documents
                </Link>
              </div>
            )}
          </li>

          {/* Test Creation */}
          <li>
            <Link
              to="/addAnswer"
              className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-colors"
            >
              <ClipboardList className="w-5 h-5 mr-3" />
              Create Test
            </Link>
          </li>

          {/* Logout Link */}
          <li>
            <Link
              to="/logout"
              className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700/50 transition-colors"
            >
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
