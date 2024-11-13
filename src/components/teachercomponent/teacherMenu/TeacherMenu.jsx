import { Popover, Button } from "antd";
import { useState, useEffect } from "react";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import BackButton from "../../BackButton/BackButton";

export const TeacherMenu = () => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const content = (
  
      <div className="font-mono">
        <Link to="/teacher/table">Dars jadvali</Link>
        <Link to="/teacher/person">Vazifalar</Link>
        <Link to="/teacher/liberary">Kutubxona</Link>
        <Link to="/teacher/quiz">Yakuniy test</Link> {/* Make sure this matches teacherRoutes */}
        <Link to="/teacher/information">Shaxsiy ma'lumotlar</Link>
        <a href="/teacher/information"> Shaxsiy ma'lumotlar</a>
      </div>
    
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Popover 
        content={content} 
        trigger="click" 
        placement="bottom"
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
    </>
  );
};
