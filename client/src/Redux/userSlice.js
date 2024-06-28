import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        jwtToken: null,
        userInfo:{
        },
        profilePage: false,
    },
    reducers: {
        setToken : (state,action)=>{
            state.jwtToken = action.payload;
        },
        setUserInfo : (state,action)=>{
            state.userInfo = action.payload;
        },
        toggleUser : (state,action)=> {
            state.profilePage = action.payload;
        }
    }
});

export const {setToken,setUserInfo,toggleUser} = userSlice.actions;

export default userSlice.reducer;