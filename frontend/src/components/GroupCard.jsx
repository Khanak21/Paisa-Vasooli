import React,{useEffect, useState} from 'react'
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
import {CopyToClipboard} from 'react-copy-to-clipboard';

const GroupCard = ({key,setgroupData,groupData,allgroupsdata,setSelectedGroup, selectedGroup,thememode,toggle,user}) => {
  const navigate = useNavigate()
const [show, setShow] = useState(false);
const [showGroupHome, setShowGroupHome] = useState(false);
const [showAddFriend, setShowAddFriend] = useState(false);
const [friends,setFriends] = useState([])

const [checkedState, setCheckedState] = useState(
  new Array(user.friends.length).fill(false)
);

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

  }catch(err){
    console.log(err)
  }
}
const [copied, setCopied] = useState(false);
const handleAddFriendClose = () => setShowAddFriend(false);
const handleAddFriendShow = () => setShowAddFriend(true);
const handleCopyToClipboard = () => {
  setCopied(true);
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

    <div className='flex justify-between items-start card-parent h-full p-1 ' style={{backgroundColor:thememode=="dark"?"rgb(85, 98, 106)":"white"}}>

     <Card  border="success" className='card-component flex flex-col justify-start items-start gap-3' style={{backgroundColor:thememode==="dark"?"rgb(189, 218, 196)":"white"}} >

      <Card.Body className='w-full'>

        <div className='flex flex-col justify-start items-start gap-1'>

          <Card.Text className='text-md justify-start items-center font-extrabold '>
          <b> Group Title</b>{" "}:-{" "}{groupData.title}
          </Card.Text>

          <Card.Text className='text-md w-fit justify-start items-center '>
            <b> Group Code </b>{" "}:- <br/>
            <div className='flex'><input type="text" value= {groupData.groupCode} name="" id="" />
            <CopyToClipboard text={groupData.groupCode} onCopy={handleCopyToClipboard}>
            <button>Copy to Clipboard</button>
            </CopyToClipboard>
            {copied && <span style={{ marginLeft: '10px', color: 'green' }}>Copied to clipboard!</span>}
            <button className='mx-2 w-80 bg-blue-600 rounded-md text-white' onClick={handleAddFriendShow}>or Add Friend</button></div>
          
          </Card.Text>

        </div>

       <div className='w-5/10 my-2 flex flex-col justify-center items-start gap-3'>
        
        <Button className='rounded-sm p-1' variant="primary" onClick={()=>navigate(`/simplifydebt/${groupData._id}`)} style={{"cursor":"pointer"}}>
           Simplify Debt
        </Button>
        <Button className='rounded-sm p-1' variant="primary" onClick={()=>navigate(`/billsplit/${groupData._id}`)} style={{"cursor":"pointer"}}>
           Split bill
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
          <Button variant="success" onClick={handleAddFriendsToGroup}  required>Add to group</Button>
        </Modal.Footer>
      </Modal>
  </div>
  )
}

export default GroupCard