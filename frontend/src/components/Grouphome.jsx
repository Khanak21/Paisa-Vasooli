import React,{useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Navbar from './Navbar.jsx'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import GroupCard from './GroupCard.jsx'
import { useParams } from 'react-router-dom';

export const Grouphome = ({user}) => {
  const params = useParams()
  console.log(params)
  const [groupData,setgroupData]=useState([])
  // useEffect(()=>{
  //   const getgroup=async()=>{
  //     try{
  //       // const res = await axios.get(`http://localhost:3001/api/group/getgroup/${id}`)
  //   setgroupData(res.data)
  //     }catch(err){
  //       console.log(err)
  //     }
  //   }

  // },[])
  console.log(groupData)
    const [showGroup, setShowGroup] = useState(false);
    const [show, setShow] = useState(false);

    const [showGroupJoin, setShowGroupJoin] = useState(false);
    const [showFriend, setShowFriend] = useState(false);

    const handleGroupClose = () => setShowGroup(false);
    const handleGroupShow = () => setShowGroup(true);
    const handleGroupJoinClose = () => setShowGroupJoin(false);
    const handleGroupJoinShow = () => setShowGroupJoin(true);

    const handleFriendClose = () => setShowFriend(false);
    const handleFriendShow = () => setShowFriend(true);
    const [membersdata,setmembersdata]=useState([])
    const [paid,setPaid] = useState(false)
    const [approved,setApproved] = useState(false)
    const [showGroupHome, setShowGroupHome] = useState(false);
    const handleOpenGroup = () => {
    setShowGroupHome(true);
};

    const [input, setInput] = useState({
      amount: '',
      groupData
    });

    const [billSplitData,setBillSplitData] = useState(groupData.billSplit[0])
    console.log(groupData.billSplit[0])

    const handleClose  = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleInput = (name) => (e) => {
      setInput({ ...input, [name]: e.target.value });
    };

    const handleSubmit = async()=>{
      try{
        const res= await axios.post(`http://localhost:3001/api/group/splitbill`,{input})
        console.log(res.data)
        setBillSplitData(res.data)
      }catch(err){
        console.log(err)
      }
    }
    const handlePaid = ()=>{
      const func=()=>{
        console.log("clicked")

      }
      func()
           // try{

      //   const res=await axios.put(`http://localhost:3001/api/group/markpaid/${groupData._id}`,{userId:id})
      //   setPaid(prev=>!prev)
      //   console.log("clicked")
      //   console.log(res.data)
      // }catch(err){
      //   console.log(err)
      // }
    }
  
   
    
 

    const handleApproved = async(id)=>{
      try{
        const res=await axios.put(`http://localhost:3001/api/group/markapproved/${groupData._id}`,{userId:id})
        setApproved(prev=>!prev)
        console.log(res.data)
      }catch(err){
        console.log(err)
      }
    }

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
    
   
        <div className='flex flex-col justify-center items-start h-full'>group home

          {/* <div className="h-6 text-center bg-amber-500 w-full text-black font-bold">
            Title 
          </div>
          
          <div className='w-full text-justify bg-amber-500 text-black font-bold'>
                {console.log(groupData._id)}
               {membersdata?.map(data=>(
                <div>Group Members :- {" "}{data.username}{" "}</div>
                ))}
           </div>
           <div className="w-full bg-orange-200 h-full">
            <Button variant='success' onClick={handleShow}>Split Bill</Button>
            <Modal show={show} onHide={handleClose} animation={false} centered>
            <Modal.Header closeButton>
          <Modal.Title>Split Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <label htmlFor='title'>Bill Amount: </label>
            <input type="number" 
                   name={'amount'}
                   value={input.amount}
                   onChange={handleInput('amount')}
                   required
                   ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit} required>Split Bill</Button>
        </Modal.Footer>
      </Modal>

      // {
      //   billSplitData?.map((mem)=>(
      //     <div  key={mem.userId}>
      //       <div>{mem.name}</div>
      //       <div>{mem.amount}</div>
      //       <button onClick={handlePaid} style={{cursor:"pointer"}} className='bg-green-700 text-white p-2 m-2 rounded-md cursor-pointer' >{(mem.settled===false) ? "Mark as paid" : "Paid"}</button>
      //      {(groupData.userId==user._id) &&  <button onClick={()=>handleApproved(mem.userId)} style={{cursor:"pointer"}} className='bg-green-700 text-white p-2 m-2 rounded-md cursor-pointer'>{mem.approved===false ? "Approve" : "Approved"}</button>}

      //     </div>

        ))
      }
            {/* <b>Chat</b> */}
          {/* </div> */}
        </div> 
    
  )
}

export default Grouphome;