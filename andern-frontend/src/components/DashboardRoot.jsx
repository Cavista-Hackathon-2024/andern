import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import DashboardTopNav from "./DashboardTopNav";
import DashboardSideNav from "./DashboardSideNav";
import BotComponent from "./BotComponent";

const DashboardRoot = () => {
    return (
    <div className="">
      <DashboardTopNav />
      <div className=" grid grid-cols-[2fr_8fr_2fr] " >
        <DashboardSideNav />
        <div className=" p-10 " >
          <div id="detail" className="">
            <Outlet />
          </div>
        </div>
        <div className=" mr-5 " >
          <BotComponent />
        </div>
      </div>
    </div>
  );
};

export default DashboardRoot