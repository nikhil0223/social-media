import { useContext } from "react";
import { Link } from "react-router-dom";
import PostContext from "../Utils/PostContext";
import { useSelector } from "react-redux";

const Post = ({info,jwtToken}) => {

  const data = JSON.parse(sessionStorage.getItem('data'));
  const {setPosts} = useContext(PostContext);
  const deleteBtn = useSelector(store=>store.user.profilePage);


  const deleteHandler = async ()=>{
    const postId = info._id;
    try{
      const response = await fetch('https://social-media-three-iota.vercel.app/post/'+postId,{
        method: 'DELETE',
        headers: {
          Authorization : 'Bearer ' + jwtToken,
        }
      });
      const data = await response.json();
      setPosts([]);
      window.location.reload();
      console.log(data);
    }catch(err){
      console.log(err);
    }
  };

  
  return (
    <div className='m-2 p-2 border-4 border-solid border-blue-300 rounded-lg'>
      <p className='text-sm align-top text-gray-600 px-4 '>{`Posted by ${data._id===info.creator? data.userName:info?.creator?.userName} on date : ${(info?.createdAt?.substr('',10))}`}</p>
      <h1 className='px-4  mt-2 text-3xl'>{info?.title}</h1>
      <div className='px-4 flex justify-between'>
        <p className='mt-8 mb-4'>{info?.tags}</p>
        <div className='mt-8 mb-4 ml-full text-lg'>
          <Link to={'/view/'+ info._id} >
            <button 
            className='mx-2 bg-indigo-400 text-white  hover:bg-blue-300 rounded-lg w-14'>View</button>
          </Link>
          {/* <button onClick= {editHandler}
          className='mx-2 bg-indigo-400 text-white  hover:bg-blue-300 rounded-lg w-14'>Edit</button> */}
          {deleteBtn && (<button onClick={deleteHandler}
          className='mx-2 bg-red-400 text-white hover:text-red-400 hover:bg-white rounded-lg w-14'>Delete</button>)}
        </div>
      </div>
    </div>
  )
}

export default Post;