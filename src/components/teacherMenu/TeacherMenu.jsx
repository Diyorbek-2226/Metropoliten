


import { Popover, Button } from "antd";
import { useState } from "react";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";



export const TeacherMenu = () => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  
    
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  

  const content = (
    <div loading={loading} className="font-mono ">
     <Link to={'/teacher/havola'}> Dars jadvali</Link>
     <Link className="block" to={'/teacher/person'}>Vazifalar </Link>
     <Link className="block " to={'/teacher/liberary'}>Kutubxona</Link>
     <Link className="block" to={'/teacher/tasktable'}>Yakuniy test </Link>
      <Link to={'/teacher/person'}> Shaxsiy {"ma'lumotlar"}</Link>
      
      
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
            <h1 className="text-2xl text-blue-700">{isOpen ? "Chiqish" : "MENYU"}</h1>
          </div>
        </Button>
      </Popover>
    </>
  );
};
