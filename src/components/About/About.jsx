import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShow } from "../../functionality/sidePanelSlice";
import "./AboutStyles.css";
import sanidhyaImage from "../../assets/sanidhya.jpg";
import rishabhImage from "../../assets/Rishabh.png";
import murlidharImage from "../../assets/murlidhar.png";
import akshatImage from "../../assets/Akshat.png";
function About() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.side.show);
  return (
    //         <div className=' h-screen w-full bg-violet-900' >
    //             <div className='flex w-full'>{!show && <button onClick={() => {dispatch(setShow(true))}} className="p-1"><svg xmlns="http://www.w3.org/2000/svg" width="2.4em" height="2.4em" viewBox="0 0 24 24" fill="none">
    // <path d="M4 6H20M4 12H14M4 18H9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    // </svg></button>}
    //             <h1 className="text-white text-center text-5xl  " >About</h1></div>

    //         </div>
    <div class="container">
      <div className="flex">
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
        <div className="flex-1 pr-[38px]">
          <h1>About Chat PDF</h1>
        </div>
      </div>
      <p>
        Chat PDF is a platform dedicated to providing efficient and secure
        conversion of chat messages into PDF format. We strive to offer a
        seamless experience for our users, ensuring that important conversations
        can be archived and shared easily.
      </p>

      <div class="team-section">
        <div class="team-member">
          <img src={sanidhyaImage} alt="Sanidhya Soni" />
          {/* <img src="../../assets/sanidhya.jpg" alt="Sanidhya Soni" /> */}
          <p>Sanidhya Soni</p>
          <p class="role">Co-founder & CEO</p>
          <p>
            Sanidhya is passionate about technology and has years of experience
            in software development.
          </p>
        </div>
        <div class="team-member">
          <img src={akshatImage}
           alt="Akshat Shukla" />
          <p>Akshat Shukla</p>
          <p class="role">Co-founder & CTO</p>
          <p>
            Akshat is an expert in backend development and leads our technical
            team with his innovative ideas.
          </p>
        </div>
        <div class="team-member">
          <img src={rishabhImage} alt="Rishabh Jain" />
          <p>Rishabh Jain</p>
          <p class="role">Lead Designer</p>
          <p>
            Rishabh brings creativity and a keen eye for design to our projects,
            ensuring an intuitive user experience.
          </p>
        </div>
        <div class="team-member">
          <img src={murlidharImage} alt="Murlidhar Carpenter" />
          <p>Murlidhar Carpenter</p>
          <p class="role">Software Engineer</p>
          <p>
            Murlidhar is a dedicated member of our development team,
            specializing in frontend technologies.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
