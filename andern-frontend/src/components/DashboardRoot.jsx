import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import DashboardTopNav from "./DashboardTopNav";
import DashboardSideNav from "./DashboardSideNav";

const DashboardRoot = () => {
    return (
    <div className="">
      <DashboardTopNav />
      <div className=" grid grid-cols-[2fr_8fr] " >
        <DashboardSideNav />
        <div className=" pt-10 pl-10 " >
          <div id="detail" className="">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRoot