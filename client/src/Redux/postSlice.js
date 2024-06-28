import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
    },
    reducers: {
        // addCreatedPost: (state, action) => {
        //     state.posts.push(action.payload);
        // },
        addPost :(state,action)=>{
            const newPost = action.payload;
            const existing = state.posts;
            // console.log(state.posts);
            if(existing.find(post=>post._id===newPost._id)===false){
                state.posts.push(newPost);
            }
        }
    }
});

export const { addPost ,addCreatedPost} = postSlice.actions;

export default postSlice.reducer;