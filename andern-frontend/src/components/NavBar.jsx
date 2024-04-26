import React from "react";
import { menuList } from "../utils/menuList";
import { Link } from "react-router-dom";
import Section from "./Section";

const NavBar = () => {

  console.log(menuList)

  return (
    <div className="bg-pryBlue " >
      <Section>
        <div className="flex justify-between items-center py-5 " >
          {/* Logo */}
          <h1>Andern</h1>
          {/* Menu */}
          <div className="flex gap-11  " >
            {
              menuList.map(({path, name}) => {
                return(
                  <Link to={path} className="capitalize   " >{name}</Link>
                )
              })
            }
          </div>
          {/* Logout */}
          <button>
            Logout
          </button>
        </div>
      </Section>
    </div>

  )
};

export default NavBar;
