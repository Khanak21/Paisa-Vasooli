import React,{useState} from 'react'
import Card from 'react-bootstrap/Card';
// import {AiTwotoneCalendar} from 'react-icons/ai';
import {AiFillEdit} from 'react-icons/ai';
import {AiFillDelete} from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import {Button} from 'react-bootstrap'
import { AiTwotoneCalendar } from 'react-icons/ai';
import Grouphome from './Grouphome.jsx'; 
import './GroupCard.css'
import { useNavigate } from 'react-router-dom';

const GroupCard = ({key,setgroupData,groupData,allgroupsdata,setSelectedGroup, selectedGroup,thememode,toggle,user}) => {
  const navigate = useNavigate()
const [show, setShow] = useState(false);
const [showGroupHome, setShowGroupHome] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const handleOpenGroup = () => {
  console.log("yeeeee")
  setShowGroupHome(true);
  setSelectedGroup(groupData);
};
// setOnegroupData(groupData)

const handleDelete = async()=>{
  try{
      const res=await axios.delete(`http://localhost:3001/api/group/deleteGroup/${groupData._id}`)
      console.log(res.data.groupp)
      const sav=res.data.groupp
      setgroupData(allgroupsdata.filter(data=>data._id!=sav._id))
  }catch(err){
      console.log(err)
  }
}
const handlePaid=()=>{
  console.log("clicked")
};
console.log(allgroupsdata)
  return (

    <div className='flex justify-between items-start card-parent h-full p-1 ' style={{backgroundColor:thememode==="dark"?"#00008B":"white"}}>

     <Card  border="success" className='card-component flex flex-col justify-start items-start gap-3' style={{backgroundColor:thememode==="dark"?"rgb(137, 204, 255)":"white"}} >

      <Card.Body className='w-full'>

        <div className='flex flex-col justify-start items-start gap-1'>

          <Card.Text className='text-md justify-start items-center font-extrabold '>
          <b> Group Title</b>{" "}:-{" "}{groupData.title}
          </Card.Text>

          <Card.Text className='text-md w-fit justify-start items-center '>
            <b> Group Code </b>{" "}:- <br/>
            <input type="text" value= {groupData.groupCode} name="" id="" />
          
          </Card.Text>

        </div>

       <div className='w-5/10 my-2 flex flex-col justify-center items-start gap-3'>
        
        <Button className='rounded-sm p-1' variant="primary" onClick={()=>navigate(`/simplifydebt/${groupData._id}`)} style={{"cursor":"pointer"}}>
           Open Group
        </Button>
       
        <div className='flex justify-between items-center w-full'>
          <AiFillEdit onClick={handleShow} style={{"cursor":"pointer"}}/>
          <AiFillDelete onClick={handleDelete}/>
        </div>
       
       </div>

      </Card.Body>

    </Card>
   

    {/* <div className='group-chat'>
    {showGroupHome && selectedGroup && selectedGroup._id === groupData._id && (
        <Grouphome groupData={groupData} user={user} handlePaid={handlePaid} />
      )}
   </div> */}
  </div>
  )
}

export default GroupCard