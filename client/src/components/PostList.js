import React, { useCallback, useContext, useEffect, useState } from 'react'
import Post from './Post';
import PostContext from '../Utils/PostContext';
import { useDispatch } from 'react-redux';


const PostList = () => {

  // const [posts,setPosts] = useState([]);

  const dispatch = useDispatch();
  const jwtToken = localStorage.jwtToken;
  // const posts = useSelector(store => store.posts);
  const {posts,setPosts} = useContext(PostContext);
  // const postList = posts.posts;

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://social-media-three-iota.vercel.app/posts', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + jwtToken
        }
      });
      const data = await response.json();
      setPosts(data);
    }
    catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='mx-2 p-4 '>
    {posts?.map((post,index) => <Post key={index} jwtToken={jwtToken} info={post}/>
      )}
    </div>
  )
}

export default PostList;