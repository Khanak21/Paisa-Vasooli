import React,{useState,useEffect} from 'react'
import Navbar from '../../components/Navbar'
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap'
import axios from 'axios';
import GroupCard from '../../components/GroupCard.jsx'

export const Main = ({user,setUser,thememode,toggle,groupData,setgroupData}) => {
  console.log(groupData)
    const [showGroup, setShowGroup] = useState(false);
    const [showGroupJoin, setShowGroupJoin] = useState(false);
    const [showFriend, setShowFriend] = useState(false);
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groupflag,setgroupflag] = useState(false)

    const handleGroupClose = () => setShowGroup(false);
    const handleGroupShow = () => setShowGroup(true);

    const handleGroupJoinClose = () => setShowGroupJoin(false);
    const handleGroupJoinShow = () => setShowGroupJoin(true);

    const handleAddFriendShow = () => setShowAddFriend(true);
    const handleAddFriendClose = () => setShowAddFriend(false);


    const handleFriendClose = () => setShowFriend(false);
    const handleFriendShow = () => setShowFriend(true);

    const [groupInput,setgroupInput] = useState({
      userId:user._id,
      title:'',
      groupCode:''
    })
    const [joincode,setjoincode] = useState({
      userId:user._id,
      JoingCode:''
    })
    const [friendName,setFriendName] = useState("")

    const {title} = groupInput
    const {groupCode} = groupInput
    const {JoingCode} = joincode
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

    const handleSendRequest = async()=>{
      try{
        const res= await axios.put(`http://localhost:3001/api/friend/sendRequest/${user._id}`,{friendName})
        console.log(res)
        alert(res.data.message)
        setFriendName("")
      }catch(err){
        console.log(err)
      }
    }


    const handleSubmit =e=>{  
      console.log("yoyy")
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

    const handleJoin =e=>{  
      console.log("yoyy")
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
    <div style={{backgroundColor:thememode=="dark"?"#181818":"white"}} >
        <Navbar thememode={thememode} toggle={toggle}/>
        <div className='flex flex-col gap-2 justify-start items-start' style={{backgroundColor:thememode=="dark"?"#181818":"#f0f0f0"}}>
          <div className=' flex justify-evenly items-start w-full my-2'>
            <button onClick={handleGroupShow} className='bg-[#198754] text-white p-4 rounded-lg mx-2'>+ Create Group</button>
            <button onClick={handleGroupJoinShow} className='bg-[#198754] text-white p-4 rounded-lg mx-2'>Join Group</button>
            <button onClick={handleAddFriendShow} className='bg-[#198754] text-white p-4 rounded-lg mx-2'>+ Invite Friend</button>

          </div>
        <div className='flex flex-col lg:grid lg:grid-cols-2 justify-evenly items-center gap-6 w-full h-fit dark:bg-[#181818]'>
          
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
            /> 
            );
            })}

        </div>

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
          <Button variant="success" onClick={handleSubmit}  required>Save</Button>
        </Modal.Footer>
      </Modal>

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
          <Button variant="success" onClick={handleJoin}  required>Save</Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showFriend} onHide={handleFriendClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit} required>Save</Button>
        </Modal.Footer>
      </Modal>

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
          <Button variant="success" onClick={handleSendRequest}  required>Invite</Button>
        </Modal.Footer>
      </Modal>
        </div>

    </div>
  )
}