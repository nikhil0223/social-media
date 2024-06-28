import React, { useEffect, useState } from 'react'
import Post from './Post';
import { useNavigate } from 'react-router-dom';


const ProfilePostList = (datas) => {

    const jwtToken = localStorage.jwtToken;
    const [userPost, setUserPost] = useState([]);
    const navigate =useNavigate();
    

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:5000/posts', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + jwtToken
                }
            });
            const data = await response.json();
            console.log(data);
            const filteredPost = data.filter((post) =>
                post.creator._id === datas.data._id
            );
            console.log(filteredPost);
            setUserPost(filteredPost);
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
            {userPost?.map((post, index) => <Post key={index} jwtToken={jwtToken} info={post} />
            )}
        </div>
    )
}

export default ProfilePostList;