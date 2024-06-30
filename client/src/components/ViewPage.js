import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ViewShimmer from '../Utils/Shimmer/ViewShimmer';

const ViewPage = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const jwtToken = localStorage.jwtToken;

    const data = JSON.parse(sessionStorage.getItem('data'));
    const fetchPost = async () => {
        try {
            const response = await fetch('https://social-media-three-iota.vercel.app/view/' + id, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + jwtToken,
                }
            });
            const data = await response.json();
            if (data.post) {
                setPost(data.post);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPost();
    }, [])

    return (
        <div className=''>
            {post ? (
                <div className='my-[6%] mx-[14%] h-[27rem] grid grid-cols-8 '>
                    <div className='col-span-4 bg-blue-200 rounded-l-3xl shadow-xl'>
                        <img className='object-cover w-full h-full rounded-l-3xl' alt='img' src={"http://localhost:5000/" + post?.selectedFile} />
                    </div>
                    <div className='col-span-4 bg-indigo-300 rounded-r-3xl shadow-xl text-white'>
                        <h1 className='py-2 px-8 text-2xl flex justify-center'>{post?.title}</h1>
                        <p className='text-lg align-top px-4 pb-2 border-b-2'>{`Posted by ${data._id === post.creator ? data.userName : post?.creator?.userName}  on date : ${post?.createdAt?.substr('', 10)} `}</p>
                        <p className='text-xl align-top px-4 p-2 h-[16rem]'>{post?.description}</p>
                        <p className='text-xl align-top px-4 p-2 '>{post?.tags}</p>
                    </div>
                </div>
            ) : (
                <ViewShimmer />
            )}

        </div>
    )
}

export default ViewPage;