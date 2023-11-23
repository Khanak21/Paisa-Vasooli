import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from "axios"

const Inbox = ({ user,setUser,thememode,toggle }) => {
  useEffect(() => {

  }, [user.inbox,user.friends]);

  const handleAccept=async(key)=>{
    try{
        console.log(key)
        const res= await axios.put(`http://localhost:3001/api/friend/acceptRequest/${user._id}`,{friendName:key})
        alert(res.data.message)
        setUser(res.data.res1);

    }catch(err){
        console.log(err)
    }
  }
const [inboxuser,setinboxuser] = useState({})
useEffect(()=>{
  const check=async()=>{
    try{
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        console.log(loggedInUser);
        const foundUser = JSON.parse(loggedInUser);
        console.log("found user",foundUser  )
        setinboxuser(foundUser)
        await setUser(foundUser);
      }
    }catch(err){
      console.log(err)
    }
  }
  check()
},[user?._id])
console.log(inboxuser)
  return (
    <div className='dark:bg-[#181818] h-[100vh]'>
      <Navbar thememode={thememode} toggle={toggle} />
      <div >
      {inboxuser.inbox?.map((msg, index) => {
        const tokens = msg.split(' ');
        const key = tokens[0];

        return (
          <div key={key}>
            {msg.includes('sent') ? (
              <div className='m-4 bg-gray-200 p-2 rounded-md flex  justify-between align-middle dark:bg-[#282828] dark:text-white'>
                <div className='m-3'>{msg}</div>
                <button className='p-2 m-2 bg-green-600 rounded-md text-white' onClick={()=>handleAccept(key)}>{inboxuser.friends.includes(key) ? "Accepted" : "Accept"}</button>
              </div>
            ) : (
              <div className='m-4 bg-gray-200 p-2 rounded-md dark:bg-[#282828] dark:text-white'>{msg}</div>
            )}
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default Inbox;