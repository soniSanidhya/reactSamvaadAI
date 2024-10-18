import React, { useState } from "react";
import apiContext from "./Apicontext";

const ApiContextProvider = ({children})=>{
    const [apikey , setApikey] = useState([])
    // const [currentAudio , SetcurrentAudio] = useState([null])
    return(
      <apiContext.Provider value ={{apikey, setApikey}}>
        {children}
      </apiContext.Provider>  
    );
}

export default ApiContextProvider;