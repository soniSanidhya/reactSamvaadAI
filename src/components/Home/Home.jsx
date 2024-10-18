import React, { useContext } from "react";
import { Link } from "react-router-dom";
import apiContext from "../../context/Apicontext";
import { useSelector, useDispatch } from "react-redux";
import { setShow } from "../../functionality/sidePanelSlice";
import "./HomeStyles.css";
import ss1 from "../../assets/Screenshot 2024-03-19 094646.png";
import ss2 from "../../assets/Screenshot 2024-03-19 094840.png";
import ss3 from "../../assets/Screenshot 2024-03-19 094646.png";
function Home(props) {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.side.show);
  const apiKey1 = useSelector((state) => state.api.apiKeys);

  // const {apikey} = useContext(apiContext)

  if (apiKey1)
    return (
      <div className="w-full">
        <div className="min-h-12 bg-[#c9ada7]">
          {!show && (
            <button
              onClick={() => {
                dispatch(setShow(true));
              }}
              className="p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.4em"
                height="2.4em"
                viewBox="0 0 24 24"
                fill="none"
              >
                //{" "}
                <path
                  d="M4 6H20M4 12H14M4 18H9"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                //{" "}
              </svg>
            </button>
          )}
        </div>
        <div id="main12">
          <div className="div1" id="first">
            <div className="gotu-regular text-[6em]">संवाद.AI</div>
            <div id="div2">Chat | Listen | Download</div>
          </div>
          <div className="div1" id="second">
            <div id="welcome" className="wel">
              <p className=" text-[2rem] font-bold">
                {" "}
                Welcome to our <br />
                AI-powered PDF summarizer!
              </p>
              <p>
                Upload your book PDF and let our Ai generate a summary for you.
              </p>
              <Link to="/App">
                <button>Chat</button>
              </Link>
            </div>
            <div id="feature" className="wel">
              <h1>Features</h1>
              <p className="text-start">
                Discover the features that make our AI chat PDF Summary tool
                unique
              </p>
              <ul className="text-start">
                <li>AI-powered Summarization</li>
                <li>User-friendly interface</li>
                <li>Quick and accurate results</li>
                <li>Secure and private</li>
              </ul>
            </div>
          </div>
          <div className="div1" id="third">
            <div id="img-container">
              <img src={ss1} alt="" />
              <img src={ss2} alt="" />
              <img src={ss3} alt="" />
            </div>
          </div>
          <div className="div1" id="fourth">
            <div id="div-4">
              Ask questions, get instant answers,and have back and-forth
              conversation with AI
              <br />
              <Link to="/App">
                <button>Try Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  else return <h1>Set APi KEY</h1>;
}

export default Home;
