import React,{useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
// import {AiTwotoneCalendar} from 'react-icons/ai';
import {AiFillEdit} from 'react-icons/ai';
import {AiFillDelete} from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import {Button} from 'react-bootstrap'
import { AiTwotoneCalendar } from 'react-icons/ai';
import Grouphome from '../../pages/Groups/Grouphome.jsx'; 
import './GroupCard.css'
import { useNavigate } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { MdContentCopy } from "react-icons/md";


const GroupCard = ({key,setgroupData,groupData,allgroupsdata,setSelectedGroup, selectedGroup,thememode,toggle,user}) => {
  const navigate = useNavigate()
const [show, setShow] = useState(false);
const [showGroupHome, setShowGroupHome] = useState(false);
const [showAddFriend, setShowAddFriend] = useState(false);
const [friends,setFriends] = useState([])
const [checkedState, setCheckedState] = useState(
  new Array(user.friends.length).fill(false)
);

// const copy = () => toast("Copied to Clipboard");



const handleOnChange = (position) => {
  const updatedCheckedState = checkedState.map((item, index) =>
    index === position ? !item : item
  );

  setCheckedState(updatedCheckedState);
 
}

useEffect(()=>{
  checkedState.map((item,index)=>{
    if(item==true)setFriends(prev=>[...prev,user.friends[index]])
})
},[checkedState])

const handleAddFriendsToGroup=async()=>{
  try{
    console.log(friends)
    const res = await axios.put(`http://localhost:3001/api/group/addfriendsgroup/${groupData._id}`,{friends})
    console.log(res.data)
    handleAddFriendClose()

  }catch(err){
    console.log(err)
  }
}
const [copied, setCopied] = useState(false);
const handleAddFriendClose = () => setShowAddFriend(false);
const handleAddFriendShow = () => setShowAddFriend(true);
const handleCopyToClipboard = () => {
  setCopied(true);
  alert("Copied to clipboard")
};
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

    <div className='flex justify-center items-center card-parent h-full p-1'>

     <Card  border="secondary" className='card-component flex flex-col justify-start items-start gap-3' style={{backgroundColor:thememode==="dark"?"#282828":"white",color:thememode==="dark"?"white":"black"}} >

      <Card.Body className='w-full p-1 '>

        <div className='flex flex-col justify-start items-start gap-1'>

          <Card.Header className='w-full'>
          <b> Group Title</b>{" "}:-{" "}{groupData.title}
          </Card.Header>
<div className='p-2'>
          <Card.Text className='text-md w-fit justify-start items-center'>
            <b> Group Code </b>{" "}:- <br/>
            <div className='flex align-middle'>
              <div className='flex'>
              <input type="text" value= {groupData.groupCode} name="" id="" style={{backgroundColor:thememode==="dark"?"#3a3a3a":"white"}} />
            <CopyToClipboard text={groupData.groupCode} onCopy={handleCopyToClipboard}>
            <button>
              <MdContentCopy  className='ml-2 text-xl'/>
            </button>
            </CopyToClipboard>
            </div>
            {/* {copied && <span style={{ marginLeft: '10px', color: 'green' }}>Copied to clipboard!</span>} */}
            <button className='mx-2 px-2 bg-[#000080] rounded-md text-white lg:w-80 md:w-80' onClick={handleAddFriendShow}>or Add Friend</button>
            </div>
          
          </Card.Text>

        </div>

       <div className='w-full p-2 my-2 flex flex-col justify-center items-start gap-3'>
        
        <button className='rounded-md p-1 text-white w-full bg-[#000080]' onClick={()=>navigate(`/simplifydebt/${groupData._id}`)} style={{"cursor":"pointer"}}>
           Simplify Debt
        </button>
        {/* <button className='rounded-md p-1 text-white w-full bg-[#000080]' onClick={()=>navigate(`/billsplit/${groupData._id}`)} style={{"cursor":"pointer"}}> */}
           {/* Split bill */}
        {/* </button> */}
       
        <div className='flex justify-between items-center w-full'>
          <AiFillEdit onClick={handleShow} style={{"cursor":"pointer"}}/>
          <AiFillDelete onClick={handleDelete} style={{"cursor":"pointer"}}/>
        </div>
       
       </div>
</div>
      </Card.Body>

    </Card>
   

    {/* <div className='group-chat'>
    {showGroupHome && selectedGroup && selectedGroup._id === groupData._id && (
        <Grouphome groupData={groupData} user={user} handlePaid={handlePaid} />
      )}
   </div> */}
    <Modal show={showAddFriend} onHide={handleAddFriendClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select friends to be added</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul className="friends-list">
        {user.friends.map((name, index) => {
          return (
            <li key={index}>
              <div className="toppings-list-item h-8 align-middle">
                <div className="left-section flex px-4 align-middle">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                    className='flex justify-start w-4 align middle'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                  />
                  <label htmlFor={`custom-checkbox-${index}`} className='flex align-middle m-2'>{name}</label>
                </div>
              </div>
            </li>
          );
        })}
        </ul>
        </Modal.Body>
        <Modal.Footer>
          <button className="rounded-md p-1 text-white w-full bg-[#000080]" onClick={handleAddFriendsToGroup}  required>Add to group</button>
        </Modal.Footer>
      </Modal>
  </div>
  )
}

export default GroupCard