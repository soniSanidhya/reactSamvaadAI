import React from "react";
import { Outlet } from "react-router-dom";
import About from "../About/About";
import Sidepanel from "../SidePanel/Sidepanel";
import Home from "../Home/Home";
import App from "../App/App";
import ApiContextProvider from "../../context/Apicontextprovider";
import { useSelector } from "react-redux";
function Layouts() {
  const show = useSelector(state => state.side.show)
  return (
    
      <div className="w-full h-screen flex ">
        {show && <Sidepanel/>}
        <Outlet />
      </div>
    
  );
}

export default Layouts;
