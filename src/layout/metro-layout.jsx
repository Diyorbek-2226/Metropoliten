// import React from "react";
import { Navigate, Outlet } from "react-router-dom";



export  const MetroLayout = () => {
  const token = localStorage.getItem("token");
  localStorage.removeItem("errorLogin");

  if (!token) return <Navigate to={"/"} />;
  return (
    <div>
      
      <main className=" bg-custom-gray">
        <Outlet />
      </main>
      
    </div>
  );
};
