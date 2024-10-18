import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Api.css'
import apiContext from '../../context/Apicontext';
import ApiContextProvider from '../../context/Apicontextprovider';
import { addApi } from '../../functionality/ApiSlice';
import { useDispatch } from 'react-redux';
function Api(props) {
    // const {setApikey} = useContext(apiContext);
    const [api, setApi] = useState(["", ""]); 
    const dispatch = useDispatch();
   
    // const handleInput = (index, value) => {
    //     setApi((api)=> {
    //         api[index] = value;
    //     })

    // };
    const handleInput = (index, value) => {
        setApi((prevApi) => {
            const newApi = [...prevApi];
            newApi[index] = value;
            return newApi;
        });
    };
    const handleSubmit = () => {
        // Here you can use setApikey with the updated apiKeys state
        dispatch(addApi(api))
        
    };
    return (
      
         <div id='mainDiv' className='flex justify-center items-center w-full h-screen ' >
           
           <div className='w-[60%] h-[60%] bg-white/30 border grid-rows-4 grid border-r-white rounded-lg shadow-lg shadow-current'>

           <div className='items-center flex flex-col justify-center'>
               <h2 className='text-xl'>Enter API KEY for <a href="https://www.chatpdf.com/docs/api/backend" target='_blank' >Samvaad.AI</a></h2>
               <input id='0' className='w-[80%] h-1/2 apikey' type="text" 
              onChange={(e) => handleInput(0, e.target.value)}
               />
           </div>
           <div className='items-center flex flex-col justify-center'>
               <h2 className='text-xl'>Enter API KEY of <a href="https://platform.openai.com/api-keys" target='_blank'>OPEN AI TTS</a></h2>
               <input id='1' className='w-[80%] h-1/2 apikey' type="text" 
               onChange={(e) => handleInput(1, e.target.value)}
               />
           </div>
           <div className='items-center flex flex-col justify-center'>
           <Link to="Home"><button onClick={handleSubmit} className='text-2xl'>Submit</button></Link></div>
           </div>
           <div className='text-4xl flex justify-center items-center' onClick={()=>{
               console.log("Helo")
           }}> 
           </div>
          
       </div>
       
    );
}

export default Api;