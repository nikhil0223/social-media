import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../Redux/postSlice";
import userReducer from "../Redux/userSlice";

const appStore = configureStore({
    reducer:{
        user: userReducer,
        posts: postReducer,
    }
});

export default appStore;