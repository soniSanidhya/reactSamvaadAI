import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show : false,
};

export const sidePanelSlice = createSlice({
    name : 'showSide',
    initialState,
    reducers : {
        setShow :(state, action)=>{
              state.show = action.payload;  
        }
    }  
})

export const {setShow} = sidePanelSlice.actions;
export default sidePanelSlice.reducer