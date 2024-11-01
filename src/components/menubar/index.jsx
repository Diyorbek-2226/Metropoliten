import { Popover, Button } from "antd";
import { useState } from "react";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";



export const MenuBar = () => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  
    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  

  const content = (
    <div loading={loading} className="font-mono ">
     <Link to={'/metro/havola'}> Dars jadvali</Link>
     <Link className="block" to={'/metro/tasks'}>Vazifalar </Link>
     <p>Kutubxona</p>
     <Link className="block" to={'/metro/tasktable'}>Yakuniy test </Link>
      <Link to={'/metro/person'}> Shaxsiy {"ma'lumotlar"}</Link>
      
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
