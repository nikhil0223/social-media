import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setToken, toggleUser } from '../Redux/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(toggleUser(false));

  const handleSignOut = () => {
    localStorage.clear();
    dispatch(setToken(null));
    navigate('/auth');
  };

  return (
    <div className="bg-blue-200 shadow-lg grid grid-flow-col">
      <img
        className="w-14 h-8 md:w-20 md:h-12 rounded-r-lg md:col-span-1"
        alt="logo"
        src="https://www.talkwalker.com/hs-fs/hubfs/Website/Blogs/Social%20listening%20report%20header.webp?width=1161&name=Social%20listening%20report%20header.webp"
      />
      <h1 className="m-auto text-xl font-semibold text-white md:col-span-10  h-8 md:h-12 md:bold md:text-2xl md:p-2">
        SocialMedia
      </h1>
      <div className="col-span-1 flex">
        <Link to="/">
          <img
            className="h-8 mx-2 md:ml-12 md:pt-1 md:w-12 md:h-12 cursor-pointer "
            src="https://cdn-icons-png.freepik.com/512/5973/5973800.png"
            alt="home-icon"
          />
        </Link>
        <Link to="/profile">
          <img
            className="h-8 mx-auto md:ml-8 md:pt-1 md:w-12 md:h-12 cursor-pointer"
            src="https://icon-library.com/images/profile-photo-icon/profile-photo-icon-4.jpg"
            alt="profile-icon"
          />
        </Link>
        <img
          onClick={handleSignOut}
          className="h-8 mx-auto md:ml-8 md:pt-1 md:w-12 md:h-12 cursor-pointer"
          src="https://cdn-icons-png.flaticon.com/512/4033/4033019.png"
          alt="log-icon"
        />
      </div>
    </div>
  );
};

export default Header;
