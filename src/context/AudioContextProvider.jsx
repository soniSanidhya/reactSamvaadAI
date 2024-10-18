import React, { useState } from "react";
import AudioContext from "./AudioContext";

const AudioContextProvider = ({children})=>{
    const [currentAudio , SetcurrentAudio] = useState(null)
    return(
      <AudioContext.Provider value ={{currentAudio, SetcurrentAudio}}>
        {children}
      </AudioContext.Provider>  
    );
}

export default AudioContextProvider;