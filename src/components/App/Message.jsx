import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import AudioContext from "../../context/AudioContext";
import { useSelector } from "react-redux";

      
  
function Message({ message, by }) {
  const apiKey1 = useSelector(state => state.api.apiKeys)
  const {currentAudio , SetcurrentAudio} = useContext(AudioContext);
  const audioElement = useRef();
  const [crnaudio, setcrnaudio] = useState(true); // Flag to prevent multiple audio generations
  const API_KEY = apiKey1[1];
  const [audio1 , setAudio1] = useState(null)
  // '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';
  
  const generateSpeech = useCallback( async (userres)=>{
    const inputText = userres;

    try {
      const response = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "tts-1",
          input: inputText,
          voice: "echo",
          response_format: "mp3",
          speed: 1.0,
        }),
      });

      if (response.ok) {
        const audioData = await response.blob();
        const audioUrl = URL.createObjectURL(audioData);
        audioElement.current.src = audioUrl;
          if(currentAudio) {currentAudio.pause()}
          SetcurrentAudio(audioElement.current);
          // audioElement.current.play();
          setAudio1(audioElement.current)
        
        console.log("Audio generated successfully.");
      } else {
        console.error("Error generating audio:", response.statusText);
      }
    } catch (error) {
      console.error("Error generating audio:", error);
    }
  }, [message])

  useEffect(() => {
    if (by === 'bot' && crnaudio) {
      generateSpeech(message);
      setcrnaudio(false); // Mark audio as generated
    }
  }, [message, by]); // Add both message and by as dependencies

  // function toggleAudio() {
  //   const audio = audioElement.current;
  //   if(currentAudio){
  //     currentAudio.pause();
  //     console.log(currentAudio);
  //   }
  //   if (!audioElement.current.paused) {
  //     audio.pause();
  //     SetcurrentAudio(null)
  //   } else {
      
  // audio.currentTime = 0;
  //     audio.play();
  //     SetcurrentAudio(audioElement.current);
  //   }
  // }
 
  function toggleAudio() {
    const audio = audioElement.current;
    
    if (!audio) return; // Ensure audioElement is defined
    
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      SetcurrentAudio(null);
    }
    
    if (!audio.paused) {
      audio.pause();
      SetcurrentAudio(null);
    } else {
      audio.currentTime = 0;
      audio.play();
      SetcurrentAudio(audio);
    }
  }
  

  

  // Rest of your rendering logic...

  if (by === 'user') {
    return (
      <div className="flex w-full ">
        <div className="p-1">
          <i className="fi fi-tr-file-pdf"></i>
        </div>
        <div className=" bg-orange-700 py-2 px-4 rounded-2xl">{message}</div>
      </div>
    );
  }
  if (by === 'bot') {
    return (
      <div className="flex w-full justify-end">
        <div><div className=" bg-red-600 py-2 px-4 rounded-2xl">{message}</div></div>
        <div className="p-1 relative top-[-15px] flex justify-between flex-col">
          <i className="fi fi-tr-file-pdf "></i>
          <audio ref={audioElement} src=""></audio>
          
            
          {audio1 && <svg onClick={toggleAudio} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#ffffff" strokeWidth="1.5"></circle> <path d="M15.4137 10.941C16.1954 11.4026 16.1954 12.5974 15.4137 13.059L10.6935 15.8458C9.93371 16.2944 9 15.7105 9 14.7868L9 9.21316C9 8.28947 9.93371 7.70561 10.6935 8.15419L15.4137 10.941Z" stroke="#ffffff" strokeWidth="1.5"></path> </g></svg>}
        </div>
      </div>
    );
  }
}

export default Message;
