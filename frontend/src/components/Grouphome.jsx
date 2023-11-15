import React,{useState,useEffect} from 'react'
import Navbar from './Navbar.jsx'
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap'
import axios from 'axios';
import GroupCard from './GroupCard.jsx'

export const Grouphome = ({groupData}) => {
    const [showGroup, setShowGroup] = useState(false);
    const [showGroupJoin, setShowGroupJoin] = useState(false);
    const [showFriend, setShowFriend] = useState(false);

    const handleGroupClose = () => setShowGroup(false);
    const handleGroupShow = () => setShowGroup(true);
    const handleGroupJoinClose = () => setShowGroupJoin(false);
    const handleGroupJoinShow = () => setShowGroupJoin(true);

    const handleFriendClose = () => setShowFriend(false);
    const handleFriendShow = () => setShowFriend(true);
    const [membersdata,setmembersdata]=useState([])

    useEffect(()=>{
      const getMembers = async()=>{
        try{
          const res = await axios.get(`http://localhost:3001/api/group/getmembers/${groupData._id}`)//add user Id
          console.log(res.data)
          setmembersdata(res.data)
        }catch(err){
          console.log(err)
        }
      }
      getMembers()
    },[])

  return (
    <div>
        <div className='mt-3'>
        <div>
            {console.log(groupData._id)}
          {membersdata?.map(data=>(
            <div>{data.username}</div>
            ))}
        </div>
        </div>
    </div>
  )
}

export default Grouphome;
