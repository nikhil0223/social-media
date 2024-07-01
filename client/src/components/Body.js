import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import UserContext from '../Utils/PostContext';

const Body = () => {
  const [posts, setPosts] = useState([]);
  return (
    <UserContext.Provider value={{ posts: posts, setPosts }}>
      <div>
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

export default Body;
