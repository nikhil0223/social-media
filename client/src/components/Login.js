import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkValidData } from '../Utils/validator';

const Login = () => {
  const [isSignedInForm, setIsSignedInForm] = useState(true);
  const [err, setErr] = useState(null);

  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();
  localStorage.clear();

  const handleLogin = async (e) => {
    setErr(null);
    e.preventDefault();
    const message = checkValidData(email.current.value, password.current.value);
    setErr(message);
    if (message != null) {
      return;
    }
    const form = e.target;
    const user = {
      email: form[0].value,
      password: form[1].value,
    };
    try {
      const response = await fetch('https://social-media-three-iota.vercel.app/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (data.status !== 200) {
        setErr(data.message);
      }
      if (data.token) {
        sessionStorage.setItem('data', JSON.stringify(data.info));
        localStorage.setItem('jwtToken', data.token);
        navigate('/');
      }
    } catch (err) {
      console.log('Error during login', err);
    }
  };

  const handleSignup = async (e) => {
    setErr(null);
    e.preventDefault();
    const message = checkValidData(email.current.value, password.current.value);
    setErr(message);
    const form = e.target;
    const user = {
      username: form[0].value,
      email: form[1].value,
      password: form[2].value,
    };
    try {
      const response = await fetch('https://social-media-three-iota.vercel.app/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log(data);
      navigate('/');
    } catch (err) {
      console.log('Error during sign up', err);
    }
  };

  return (
    <div className="">
      <div className="">
        <img
          className="absolute w-screen h-screen object-cover -z-10"
          src="https://e1.pxfuel.com/desktop-wallpaper/407/1022/desktop-wallpaper-website-backgrounds-login-page.jpg"
          alt="img"
        />
      </div>
      <div className="flex justify-center ">
        <div className="fixed flex flex-col w-3/4 mt-16  mr-14 md:w-3/12 md:mt-16 md:mx-16">
          <form
            onSubmit={isSignedInForm ? handleLogin : handleSignup}
            className="m-8 w-full bg-blue-300 rounded-xl"
          >
            <h1 className="m-2 p-3 text-2xl md:text-2xl text-white text-center">
              Welcome Back
            </h1>
            {!isSignedInForm && (
              <input
                className="m-2 p-3 w-11/12 rounded-lg"
                type="text"
                placeholder="Full-Name"
                required
              />
            )}
            <input
              ref={email}
              className="m-2 p-3 w-11/12 rounded-lg"
              type="email"
              placeholder="Email-Address"
              required
            />
            <input
              ref={password}
              className="m-2 p-3  w-11/12 rounded-lg"
              type="password"
              placeholder="Password"
              required
            />
            <button
              className="m-2 p-3 w-11/12 rounded-lg text-white bg-blue-600 hover:text-blue-600 hover:bg-sky-200"
              type="submit"
            >
              {isSignedInForm ? 'Login' : 'SignUp'}
            </button>
            <p className="m-2  text-red-500">{err}</p>
            <p
              className="m-2 text-sm text-white"
              onClick={() => setIsSignedInForm(!isSignedInForm)}
            >
              {isSignedInForm
                ? "Don't have an Account? Sign up"
                : 'Already have an Account? Login'}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
