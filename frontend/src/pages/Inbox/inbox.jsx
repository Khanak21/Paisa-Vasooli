import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar'
import axios from "axios"
import MailIcon from '@mui/icons-material/Mail';

const Inbox = ({ user,setUser,thememode,toggle }) => {
 

  const [inboxuser,setinboxuser] = useState({})


  

  //fetching data from local storage
  useEffect(()=>{
   const check=async()=>{
    try{
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        console.log(loggedInUser);
        const foundUser = JSON.parse(loggedInUser);
        console.log("found user",foundUser)
        setinboxuser(foundUser)
        await setUser(foundUser);
      }

      console.log("Loggedin User" ,loggedInUser)
    }catch(err){
      console.log(err)
    }
  }
  check()

},[user?._id,user.friends])
console.log(inboxuser)
useEffect(() => {

}, [user.inbox,user.friends,inboxuser]);
//function to accept friend request
const handleAccept=async(key)=>{
  try{
      console.log("friend name key",key)
      const res= await axios.put(`http://localhost:3001/api/friend/acceptRequest/${user._id}`,{friendName:key})
      alert(res.data.message)
      console.log(res.data)
      setUser(res.data.res1);
      localStorage.setItem('user', JSON.stringify(res.data.res1))
      setinboxuser(res.data.res1)


  }catch(err){
      console.log(err)
  }
}
  return (

    <div className='dark:bg-[#181818] bg-[#f0f0f0] h-[100vh]'>
      <Navbar thememode={thememode} toggle={toggle} />
      <div className='font-extrabold text-2xl mx-4 mt-4 dark:text-[#f0f0f0]'>Inbox <MailIcon/></div>

      <div> 
        {inboxuser.inbox?.toReversed().map((msg, index) => {
          const tokens = msg.split(' ');
          let i=0
          let key=""
          while(i<tokens.length){
            if(tokens[i]=="sent")break
            key+=tokens[i];
            key+=" "
            i++;
          }
          key=key.trim()
          return (
            <div key={key}>
              {msg.includes('sent') ? (
                <div className='m-4 bg-gray-200 p-2 rounded-md flex  justify-between align-middle dark:bg-[#6f00c9] dark:text-white'>
                  <div className='m-3'>{msg}</div>
                  <button className='p-2 m-2 rounded-md text-white' style={{backgroundColor:inboxuser.friends.includes(key) ? "green":"#000080"}} onClick={()=>handleAccept(key)}>{inboxuser.friends.includes(key) ? "Accepted" : "Accept"}</button>
                </div>
              ) : (
                <div className='m-4 bg-gray-200 p-2 rounded-md dark:bg-[#282828] dark:text-white'>{msg}</div>
              )}
            </div>
          );
        })
        // :
        // <div className='grid grid-cols-1 mx-4 font-semibold text-lg'>
        //   <div> No friends yet</div>
        // </div>
        } 
      </div>
    </div>
  );
};

export default Inbox;