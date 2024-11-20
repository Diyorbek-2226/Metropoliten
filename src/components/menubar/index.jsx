import { Popover, Button } from "antd";
import { useState } from "react";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { FaBook, FaCalendarAlt, FaTasks, FaGraduationCap, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Menu ochilishi/yopilishi
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Popover tarkibi
  const content = (
    <div className="font-mono text-gray-800">
      <Link
        to="/student/havola"
        className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-50 rounded transition-colors"
      >
        <FaCalendarAlt className="text-lg text-blue-500" />
        Dars jadvali
      </Link>
      <Link
        to="/student/tasktable"
        className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-50 rounded transition-colors"
      >
        <FaTasks className="text-lg text-blue-500" />
        Vazifalar
      </Link>
      <Link
        to="/student/liberary"
        className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-50 rounded transition-colors"
      >
        <FaBook className="text-lg text-blue-500" />
        Kutubxona
      </Link>
      <Link
        to="/student/tasktable"
        className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-50 rounded transition-colors"
      >
        <FaGraduationCap className="text-lg text-blue-500" />
        Yakuniy test
      </Link>
      <Link
        to="/student/person"
        className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-50 rounded transition-colors"
      >
        <FaUser className="text-lg text-blue-500" />
        Shaxsiy ma'lumotlar
      </Link>
    </div>
  );

  return (
    
    <Popover 
    content={content} 
    trigger="click" 
    placement="bottom"
    visible={isOpen}
    onVisibleChange={toggleMenu}
  >
    <Button className="font-mono" type="white" onClick={toggleMenu}>
      <div className="flex items-center gap-2">
        {isOpen ? (
          <IoIosClose size={28} className="border-2 border-solid border-blue-700 rounded-[8px] bg-blue-700 text-white" />
        ) : (
          <IoIosMenu size={28} className="border-2 border-solid border-blue-700 rounded-[8px] bg-blue-700 text-white" />
        )}
        <h1 className="text-2xl text-blue-700">{isOpen ? "Chiqish" : "MENU"}</h1>
      </div>
    </Button>
  </Popover>
  );
};
