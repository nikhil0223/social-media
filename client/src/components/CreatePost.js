import React, { useContext, useRef } from 'react';
import PostContext from '../Utils/PostContext';

const CreatePost = ({ creator,onSubmit }) => {
  const formRef = useRef(null);
  const { posts, setPosts } = useContext(PostContext);

  const jwtToken = localStorage.jwtToken;

  const resetForm = (e) => {
    e.preventDefault();
    formRef.current.reset();
    if(window.innerWidth <= 768){
      onSubmit();
    }
  };

  const createPostHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();

    formData.append('title', form.title.value);
    formData.append('tags', form.tags.value);
    formData.append('description', form.description.value);
    formData.append('selectedFile', form.file.files[0]);
    formData.append('creator', creator);
    formRef.current.reset();
    try {
      const response = await fetch('https://social-media-three-iota.vercel.app/post', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwtToken,
        },
        body: formData,
      });
      const data = await response.json();
      setPosts([...posts, data.post]);
      onSubmit();
    } catch (err) {
      console.log(err);
    }
  };
 
  return (
    <div className=" text-black md:w-full w-[286px] ">
      <form ref={formRef} onSubmit={createPostHandler} className='m-2'>
        <h1 className="p-1 text-center text-lg md:text-2xl">Create Post</h1>
        <input
          name="title"
          className="m-2 mt-2 p-3  md:mt-8 w-full h-8 rounded-lg md:p-4 md:m-0 border-2 border-solid border-blue-300"
          type="text "
          placeholder="title"
          required
        />
        <input
          name="tags"
          className="m-2 mt-2  p-3  md:mt-8 w-full h-8 rounded-lg md:p-4 md:m-0 border-2 border-solid border-blue-300"
          type="text"
          placeholder="tags"
          required
        />
        <textarea
          name="description"
          className="m-2 mt-2  p-3 h-24 md:mt-8 w-full md:h-32 rounded-lg md:p-4 md:m-0 border-2 border-solid border-blue-300"
          type="text"
          placeholder="description"
          required
        />
        <input
          name="file"
          className="max-w-md p-2 text-sm md:mt-8  md:h-12 rounded-2xl md:p-3 border-2 border-solid border-blue-300"
          type="file"
          placeholder="file"
        />
        <button className="mt-2 w-full h-10 rounded-lg px-4 bg-indigo-400 text-white hover:text-blue-300 hover:bg-white">
          SUBMIT
        </button>
        <button
          onClick={resetForm}
          className="mt-2 w-full h-10 rounded-lg px-4 bg-indigo-400 text-white hover:text-blue-300 hover:bg-white"
        >
          CLEAR
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
