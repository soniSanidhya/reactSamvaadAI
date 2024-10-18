import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    apiKeys : ["he","llo"]
}


export const apiSlice = createSlice({
    name: 'apiKey',
    initialState,
    reducers:{
        addApi : (state , action) =>{
            state.apiKeys = action.payload;
        }
    }
})
export const{addApi} = apiSlice.actions;
export default apiSlice.reducer;
