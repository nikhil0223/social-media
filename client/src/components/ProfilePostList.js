import React, { useEffect, useState } from 'react'
import Post from './Post';


const ProfilePostList = (datas) => {

    const jwtToken = localStorage.jwtToken;
    const [userPost, setUserPost] = useState([]);
    

    const fetchPosts = async () => {
        try {
            const response = await fetch('https://social-media-three-iota.vercel.app/posts', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + jwtToken
                }
            });
            const data = await response.json();
            const filteredPost = data.filter((post) =>
                post.creator._id === datas.data._id
            );
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