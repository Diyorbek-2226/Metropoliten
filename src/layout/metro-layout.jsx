// import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const MetroLayout = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  localStorage.removeItem("errorLogin");
  console.log(role)

  if (!token) return <Navigate to={"/"} />;

  if (role === "admin") {
    return <Navigate to={"/admin"} />;
  } else if (role === "teacher") {
    return <Navigate to={"/teacher"} />;
  } else if (role === "student") {
    return <Navigate to={"/student"} />;
  }

  return (
    <div>
      <main className="bg-custom-gray">
        <Outlet />
      </main>
    </div>
  );
};
