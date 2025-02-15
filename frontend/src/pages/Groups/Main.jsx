import React,{useState,useEffect} from 'react'
import Navbar from '../../components/Navbar.jsx'
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap'
import axios from 'axios';
import GroupCard from '../../components/GroupCard/GroupCard.jsx'
import {Button as Buttonmui} from '@mui/material';
import Menu from '@mui/material/Menu';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';

export const Main = ({user,setUser,thememode,toggle,groupData,setgroupData}) => {
  console.log(groupData)
    const theme = useTheme()
    const [showGroup, setShowGroup] = useState(false);
    const [showGroupJoin, setShowGroupJoin] = useState(false);
    const [showFriend, setShowFriend] = useState(false);
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groupflag,setgroupflag] = useState(false)
    const [friendName,setFriendName] = useState("")
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const [groupInput,setgroupInput] = useState({
      userId:user._id,
      title:'',
      groupCode:''
    })
    const [joincode,setjoincode] = useState({
      userId:user._id,
      JoingCode:''
    })
    const {title} = groupInput
    const {groupCode} = groupInput
    const {JoingCode} = joincode


    //modal opening and closing logic
    const handleGroupClose = () => setShowGroup(false);
    const handleGroupShow = () => setShowGroup(true);

    const handleGroupJoinClose = () => setShowGroupJoin(false);
    const handleGroupJoinShow = () => setShowGroupJoin(true);

    const handleAddFriendShow = () => setShowAddFriend(true);
    const handleAddFriendClose = () => setShowAddFriend(false);

    //handling input
    const handleGroupInput = name=>e=>{
      setgroupInput({...groupInput,[name]:e.target.value})
    }
    const handleGroupJoinInput = name=>e=>{
      setjoincode({...joincode,[name]:e.target.value})
    }
    const handleAddFriendInput = (e)=>{
      console.log(e.target.value)
      setFriendName(e.target.value)
    }

    //generating random group join code logic
    const uuid = () => {
      var S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
      );
    };

    //function to send friend request
    const handleSendRequest = async()=>{
      try{
        const res= await axios.put(`http://localhost:3001/api/friend/sendRequest/${user._id}`,{friendName})
        console.log("Friend output ",res)
        alert(res.data.message)
        setFriendName("")
      }catch(err){
        console.log(err)
      }
    }

    //create group function
    const handleSubmit =e=>{  
      console.log(groupInput)
      let groupCode = uuid()
      console.log(groupCode)
      const addgroup =async()=>{
          try{
            console.log(groupInput)
            const res = await axios.post("http://localhost:3001/api/group/creategroup",{groupInput: { ...groupInput, groupCode: groupCode },})
            console.log(res.data.newgroup)
            const val=res.data.newgroup
            setgroupData(prev=>[...prev,val])
            setgroupflag((prev)=>!(prev))
            handleGroupClose()
            console.log(groupData)
          }catch(err){
            console.log(err)
          }
      }
      addgroup()
      setgroupInput({
        userId:user._id,
        title:''
      })
    }

    //function to join group
    const handleJoin =e=>{  
      // console.log("yoyy")
      console.log(JoingCode)
      const addgroup =async()=>{
          try{
            console.log(JoingCode)
            const res = await axios.post("http://localhost:3001/api/group/joingroup",{joincode})
            console.log(res.data.newgroup)
            setgroupflag((prev)=>!(prev))
            console.log(groupData)
          }catch(err){
            console.log(err.response.error)
          }
      }
      addgroup()
      setjoincode({
        userId:user._id,
        JoingCode:''
      })
    }

    useEffect(()=>{
       //retrieving user data from local storage
        const check=async()=>{
            try{
              const loggedInUser = localStorage.getItem("user");
              if (loggedInUser) {
                console.log(loggedInUser);
                const foundUser = JSON.parse(loggedInUser);
                console.log("found user",foundUser  )
                await setUser(foundUser);
              }
            }catch(err){
              console.log(err)
            }
          }
          check()
    },[user._id])

    useEffect(()=>{
      //function to get all the groups a user is in
      const getGroups = async()=>{
        try{
          const res = await axios.get(`http://localhost:3001/api/group/getgroups/${user._id}`)//add user Id
          console.log(res.data)
          setgroupData(res.data)
        }catch(err){
          console.log(err)
        }
      }
      getGroups()
    },[groupflag])

  return (
    <div style={{backgroundColor:thememode=="dark"?"#181818":"#f0f0f0"}} className='min-h-screen overflow-x-hidden'>
        <Navbar thememode={thememode} toggle={toggle}/>
        <div className='flex flex-col gap-2 justify-start items-start min-h-screen' style={{backgroundColor:thememode=="dark"?"#181818":"#f0f0f0"}}>
        <div className='flex justify-between w-full'>
        <div>
        <div className='font-extrabold text-2xl mx-4 mt-4 dark:text-[#f0f0f0]'> Groups</div>
        <div className='mx-4 text-gray-600 dark:text-gray-200 '>Invite friends, create groups and streamline bill splitting and debt settlements</div>
        </div>
      
        <div>
      <Buttonmui
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
           backgroundColor:'#000080',
           margin:'2rem',
           color:'white',
           '&:hover': {
            backgroundColor: '#00009A', 
            color: 'white',
          },
          }}
          className='dark:bg-slate-200 dark:hover:bg-slate-400 dark:text-blue-400'
      >
        + NEW 
      </Buttonmui>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          sx: {
            backgroundColor: thememode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper,
            color: thememode === 'dark' ? 'white' : 'black',
        
          },
        }}
      >
        <MenuItem onClick={()=>{handleGroupShow();handleClose()}}>Create new group</MenuItem>
        <MenuItem onClick={()=>{handleGroupJoinShow();handleClose()}}>Join Group</MenuItem>
        <MenuItem onClick={()=>{handleAddFriendShow();handleClose()}}>Invite a friend</MenuItem>
      </Menu>
    </div>

        
        </div>
          {/* -----------------------------Group Cards--------------------------------- */}
        <div className='flex flex-col lg:grid lg:grid-cols-4 mx-4 justify-evenly items-center gap-6 w-full h-fit dark:bg-[#181818]'>
          
          {groupData?.map(data=>{
            return(
            <GroupCard 
            key={data._id}
            setgroupData = {setgroupData}
            groupData={data} 
            allgroupsdata = {groupData}
            setSelectedGroup={setSelectedGroup} 
            selectedGroup={selectedGroup}
            thememode={thememode}
            toggle={toggle}
            user={user}
            setgroupflag={setgroupflag}
            /> 
            );
            })}

        </div>

    {/* ------------------------------------------------Modals------------------------------------------------ */}

    {/* ADD GROUP MODAL */}
    <Modal show={showGroup} onHide={handleGroupClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <label htmlFor='title'>Group Name: </label>
            <input type="text" 
                   name={'title'}
                   value={title}
                   onChange={handleGroupInput('title')}
                   required
                   ></input>
        </Modal.Body>
        <Modal.Footer>
          <button className='bg-[#000080] p-2 rounded-md text-white' onClick={handleSubmit}  required>Save</button>
        </Modal.Footer>
      </Modal>

      {/* JOIN GROUP MODAL */}
      <Modal show={showGroupJoin} onHide={handleGroupJoinClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Join Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <label htmlFor='JoingCode'>Group Code: </label>
            <input type="text" 
                   name={'JoingCode'}
                   value={JoingCode}
                   onChange={handleGroupJoinInput('JoingCode')}
                   required
                   ></input>
        </Modal.Body>
        <Modal.Footer>
          <button className="bg-[#000080] p-2 rounded-md text-white" onClick={handleJoin}  required>Save</button>
        </Modal.Footer>
      </Modal>

       {/* ADD FRIEND MODAL */}
      <Modal show={showAddFriend} onHide={handleAddFriendClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Friend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <label htmlFor='friendName'>Enter Username of friend: </label>
            <input type="text" 
                   name='friendName'
                   value={friendName}
                   onChange={handleAddFriendInput}
                   required
                   ></input>
        </Modal.Body>
        <Modal.Footer>
          <button className="bg-[#000080] p-2 rounded-md text-white" onClick={handleSendRequest}  required>Invite</button>
        </Modal.Footer>
      </Modal>
        </div>

    </div>
  )
}