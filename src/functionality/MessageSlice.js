import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  messages: []
};

export const MessageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        addMessage : (state , action)=>{
            const {msg , by} = action.payload;
            const msgobject = {
                message : msg,
                by : by
            };
            state.messages.push(msgobject);
        }
    }
})

export const {addMessage} = MessageSlice.actions;
export default MessageSlice.reducer
