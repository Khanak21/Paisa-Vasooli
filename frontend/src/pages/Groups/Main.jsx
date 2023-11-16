import React,{useState,useEffect} from 'react'
import Navbar from '../../components/Navbar'
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap'
import axios from 'axios';
import GroupCard from '../../components/GroupCard.jsx'

export const Main = ({user,setUser}) => {
    const [showGroup, setShowGroup] = useState(false);
    const [showGroupJoin, setShowGroupJoin] = useState(false);
    const [showFriend, setShowFriend] = useState(false);

    const handleGroupClose = () => setShowGroup(false);
    const handleGroupShow = () => setShowGroup(true);
    const handleGroupJoinClose = () => setShowGroupJoin(false);
    const handleGroupJoinShow = () => setShowGroupJoin(true);

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

    const {title} = groupInput
    const {groupCode} = groupInput
    const {JoingCode} = joincode
    const handleGroupInput = name=>e=>{
      setgroupInput({...groupInput,[name]:e.target.value})
    }
    const handleGroupJoinInput = name=>e=>{
      setjoincode({...joincode,[name]:e.target.value})
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

    const [groupData,setgroupData]=useState([])

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
            console.log(res.data)
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
        // const check=async()=>{
        //     try{
        //       const loggedInUser = localStorage.getItem("user");
        //       if (loggedInUser) {
        //         console.log(loggedInUser);
        //         const foundUser = JSON.parse(loggedInUser);
        //         console.log("found user",foundUser  )
        //         await setUser(foundUser);
        //       }
        //     }catch(err){
        //       console.log(err)
        //     }
        //   }
        //   check()
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
    },[])
    // },[user._id])

  return (
    <div>
        <Navbar/>
        <div className='mt-3'>
        <button onClick={handleGroupShow} className='bg-[#198754] ml-4 me-10'>Create Group</button>
        <button onClick={handleGroupJoinShow} className='bg-[#198754]'>Join Group</button>
        <div>
          {groupData?.map(data=>(
            //  console.log("mapped data",trans)
            <GroupCard key={data._id} setgroupData = {setgroupData} groupData={data} allgroupsdata = {groupData}/> 
            ))}
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
        </div>
    </div>
  )
}
