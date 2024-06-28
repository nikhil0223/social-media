import React from 'react'
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
        navigate("/auth");
    }

    return (
        <div className='bg-blue-200 shadow-lg grid grid-flow-col'>
            <img className='w-20 rounded-r-lg col-span-1' alt='logo'
                src="https://www.talkwalker.com/hs-fs/hubfs/Website/Blogs/Social%20listening%20report%20header.webp?width=1161&name=Social%20listening%20report%20header.webp" />
            <h1 className='p-2 text-2xl font-bold text-white col-span-10 text-center'>SocialMedia </h1>
            <div className='col-span-1 flex'>
                <Link to='/'>
                    <img className='ml-12 pt-1 w-12 h-12 cursor-pointer ' src='https://cdn-icons-png.freepik.com/512/5973/5973800.png' alt='home-icon' />
                </Link>
                <Link to="/profile" >
                    <img className='ml-8 pt-1 w-12 h-12 cursor-pointer' src='https://icon-library.com/images/profile-photo-icon/profile-photo-icon-4.jpg' alt='profile-icon' />
                </Link>
                <img className='ml-8 pt-1 w-12 h-12 cursor-pointer' src='https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-4/177800/167-512.png' alt='not-icon' />
                <img onClick={handleSignOut}
                    className='ml-8 pt-1 w-12 h-12 cursor-pointer' src='https://cdn-icons-png.flaticon.com/512/4033/4033019.png' alt='log-icon' />
            </div>
        </div>
    )
}

export default Header;