import React, { useContext, useRef } from 'react';
import PostContext from '../Utils/PostContext';

const CreatePost = ({creator}) => {

  const formRef = useRef(null);
  const {posts,setPosts} = useContext(PostContext);

  
  const jwtToken = localStorage.jwtToken;


  const resetForm = (e) => {
    e.preventDefault();
    formRef.current.reset();
  };

  const createPostHandler = async (e)=> {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();

    formData.append('title', form.title.value);
    formData.append('tags', form.tags.value);
    formData.append('description', form.description.value);
    formData.append('selectedFile', form.file.files[0]);
    formData.append('creator', creator);
    formRef.current.reset();
    try{
      const response = await fetch('https://social-media-three-iota.vercel.app/post',{
        method: 'POST',
        headers: {
          Authorization : 'Bearer ' + jwtToken,
        },
        body :formData,
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
        <input name="title" className='mt-8 w-full h-8 rounded-lg p-4'
          type="text " placeholder='title' required/>
        <input name="tags" className='mt-8 w-full h-8 rounded-lg p-4'
          type="text" placeholder='tags' required/>
        <textarea name="description" className='mt-8 w-full h-32 rounded-lg pt-2 p-4'
          type="text" placeholder='description' required/>
        <input name="file" className='mt-8 w-full h-12 rounded-2xl p-1'
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