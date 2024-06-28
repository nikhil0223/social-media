import React, { useContext, useState } from 'react';
import PostList from './PostList';
import Profile from './Profile';
import CreatePost from './CreatePost';
import PostContext from '../Utils/PostContext';
import { toggleUser } from '../Redux/userSlice';
import { useDispatch } from 'react-redux';



const Home = () => {
    const dispatch =useDispatch(toggleUser(false));
    
    const data = JSON.parse(sessionStorage.getItem('data'));
    const {posts} = useContext(PostContext);
    dispatch(toggleUser(false));
    // console.log(data);
    return (
        <div className='mt-2'>
            <div className='grid grid-cols-10'>
                <div className='col-span-2 bg-blue-200 rounded-t-lg shadow-lg h-screen'>
                    <Profile info={data} allinfo={posts}/>
                </div>
                    <div className='col-span-6 shadow-lg '>
                        <PostList/>
                    </div>
                <div className='col-span-2 bg-blue-200 rounded-t-lg shadow-lg h-screen'>
                    <CreatePost creator={data._id} />
                </div>
            </div>
        </div>
    )
}

export default Home;