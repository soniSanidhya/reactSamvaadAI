import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "../functionality/ApiSlice.js"
import messageReducer from "../functionality/MessageSlice.js"
import sidePanelReducer from "../functionality/sidePanelSlice.js";
export const store = configureStore({
    reducer : {
       api: apiReducer,
       msg : messageReducer,
       side : sidePanelReducer
    }
})