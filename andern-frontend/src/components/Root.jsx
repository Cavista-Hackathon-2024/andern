import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Root = () => {
  return (
    <div>
      <NavBar />
      <div className="text-red-600" >This is shared among all</div>
      <div id="detail" className="">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
