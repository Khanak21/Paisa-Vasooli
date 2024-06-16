// import React, { useEffect, useState } from 'react';
// import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button, Checkbox, Box, Text, IconButton, Menu, MenuButton, MenuList, MenuItem, Card, CardBody, CardFooter, CardHeader, Heading, useTheme } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';
// import { MdMoreVert } from 'react-icons/md';
// import axios from 'axios';

// const GroupCard = ({ key, setgroupData, groupData, allgroupsdata, setSelectedGroup, selectedGroup, thememode, toggle, user }) => {
//   const navigate = useNavigate();
//   const theme = useTheme(); 
//   // eslint-disable-next-line no-unused-vars
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [showGroupHome, setShowGroupHome] = useState(false);
//   const [showAddFriend, setShowAddFriend] = useState(false);
//   const [friends, setFriends] = useState([]);
//   const [checkedState, setCheckedState] = useState(new Array(user.friends.length).fill(false));
//   // eslint-disable-next-line no-unused-vars
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const [copied, setCopied] = useState(false);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseDots = () => {
//     setAnchorEl(null);
//   };

//   const handleOnChange = (position) => {
//     const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);
//     setCheckedState(updatedCheckedState);
//   };

//   useEffect(() => {
//     checkedState.forEach((item, index) => {
//       if (item) setFriends(prev => [...prev, user.friends[index]]);
//     });
//   }, [checkedState,user.friends]);

//   const handleAddFriendsToGroup = async () => {
//     try {
//       // eslint-disable-next-line no-unused-vars
//       const res = await axios.put(`http://localhost:3001/api/group/addfriendsgroup/${groupData._id}`, { friends });
//       handleAddFriendClose();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleAddFriendClose = () => setShowAddFriend(false);
//   const handleAddFriendShow = () => {
//     handleCloseDots();
//     setShowAddFriend(true);
//   };

//   const handleCopyToClipboard = () => {
//     setCopied(true);
//     alert("Copied to clipboard");
//   };

//   const handleClose = () => setShowAddFriend(false);
//   const handleShow = () => onOpen();

// const handleOpenGroup = () => {
//   console.log("yeeeee")
//   setShowGroupHome(true);
//   setSelectedGroup(groupData);
// };
// // setOnegroupData(groupData)

// const handleDelete = async()=>{
//   console.log(groupData)
//   try{
//       const groupId=groupData._id
//       const res=await axios.delete(`http://localhost:3001/api/group/deleteGroup/${groupId}`)
//       setShowDeleteModal(false)
//       console.log(res.data.groupp)
//       const sav=res.data.groupp
//       // setgroupData(allgroupsdata.filter(data=>data._id!=sav._id))
//       setgroupflag((prev)=>!(prev))
//   }catch(err){
//       console.log(err)
//   }
// }
// const handlePaid=()=>{
//   console.log("clicked")
// };

// const handleopendeletemodal=()=>{
//   setShowDeleteModal(true)
// }

// const handleCloseDeleteModal=()=>{
//   setShowDeleteModal(false)
// }
// console.log(allgroupsdata)
//   return (

//     <div className='flex justify-center items-center card-parent h-full p-1'>
//       <Card sx={{ 
//         minWidth: 275,
//         backgroundColor: thememode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper,
//         color:thememode==='dark'?"white":"black" }}>
//       <CardContent>
//         <div className='flex justify-between'>
//         <Typography variant="h5" component="div" sx={{fontFamily:'poppins'}}>
//           {groupData.title}
//         </Typography>
//         <div>
//       <IconButton
//         aria-label="more"
//         id="long-button"
//         aria-controls={open ? 'long-menu' : undefined}
//         aria-expanded={open ? 'true' : undefined}
//         aria-haspopup="true"
//         onClick={handleClick}
//         sx={{
//           color:thememode==='dark'?"white":"black"
//         }}
//       >
//         <MoreVertIcon />
//       </IconButton>
//       <Menu
//         id="long-menu"
//         MenuListProps={{
//           'aria-labelledby': 'long-button',
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleCloseDots}
        
//         PaperProps={{
//           style: {
//             maxHeight: ITEM_HEIGHT * 4.5,
//             width: '20ch',
//           },
//           sx: {
//             backgroundColor: thememode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper,
//             color: thememode === 'dark' ? 'white' : 'black',
//             maxHeight: ITEM_HEIGHT * 4.5,
//             width: '20ch',
//           },
//         }}
//       >
//            <MenuItem key="addfriend" onClick={()=>{handleAddFriendShow();handleCloseDots()}}>
//           + Add member
//           </MenuItem>
//           <MenuItem key="editgroup" onClick={()=>{handleShow();handleCloseDots();}}>
//           Edit group
//           </MenuItem>
//           <MenuItem key="deletegroup" onClick={()=>{handleopendeletemodal();handleCloseDots();}}>
//           Delete group
//           </MenuItem>
    
