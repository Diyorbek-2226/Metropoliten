// import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import { MenuBar } from "../components/menubar";
import Fanlar from "../components/fanlar/Fanlar";

export const MetroLayout = () => {
  const token = localStorage.getItem("token");
  localStorage.removeItem("errorLogin");

  if (!token) return <Navigate to={"/"} />;
  return (
    <div>
      
      <main className=" bg-custom-gray">
        <Outlet />
      </main>
      <section>
        <Fanlar/>
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
