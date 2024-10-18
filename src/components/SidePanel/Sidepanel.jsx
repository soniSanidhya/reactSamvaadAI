import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setShow } from "../../functionality/sidePanelSlice";
import "./SidePanel.css" ;
function Sidepanel() {
  const dispatch = useDispatch();
  return (
    <div className="min-w-60   text-white min-h-screen h-full  max-w-60 max-sm:fixed bg-slate-950">
      <div className="flex justify-center items-center">
        <button onClick={()=>{dispatch(setShow(false))}} className=" py-5  gotu-regular">संवाद.AI</button>
      </div>
      <div className="">
        <ul className="text-xl leading-10">
        <li  className="hover:bg-slate-900 px-5">
          <Link to="Home" ><span className="pr-[20px]"><i class="fi fi-rr-house-blank"></i></span>Home</Link>
        </li>
        <li  className="hover:bg-slate-900 px-5">
          <Link to="About"><span className="pr-[20px]"><i className="fi fi-rr-info"></i></span>About</Link>
        </li>
        <li  className="hover:bg-slate-900 px-5">
          <Link to="App"><span className="pr-[20px]"><i class="fi fi-rr-chatbot-speech-bubble"></i></span>App</Link>
        </li>
        <li  className="hover:bg-slate-900 px-5">
          {" "}
          <Link to="Setting"><span className="pr-[20px]"><i class="fi fi-rr-settings"></i></span>Setting</Link>
        </li>
        <li  className="hover:bg-slate-900 px-5">
          <Link to="/"><span className="pr-[20px] "><i class="fi fi-rr-api"></i></span>API</Link>
        </li>
      </ul>
      </div>
      
    </div>
  ); 
}

export default Sidepanel;
