import React, { useContext, useRef } from 'react';
import PostContext from '../Utils/PostContext';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({creator}) => {

  const formRef = useRef(null);
  const file = useRef(null);
  const title = useRef(null);
  const textarea = useRef(null);
  const tags = useRef(null);
  const {posts,setPosts} = useContext(PostContext);

  const navigate = useNavigate();
  
  const jwtToken = localStorage.jwtToken;


  const resetForm = (e) => {
    e.preventDefault();
    formRef.current.reset();
  };

  const createPostHandler = async (e)=> {
    e.preventDefault();
    const form = e.target;
    const user={
      title: form[0].value,
      tags: form[1].value,
      description: form[2].value,
      selectedFile: form[3].value,
      creator: creator
    }
    // console.log(user.creator);
    formRef.current.reset();
    try{
      const response = await fetch('https://social-media-three-iota.vercel.app/post',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization : 'Bearer ' + jwtToken,
        },
        body : JSON.stringify(user),
      }); 
      const data = await response.json();
      // window.location.reload();
      // navigate('/profile');
      setPosts([...posts,data.post]);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className='m-3 p-2'>
      <form ref={formRef} onSubmit={createPostHandler} >
        <h1 className='p-1 text-center text-2xl'>Create Post</h1>
        <input ref={title} className='mt-8 w-full h-8 rounded-lg p-4'
          type="text " placeholder='title' required/>
        <input ref={tags} className='mt-8 w-full h-8 rounded-lg p-4'
          type="text" placeholder='tags' required/>
        <textarea ref={textarea} className='mt-8 w-full h-32 rounded-lg pt-2 p-4'
          type="text" placeholder='description' required/>
        <input ref={file} className='mt-8 w-full h-12 rounded-2xl p-1'
          type="file" placeholder='choose file' />
        <button className='mt-2 w-full h-10 rounded-lg px-4 bg-indigo-400 text-white hover:text-blue-300 hover:bg-white'>SUBMIT</button>
        <button onClick={resetForm} 
        className='mt-2 w-full h-10 rounded-lg px-4 bg-indigo-400 text-white hover:text-blue-300 hover:bg-white'
        >CLEAR</button>
      </form>
    </div>
  )
}

export default CreatePost;