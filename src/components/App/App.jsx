import React from "react";
import "./Appstyle.css";
import { html2pdf } from "html2pdf.js";
import Message from "./Message"; // @ignore
import Response from "./Response";
import { useRef } from "react";
import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import ExportPdf from "../ExportPdf/ExportPdf";
import AudioContextProvider from "../../context/AudioContextProvider";
import apiContext from "../../context/Apicontext";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../functionality/MessageSlice";
import { setShow } from "../../functionality/sidePanelSlice";

function App() {
  const show = useSelector((state) => state.side.show);
  const dispatch = useDispatch();
  const message1 = useSelector((state) => state.msg.messages);
  const apiKey1 = useSelector((state) => state.api.apiKeys);
  const inputRef = useRef();
  const pdfInput = useRef();
  const chatContainer = useRef();
  const [message, setmessage] = useState("");
  const [pdfOrFile, setPdfOrFile] = useState();
  const [sourceId, setSourceId] = useState();
  const [isNew, setisNew] = useState(false);
  //   const [question, setQuestion] = useState('');
  const [response, setResponse] = useState("");
  const [append, setAppend] = useState([]);
  // const {apikey} = useContext(apiContext)

  // {message : 'hello' , by: 'user'}
  // 1
  const chatWithPDF = useCallback(
    async (pdfOrFile, message) => {
      const sourceId = await addPDFViaURL(pdfOrFile);
      setSourceId(sourceId);
      const response = await sendMessageToPDF(sourceId, message);

      // setAppend((prev) => [...prev, { message: response, by: "bot" }]);

      // const { sourceId, response } = await sendMessageAndGetResponse(pdfOrFile, ques);
      // newresp.children[0].innerText = response;
      // generateSpeech(response);
    },
    [pdfOrFile]
  );

  // async function sendMessageAndGetResponse(pdfUrl, question) {

  //   const sourceId = await addPDFViaURL(pdfUrl);
  //   const response = await sendMessageToPDF(sourceId, message);
  //   return { sourceId, response };
  // }

  async function addPDFViaURL(pdfUrl) {
    const headers = getHeaders();
    const data = { url: pdfUrl };
    const response = await axios.post(
      "https://api.chatpdf.com/v1/sources/add-url",
      data,
      { headers }
    );
    return response.data.sourceId;
  }

  const sendMessageToPDF = useCallback(
    async (sourceId, question) => {
      const headers = getHeaders();
      const data = {
        sourceId: sourceId,
        messages: [{ role: "user", content: question }],
      };
      const response = await axios.post(
        "https://api.chatpdf.com/v1/chats/message",
        data,
        { headers }
      );
      dispatch(addMessage({ msg: response.data.content, by: "bot" }));
      // setAppend((prev) => [
      //   ...prev,
      //   { message: response.data.content, by: "bot" },
      // ]);

      // return ;   `
    },
    [message, pdfOrFile]
  );

  function getHeaders() {
    const apiKey = apiKey1[0];
    // apikey[0];
    // "sec_Y5fWsFoOcnyvR4IECLLgbcc9FDmslaIH";
    //  'sec_Y08DkC9ba48r9qTOhsouf6eJISuKn6tf'; // Replace with your actual API key
    return {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    };
  }

  const sendQuestion = useCallback(
    async (pdfFile, question) => {
      // const pdfFile = document.getElementById('pdfFile').files[0];
      // const pdfFile = pdfOrFile;

      // Check if PDF file is selected
      if (!pdfFile) {
        alert("Please select a PDF file.");
        return;
      }

      // Check if question is entered
      // if (!question.trim()) {
      //     alert('Please enter your question.');
      //     return;
      // }

      // Call functions to add file and send question
      try {
        const sourceId = await addFile(pdfFile);
        setSourceId(sourceId);
        const chatResponse = await sendMessage(sourceId, question);
        // document.getElementById('response').innerText = chatResponse.content;
        // newresp.children[0].innerText = chatResponse.content;
        // generateSpeech(chatResponse.content);

        // setAppend((prev)=> [...prev , {message : chatResponse.content , by : 'bot'}] );
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    },
    [pdfOrFile]
  );
  // Function to add file
  async function addFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    const addFileResponse = await fetch(
      "https://api.chatpdf.com/v1/sources/add-file",
      {
        method: "POST",
        headers: {
          "x-api-key": apiKey1[0],
          //  apikey[0],
          // "sec_Y5fWsFoOcnyvR4IECLLgbcc9FDmslaIH",
          // 'sec_Y08DkC9ba48r9qTOhsouf6eJISuKn6tf'
          // 'sec_Y5fWsFoOcnyvR4IECLLgbcc9FDmslaIH'
        },
        body: formData,
      }
    );

    const addFileData = await addFileResponse.json();
    return addFileData.sourceId;
  }

  // Function to send message
  const sendMessage = useCallback(
    async (sourceId, message) => {
      const questionData = {
        sourceId: sourceId,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      };

      const chatResponse = await fetch(
        "https://api.chatpdf.com/v1/chats/message",
        {
          method: "POST",
          headers: {
            "x-api-key": apiKey1[0],
            // apikey[0],
            // "sec_Y5fWsFoOcnyvR4IECLLgbcc9FDmslaIH",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questionData),
        }
      );

      const chatResponseJson = await chatResponse.json();
      dispatch(addMessage({ msg: chatResponseJson.content, by: "bot" }));
      // appendfun(chatResponseJson.content , "bot");
      // setAppend((prev) => [
      //   ...prev,
      //   { message: chatResponseJson.content, by: "bot" },
      // ]);
    },
    [message, pdfOrFile]
  );
  {
    // const chatWithPDFOrFile = useCallback(async () => {
    //   console.log(message);
    //   console.log(pdfOrFile);
    //     if (!pdfOrFile) {
    //         alert('Please select a PDF file or provide a PDF URL.');
    //         return;
    //     }
    //     try {
    //         const srcId  = await addPdf(pdfOrFile,);
    //         setSourceId(srcId);
    //         const resp = await sendMessage(sourceId, message);
    //         setAppend((prev)=> [...prev , {message : resp , by : 'bot'}] );
    //     } catch (error) {
    //         console.error('Error:', error);
    //         alert('An error occurred. Please try again.');
    //     }
    // }, [pdfOrFile, message]);
    // 1
    //   useEffect(() => {
    //       chatWithPDFOrFile();
    //   }, [chatWithPDFOrFile]);
    // 1
    // const addPdf = async (pdfOrFile) => {
    //     try {
    //           const headers  = getHeaders();
    //           const sourceId = typeof pdfOrFile === 'string' ? await addPDFViaURL(pdfOrFile , headers) : await addFile(pdfOrFile ,headers);
    //           return sourceId;
    //     } catch (error) {
    //         console.error('Error:', error);
    //         alert('An error occurred. Please try again.');
    //         return null;
    //     }
    // }
    // 1
    //   const handleFileChange = (event) => {
    //       setPdfOrFile(event.target.files[0]);
    //   };
    // 1
    //   async function addFile(file ,headers) {
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     const addFileResponse = await fetch('https://api.chatpdf.com/v1/sources/add-file', {
    //         method: 'POST',
    //         headers: headers,
    //         body: formData
    //     });
    //     const addFileData = await addFileResponse.json();
    //     return addFileData.sourceId;
    // }
    //   async function addPDFViaURL(pdfUrl, headers) {
    //     const data = { url: pdfUrl };
    //     const response = await axios.post('https://api.chatpdf.com/v1/sources/add-url', data, { headers });
    //     return response.data.sourceId;
    // }
    // const sendMessage = useCallback(async (sourceId, message) => {
    //     const headers = getHeaders();
    //     const data = {
    //         sourceId: sourceId,
    //         messages: [
    //             {
    //                 role: 'user',
    //                 content: message
    //             }
    //         ]
    //     };
    //     const chatResponse = await fetch('https://api.chatpdf.com/v1/chats/message', {
    //         method: 'POST',
    //         headers: headers,
    //         body: JSON.stringify(data)
    //     });
    //     return chatResponse.json();
    // },
    // [message]);
    // 1
    // 1
    // function getHeaders() {
    //     const apiKey = 'sec_Y08DkC9ba48r9qTOhsouf6eJISuKn6tf'; // Replace with your actual API key
    //     return {
    //         'x-api-key': apiKey,
    //         'Content-Type': 'application/json',
    //     };
    // 1
  }

  // useEffect(()=>{
  //   setAppend(message1);
  // })
  const appendfun = (msg, by) => {
    setAppend((prev) => [...prev, { message: msg, by: by }]);
    dispatch(addMessage(append));
  };

  console.log(message1);
  console.log(append);

  const handleSend = (e) => {
    console.log(message);
    inputRef.current.value = "";
    if (!pdfOrFile) {
      alert("There is no pdf or Url selected");
    } else if (inputRef.current.placeholder === "Message") {
      if (message) {
        dispatch(addMessage({ msg: message, by: "user" }));
        //setAppend((prev) => [...prev, { message: message, by: "user" }]);

        if (typeof pdfOrFile == "string") {
          if (isNew) {
            console.log("calling sendquestion chat");
            chatWithPDF(pdfOrFile, message);
            setisNew(false);
          } else {
            console.log("calling sendMessage");
            sendMessageToPDF(sourceId, message);
          }
        } else {
          if (isNew) {
            console.log("calling sendquestion");
            sendQuestion(pdfOrFile, message);
            setisNew(false);
          } else {
            console.log("calling sendMessage");
            sendMessage(sourceId, message);
          }
        }
      }
    } else {
      inputRef.current.placeholder = "Message";
    }
  };
  const handleQuestionChange = (event) => {
    console.log(append);
    if (inputRef.current.placeholder === "Url") {
      setPdfOrFile(event.target.value);
      setisNew(true);
    } else {
      setmessage(event.target.value);
    }
  };

  const handleUrl = () => {
    console.log("Url");
    if (inputRef.current.placeholder === "Message") {
      inputRef.current.placeholder = "Url";
    } else {
      inputRef.current.placeholder = "Message";
    }
  };
  const handlePdf = (e) => {
    setPdfOrFile(e.target.files[0]);
    setisNew(true);
    if (pdfOrFile) {
    }
  };

  return (
    <>
      <div className="w-full h-screen flex ">
        <div className="absolute transition left-[-240px] w-60 h-full z-10 bg-red-500"></div>
        <div className=" w-full h-full bg-slate-600 grid  grid-rows-[60px_auto_60px]">
          <div className=" h-[60px] row-auto grid grid-cols-4 items-center text-white bg-slate-900">
            <div className="">
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
                    <path
                      d="M4 6H20M4 12H14M4 18H9"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
            <div className="text-center col-span-2 ">Samvaad AI</div>
            <div className="flex justify-center">
              <div className=" bg-slate-700 rounded-lg sm:p-2 p-1">
                <button
                  onClick={() => {
                    console.log("hello");
                  }}
                >
                  Export PDF
                </button>
              </div>
              {/* <ExportPdf element={chatContainer}></ExportPdf> */}
            </div>
          </div>

          <div
            id="Chat"
            className=" grid grid-cols-[.1fr_1fr_.1fr] sm:grid-cols-[.25fr_1fr_.25fr] overflow-y-auto max-h-full py-10 "
          >
            <div className=""></div>
            <div
              id="chat"
              ref={chatContainer}
              className="flex flex-col justify-end"
            >
              <AudioContextProvider>
                {message1.map((element, index) => (
                  <div key={index} className="my-1">
                    <Message message={element.message} by={element.by} />
                  </div>
                ))}
              </AudioContextProvider>
            </div>
            <div className=""></div>
          </div>
          <div className="grid grid-cols-[auto_auto_auto] w-full  bg-slate-800">
            <div className=""></div>
            <div className="  flex justify-center items-center">
              <div className="w-full h-10 px-2 rounded-3xl flex justify-center items-center border ">
                <div className="flex-grow px-1 py-2">
                  <input
                    id="InputBox"
                    ref={inputRef}
                    onChange={(e) => {
                      handleQuestionChange(e);
                    }}
                    type="text"
                    className="w-full text-white bg-transparent "
                    placeholder="Message"
                  />
                </div>
                <div className="flex px-2  justify-center items-center">
                  <button onClick={handleUrl}>
                    <i className="fi fi-tr-link-alt"></i>
                  </button>

                  <label htmlFor="pdfinp">
                    <i className="fi fi-tr-file-pdf"></i>
                  </label>
                  <input
                    id="pdfinp"
                    ref={pdfInput}
                    onChange={(e) => {
                      handlePdf(e);
                    }}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="flex  items-center">
              <button
                onClick={(e) => {
                  handleSend(e);
                }}
                className="mx-2 mt-1"
              >
                <i className="fi fi-tr-paper-plane-top"></i>
              </button>

              {/* <button onClick={handle} className="mx-2 mt-1"> */}
              {/* <i className="fi fi-tr-paper-plane-top"></i></button>     */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
