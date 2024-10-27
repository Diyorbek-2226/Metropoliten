import { Popover, Button } from "antd";
import { useState } from "react";
import { IoIosMenu, IoIosClose } from "react-icons/io";

export const MenuBar = () => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const showLoading = () => {
    setLoading(true);
    
    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const content = (
    <div  onClick={showLoading} loading={loading} className="font-mono">
      <p>Dars jadvali</p>
      <p>Vazifalar</p>
      <p>Kutubxona</p>
      <p>Yakuniy test</p>
      <p>Shaxsiy ma’lumot</p>
      
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
