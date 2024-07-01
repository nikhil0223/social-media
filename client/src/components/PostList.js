import React, { useContext, useEffect } from 'react';
import Post from './Post';
import PostContext from '../Utils/PostContext';

const PostList = () => {
  const jwtToken = localStorage.jwtToken;
  const { posts, setPosts } = useContext(PostContext);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://social-media-three-iota.vercel.app/posts', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + jwtToken,
        },
      });
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="my-4 md:mx-2 md:p-4 ">
      {posts?.map((post, index) => (
        <Post key={index} jwtToken={jwtToken} info={post} />
      ))}
    </div>
  );
};

export default PostList;
