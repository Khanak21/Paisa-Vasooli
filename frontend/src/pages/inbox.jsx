import React, { useEffect } from 'react';
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
  let arr=user.inbox


  return (
    <div>
      <Navbar thememode={thememode} toggle={toggle} />
      {arr.reverse()?.map((msg, index) => {
        const tokens = msg.split(' ');
        const key = tokens[0];

        return (
          <div key={key}>
            {msg.includes('sent') ? (
              <div className='m-4 bg-gray-200 p-2 rounded-md flex  justify-between align-middle'>
                <div className='m-3'>{msg}</div>
                <button className='p-2 m-2 bg-green-600 rounded-md text-white' onClick={()=>handleAccept(key)}>{user.friends.includes(key) ? "Accepted" : "Accept"}</button>
              </div>
            ) : (
              <div className='m-4 bg-gray-200 p-2 rounded-md'>{msg}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Inbox;