//       </Menu>
//     </div>
//     </div>
//         <Typography variant="body2">
//           {groupData.members.length} member{groupData.members.length>1 && "s"}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Buttonmui 
//         size="small"
//         sx={{textDecoration:'underline'}}
//         onClick={()=>navigate(`/simplifydebt/${groupData._id}`)}
//         >Settle transactions⟶</Buttonmui>
//       </CardActions>
//     </Card>
//     <Modal show={showAddFriend} onHide={handleAddFriendClose} animation={false} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Select friends to be added</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//         <ul className="friends-list">
//         {user.friends.map((name, index) => {
//           return (
//             <li key={index}>
//               <div className="toppings-list-item h-8 align-middle">
//                 <div className="left-section flex px-4 align-middle">
//                   <input
//                     type="checkbox"
//                     id={`custom-checkbox-${index}`}
//                     name={name}
//                     value={name}
//                     checked={checkedState[index]}
//                     onChange={() => handleOnChange(index)}
//                     className='flex justify-start w-4 align middle'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
//                   />
//                   <label htmlFor={`custom-checkbox-${index}`} className='flex align-middle m-2'>{name}</label>
//                 </div>
//               </div>
//             </li>
//           );
//         })}
//         </ul>
//         </Modal.Body>
//         <Modal.Footer>
//           <button className="rounded-md p-1 text-white w-full bg-[#000080]" onClick={handleAddFriendsToGroup}  required>Add to group</button>
//         </Modal.Footer>
//       </Modal>
//       <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
//               <Modal.Header closeButton>
//                 <Modal.Title>Confirm Deletion</Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
//                 <p>Are you sure you want to delete this Bill?</p>
//               </Modal.Body>
//               <Modal.Footer>
//                 <Button className="custom-blue-button" onClick={handleCloseDeleteModal}>
//                   Cancel
//                 </Button>
//                 <Button className="custom-blue-button" onClick={handleDelete}>
//                   Delete
//                 </Button>
//               </Modal.Footer>
//             </Modal>
//   </div>
//   )
// }

// export default GroupCard;



import React,{useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import axios from "axios" 
import './GroupCard.css'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;


const GroupCard = ({key,setgroupData,groupData,allgroupsdata,setSelectedGroup, selectedGroup,thememode,toggle,user,setgroupflag}) => {
  const navigate = useNavigate()
  const theme = useTheme();
const [show, setShow] = useState(false);
const [showGroupHome, setShowGroupHome] = useState(false);
const [showAddFriend, setShowAddFriend] = useState(false);
const [friends,setFriends] = useState([])
const [showDeleteModal,setShowDeleteModal] = useState(false);
const [checkedState, setCheckedState] = useState(
new Array(user.friends.length).fill(false)
);
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleCloseDots = () => {
  setAnchorEl(null);
};

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
const handleAddFriendShow = () => {
  handleCloseDots()
  setShowAddFriend(true);
}
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
      setgroupflag((prev)=>!(prev))
      setShowDeleteModal(false)
  }catch(err){
      console.log(err)
  }
}
const handlePaid=()=>{
  console.log("clicked")
};

const handleopendeletemodal=()=>{
  setShowDeleteModal(true)
}

const handleCloseDeleteModal=()=>{
  setShowDeleteModal(false)
}

console.log(allgroupsdata)
  return (

    <div className='flex justify-center items-center card-parent h-full p-1'>
      <Card sx={{ 
        minWidth: 275,
        backgroundColor: thememode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper,
        color:thememode==='dark'?"white":"black" }}>
      <CardContent>
        <div className='flex justify-between'>
        <Typography variant="h5" component="div" sx={{fontFamily:'poppins'}}>
          {groupData.title}
        </Typography>
        <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          color:thememode==='dark'?"white":"black"
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseDots}
        
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
          sx: {
            backgroundColor: thememode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper,
            color: thememode === 'dark' ? 'white' : 'black',
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
           <MenuItem key="addfriend" onClick={()=>{handleAddFriendShow();handleCloseDots()}}>
          + Add member
          </MenuItem>
          <MenuItem key="editgroup" onClick={()=>{handleShow();handleCloseDots();}}>
          Edit group
          </MenuItem>
          <MenuItem key="deletegroup" onClick={()=>{handleopendeletemodal();handleCloseDots();}}>
          Delete group
          </MenuItem>
    
      </Menu>
    </div>
    </div>
        <Typography variant="body2">
          {groupData.members.length} member{groupData.members.length>1 && "s"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
        size="small"
        sx={{textDecoration:'underline'}}
        onClick={()=>navigate(`/simplifydebt/${groupData._id}`)}
        >Settle transactions⟶</Button>
      </CardActions>
    </Card>

     {/* <Card  border="secondary" className='card-component flex flex-col justify-start items-start gap-3' style={{backgroundColor:thememode==="dark"?"#282828":"white",color:thememode==="dark"?"white":"black"}} >

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
            </div> */}
            {/* {copied && <span style={{ marginLeft: '10px', color: 'green' }}>Copied to clipboard!</span>} */}
            {/* <button className='mx-2 px-2 bg-[#8656cd] rounded-md text-white lg:w-80 md:w-80' onClick={handleAddFriendShow}>or Add Friend</button>
            </div>
          
          </Card.Text>

        </div>

       <div className='w-full p-2 my-2 flex flex-col justify-center items-start gap-3'>
        
        <button className='rounded-md p-1 text-white w-full bg-[#000080]' onClick={()=>navigate(/simplifydebt/${groupData._id})} style={{"cursor":"pointer"}}>
           Simplify Debt
        </button>
        <div className='flex justify-between items-center w-full'>
          <AiFillEdit onClick={handleShow} style={{"cursor":"pointer"}}/>
          <AiFillDelete onClick={handleDelete} style={{"cursor":"pointer"}}/>
        </div>
       
       </div>
</div>
      </Card.Body>

    </Card> */}
   

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

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete this Group?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button className="custom-blue-button" onClick={handleCloseDeleteModal}>
                  Cancel
                </Button>
                <Button className="custom-blue-button" onClick={handleDelete}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>

  </div>
  )
}

export default GroupCard
