import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleUser } from '../Redux/userSlice';

const Profile = ({ info, allinfo }) => {
  const dispatch = useDispatch();
  const [postCount, setPostCount] = useState(0);
  const count = () => {
    const matchingCreator = allinfo?.find(
      (all) => all?.creator?._id === info._id
    );
    if (matchingCreator) {
      return matchingCreator.creator.posts?.length || 0;
    }
    return 0;
  };
  useEffect(() => {
    setPostCount(count());
  }, [allinfo, info]);
  return (
    <div className="mt-12 ">
      <div className="flex justify-center rounded-full">
        <img
          className="w-32 flex justify-center rounded-full"
          alt="profile"
          src="https://icon-library.com/images/profile-photo-icon/profile-photo-icon-4.jpg"
        />
      </div>
      <h1 className="mt-4 text-3xl text-center">{info?.userName}</h1>
      <div className="m-3 flex justify-center">
        <h1 className="p-2">0 followers</h1>
        <h1 className="p-2">{postCount} posts</h1>
      </div>
      <p className="p-2">Write your bio</p>
      <div className="flex justify-center">
        <button className="p-2 m-2 text-center bg-blue-300 rounded-lg text-white hover:text-blue-600 hover:bg-sky-200">
          Update Profile
        </button>
        <Link to="/profile" onClick={() => dispatch(toggleUser(true))}>
          <button className="p-2 m-2 text-center bg-blue-300 rounded-lg text-white hover:text-blue-600 hover:bg-sky-200">
            More Info
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
