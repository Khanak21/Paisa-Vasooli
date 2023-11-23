import React from 'react';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios"

import { AiFillEdit } from 'react-icons/ai';
import { RxCross2 } from "react-icons/rx";

function Profile({ user, thememode, toggle,setUser}) {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(user.image);
  const [show,setShow]=useState(false)
  console.log(user)

  console.log(image)

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const imageRef = ref(storage,`images/${image.name}`);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            const addUrl= async()=>{
              try{
                const res = await axios.put(`http://localhost:3001/api/user/addImg/${user._id}`,{url})
                // setUser(res.data.user)
                // localStorage.setItem("user",res.data.user)
                console.log("img url",res.data)
              }catch(err){
                console.log(err)
              }
            } 
            addUrl()
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleShow=()=>{
    setShow(prev=>!prev)
  }

  return (
    <>
      <Navbar thememode={thememode} toggle={toggle} />
      <div
        className='flex flex-col justify-start items-center p-3 border-[#8656cd] h-[130vh]' 
        style={{ backgroundColor: thememode === 'dark' ? '#181818' : '#f0f0f0' }}
      >
        <div
          className='flex flex-col mx-auto w-[50%] h-[250px] border-1 border-black p-2 rounded-sm'
          style={{ backgroundColor: thememode === 'dark' ? '#8656cd' : '#8656cd', color: thememode == 'dark' ? 'white' : 'black' }}
        >
          <div className=' flex justify-center align-middle items-center w-[70%] h-[80%] mx-auto p-1'>
            <img src={url || 'ProfileImg.jpeg'} className='w-[100px] h-[100px] rounded-full static' alt='' />
            <br />{' '} <AiFillEdit onClick={handleShow} className='bg-white rounded-full h-8 w-8 p-1 -translate-x-4 translate-y-6 dark:text-black' style={{display:show==false ? "":"none",cursor:"pointer"}}/>
           <div className='flex flex-col bg-white p-2 rounded-md m-2' style={{display:show==true ? "":"none"}}>
            <div className='flex'> <input type="file" className='border-none' onChange={handleChange}/><RxCross2  className="text-black" onClick={handleShow}/></div>
            <button className="m-2 bg-[#8656cd] text-white p-2 rounded-md hover:bg-purple-500" onClick={handleUpload}>
          Upload
        </button></div>
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

          
          {user?.friends?.map((friend, index) => (
            <label
              key={index}
              htmlFor={`friend-${index}`}
              className='w-full flex justify-between items-center gap-1 border-1 p-1 border-black rounded-md'
              style={{ backgroundColor: thememode == 'dark' ? 'rgb(222, 221, 221)' : 'white' }}
            >
              <div className='w-[30%] text-md p-1'>
                <b>{friend}</b>
              </div>
              <input type='text' id={`friend-${index}`} value={friend} readOnly />
            </label>
          ))}

          <div className='w-full flex justify-end items-center p-2'>
            <button className='bg-[#8656cd] p-3 rounded-lg hover:bg-purple-500 text-white'>Edit</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
