import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '../Redux/userSlice';

const Login = () => {

    const [isSignedInForm, setIsSignedInForm] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    localStorage.clear();

    const handleLogin =async (e) => {
        e.preventDefault();
        const form = e.target;
        const user = {
            email: form[0].value,
            password: form[1].value
        }
        // console.log(user);
        try{
            const response = await fetch('http://localhost:5000/auth/login',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(user),
            });
            const data = await response.json();
            
        
            // localStorage.jwtToken=data.token;
            // dispatch(setToken(localStorage.jwtToken));
            dispatch(setUserInfo({email:data.info.email,name:data.info.userName}));
            // navigate('/');
            if (data.token) {
                sessionStorage.setItem('data',JSON.stringify(data.info));
                localStorage.setItem('jwtToken', data.token);
                navigate('/');
            }
        }
        catch(err){
            console.log("Error during login",err);
        }
    };

    const handleSignup =async (e) => {
        e.preventDefault();
        const form = e.target;
        const user = {
            username: form[0].value,
            email: form[1].value,
            password: form[2].value
        }
        try{
            const response = await fetch('http://localhost:5000/auth/signup',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(user),
            });
            const data = await response.json();
            console.log(data);
            navigate('/');
        }
        catch(err){
            console.log("Error during sign up",err);
        }
    };

    return (
        <div className=''>
            <div className="">
                <img className='absolute w-screen h-screen object-cover -z-10'
                    src='https://e1.pxfuel.com/desktop-wallpaper/407/1022/desktop-wallpaper-website-backgrounds-login-page.jpg' alt="img" />
            </div>
            <div className='flex justify-center '>
                <div className='flex flex-col w-3/12 mt-16'>
                    <form onSubmit={isSignedInForm?handleLogin:handleSignup}
                        className='m-8 w-full bg-blue-300 rounded-xl'>
                        <h1 className='m-2 p-3 text-3xl text-white text-center'>Welcome Back</h1>
                        {!isSignedInForm && (<input className='m-3 p-3 w-11/12 rounded-lg' type='text' placeholder='Full-Name' />)}
                        <input className='m-3 p-3 w-11/12 rounded-lg' type='email' placeholder='Email-Address' />
                        <input className='m-3 p-3  w-11/12 rounded-lg' type='password' placeholder='Password' />
                        <button className='m-3 p-3 w-11/12 rounded-lg text-white bg-blue-600 hover:text-blue-600 hover:bg-sky-200' type='submit' >{isSignedInForm? "Login":"SignUp"}</button>
                        <p className='m-3 text-sm text-white' onClick={() => setIsSignedInForm(!isSignedInForm)}>{isSignedInForm ? "Don't have an Account? Sign up": "Already have an Account? Login"}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;