import React from 'react';

const ViewPage = () => {
    return (
        <div className=''>
            <div className='my-[6%] mx-[14%] h-[27rem] grid grid-cols-8 '>
                <div className='col-span-4 bg-blue-200 rounded-l-3xl shadow-xl'>
                    <img src='h-full w-full' alt='img'/>
                </div>
                <div className='col-span-4 bg-indigo-300 rounded-r-3xl shadow-xl text-white'>
                    <h1 className='py-2 px-8 text-2xl flex justify-center'>Title</h1>
                    <p className='text-lg align-top px-4 pb-2 border-b-2'>{`Posted by  on date : `}</p>
                    <p className='text-xl align-top px-4 p-2 h-[16rem]'>description</p>
                    <p className='text-xl align-top px-4 p-2 '>tags</p>
                </div>
            </div>
        </div>
    )
}

export default ViewPage;