import React, { useContext, useEffect, useState } from 'react';
import PostContext from '../Utils/PostContext';
import ProfilePostList from './ProfilePostList';
import { useNavigate } from 'react-router-dom';
import { toggleUser } from '../Redux/userSlice';
import { useDispatch } from 'react-redux';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(toggleUser(true));

  const data = JSON.parse(sessionStorage.getItem('data'));
  const { posts } = useContext(PostContext);
  const [postCount, setPostCount] = useState(0);
  const count = () => {
    if(posts!==null){
      return;
    }
    const matchingCreator = posts?.find((all) => all.creator?._id === data?._id);
    if (matchingCreator) {
      return matchingCreator?.creator?.posts?.length || 0;
    }
    return 0;
  };

  useEffect(() => {
    setPostCount(count());
  }, [posts]);

  return (
    <div className="mt-12 md:ml-20 grid md:grid-cols-12">
      <div className="md:col-span-3 bg-sky-900 text-white rounded-xl md:w-11/12 h-auto w-3/4 md:m-0 md:p-0 mx-auto p-1">
        <div className="flex mt-8 justify-center rounded-full">
          <img
            className="w-32 flex justify-center rounded-full"
            alt="profile"
            src="https://icon-library.com/images/profile-photo-icon/profile-photo-icon-4.jpg"
          />
        </div>
        <h1 className="mt-4 text-3xl text-center">{data?.userName}</h1>
        <div className="m-3 flex justify-center">
          <h1 className="p-2">0 followers</h1>
          <h1 className="p-2">{postCount} posts</h1>
        </div>
        <p className="p-4">
          Write your bio jakdf dfjadbf dajfba mfba dzxf adf mzx ckd faffadfndmv
          dgnsijaf;a;hshgnsjggbndvndsufhda
        </p>
        <div className="flex justify-center mb-8 p-4">
          <button className="p-2 m-2 text-center bg-blue-300 rounded-lg text-white hover:text-blue-600 hover:bg-sky-200">
            Update Profile
          </button>
        </div>
      </div>
      <div className="md:col-span-9 md:bg-sky-200 rounded-xl md:mr-20">
        <div className="h-[27rem]">
          <h1 className="m-2 p-2 text-3xl text-center text-sky-800">Posts</h1>
          <ProfilePostList data={data} />
        </div>
        <div className="flex justify-center bottom-0">
          <button className="p-2 m-2 text-center bg-blue-300 rounded-lg text-sky-800">
            1
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
