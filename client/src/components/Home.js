import React, { useContext, useState } from 'react';
import PostList from './PostList';
import Profile from './Profile';
import CreatePost from './CreatePost';
import PostContext from '../Utils/PostContext';
import { Backdrop, Box, Button } from '@mui/material';
import { toggleUser } from '../Redux/userSlice';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch(toggleUser(false));
  const data = JSON.parse(sessionStorage.getItem('data'));
  const { posts } = useContext(PostContext);
  dispatch(toggleUser(false));

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="mt-2">
      <div className="md:grid md:grid-cols-10 ">
        <div className="hidden md:block md:col-span-2 bg-blue-200 rounded-t-lg shadow-lg h-auto">
          <Profile info={data} allinfo={posts} />
        </div>
        <div className='flex justify-center md:hidden'>
          <Button sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }} variant="contained" onClick={handleToggle}>
            Create Post
          </Button>
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleToggle}>
            <Box sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }} onClick={(e) => e.stopPropagation()}>
              <CreatePost creator={data._id} onSubmit={handleToggle}/>
            </Box>
          </Backdrop>
        </div>
        <div className="col-span-10 md:col-span-6">
          <PostList />
        </div>
        <div className="hidden md:block col-span-2 md:col-span-2 bg-blue-200 rounded-t-lg shadow-lg h-auto">
          <CreatePost creator={data._id} />
        </div>
      </div>

    </div>
  );
};

export default Home;
