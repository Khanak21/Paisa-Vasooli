import React from 'react';
import Navbar from './Navbar';
import { useState } from 'react';

function Profile({ user, thememode, toggle }) {
  console.log(user);

  return (
    <>
      <Navbar thememode={thememode} toggle={toggle} />
      <div
        className='flex flex-col min-h-screen w-screen justify-start items-center p-3 border-green-700'
        style={{ backgroundColor: thememode === 'dark' ? 'rgb(85, 98, 106)' : 'white' }}
      >
        <div
          className='flex flex-col mx-auto w-[50%] h-[250px] border-1 border-black p-2 rounded-sm profile-head'
          style={{ backgroundColor: thememode === 'dark' ? 'black' : 'rgb(0, 150, 65)', color: thememode == 'dark' ? 'white' : 'black' }}
        >
          <div className=' flex justify-center  items-center w-[70%] h-[80%] mx-auto p-1'>
            <img src='ProfileImg.jpeg' className='w-[40%] h-[100%] rounded-full' alt='' />
            <br />{' '}
          </div>
          <div className='flex justify-center items-center w-full  p-1 text-white'>
            <h4>Username</h4>
          </div>
        </div>

        <div
          className='flex flex-col mx-auto w-[50%] h-auto justify-start items-center p-3 border-1 border-black gap-3 rounded-sm'
          style={{ backgroundColor: thememode === 'dark' ? 'rgb(195, 189, 189)' : 'white', border: '4px solid black' }}
        >
         

          {/* Existing labels and input fields */}
          <label
            htmlFor='username'
            className='w-full flex justify-between items-center gap-1 border-1 p-1 border-black rounded-md'
            style={{ backgroundColor: thememode == 'dark' ? 'rgb(222, 221, 221)' : 'white' }}
          >
            <div className='w-[30%] text-md p-1'>
              <b>Username</b>
            </div>
            <input type='text' value={user.username} readOnly />
          </label>

          <label
            htmlFor='username'
            className='w-full flex justify-between items-center gap-1 border-1 p-1 border-black rounded-md'
            style={{ backgroundColor: thememode == 'dark' ? 'rgb(222, 221, 221)' : 'white' }}
          >
            <div className='w-[30%] text-md p-1'>
              <b>Email</b>
            </div>
            <input type='text' value={user.email} readOnly />
          </label>

           {/* Subheading for Friends */}
           <div className='w-full text-xl font-bolder mb-2' style={{ color: thememode === 'dark' ? 'black' : 'black' }}>
            Friends
          </div>

          
          {user.friends.map((friend, index) => (
            <label
              key={index}
              htmlFor={`friend-${index}`}
              className='w-full flex justify-between items-center gap-1 border-1 p-1 border-black rounded-md'
              style={{ backgroundColor: thememode == 'dark' ? 'rgb(222, 221, 221)' : 'white' }}
            >
             
              <input type='text' id={`friend-${index}`} className='w-[100%]' value={friend} readOnly />
            </label>
          ))}

          <div className='w-full flex justify-end items-center p-2'>
            <button className='bg-green-600 p-3 rounded-lg'>Edit</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
