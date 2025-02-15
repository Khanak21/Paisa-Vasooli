import React,{useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Navbar from '../../components/Navbar.jsx'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import GroupCard from '../../components/GroupCard/GroupCard.jsx'
import { useParams } from 'react-router-dom';

export const Grouphome = ({user,thememode,toggle}) => {
  const {id} = useParams()
  const [groupData,setgroupData]=useState([])
 
  console.log(groupData)
    const [showGroup, setShowGroup] = useState(false);
    const [show, setShow] = useState(false);
    const [showPart, setShowPart] = useState(false);
    const [showGroupJoin, setShowGroupJoin] = useState(false);
    const [showFriend, setShowFriend] = useState(false);

    const handleGroupClose = () => setShowGroup(false);
    const handleGroupShow = () => setShowGroup(true);
    const handleGroupJoinClose = () => setShowGroupJoin(false);
    const handleGroupJoinShow = () => setShowGroupJoin(true);
    const handleShowPart = () => setShowPart(true);
    const handleClosePart = () => setShowPart(false);

    const handleFriendClose = () => setShowFriend(false);
    const handleFriendShow = () => setShowFriend(true);
    const [membersdata,setmembersdata]=useState([])
    const [paid,setPaid] = useState(false)
    const [approved,setApproved] = useState(false)
    const [showGroupHome, setShowGroupHome] = useState(false);
    const handleOpenGroup = () => {
    setShowGroupHome(true);
};
console.log(groupData)

    const [input, setInput] = useState({
      amount: '',
      groupData,
      user
    });
    console.log(input)

    const [billSplitData,setBillSplitData] = useState([])
    console.log("bill split data:",billSplitData)
    const handleClose  = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleInput = (name) => (e) => {
      setInput({ ...input, [name]: e.target.value });
    };

    //function to split bill among group members
    const handleSubmit = async()=>{
      try{
        const res= await axios.post(`http://localhost:3001/api/group/splitbill`,{input})
        console.log(res.data)
        setBillSplitData(res.data.billSplit)
        handleClose()
      }catch(err){
        console.log(err)
      }
    }

    const getgroup=async()=>{
      try{
        const res = await axios.get(`http://localhost:3001/api/group/getgroup/${id}`)
        console.log(res.data)
        setgroupData(res.data)
        setBillSplitData(res.data.billSplit)
        console.log("use effect",groupData)
      }catch(err){
        console.log(err)
      }
    }
    
  const handleApproved = async(memid)=>{
    try{
      const res=await axios.put(`http://localhost:3001/api/group/markapproved/${groupData._id}`,{userId:memid})
      setApproved(prev=>!prev)
      setBillSplitData(res.data.billSplit)
      getgroup()
      console.log(res.data.billSplit)
    }catch(err){
      console.log(err)
    }
  }

    useEffect(()=>{
     
      getgroup()
    },[])

   useEffect(()=>{
    const getMembers = async()=>{
      try{
        const res = await axios.get(`http://localhost:3001/api/group/getmembers/${groupData._id}`)//add user Id
        console.log("members",res.data)
        setmembersdata(res.data)
      }catch(err){
        console.log(err)
      }
    }

    getMembers()
   },[])

    useEffect(() => {
      setInput((prevInput) => ({
        ...prevInput,
        groupData,
      }));
    }, [groupData]);
  return (
    
   <div className='min-h-screen overflow-x-hidden'>
          <Navbar thememode={thememode} toggle={toggle}/>

        <div className='flex flex-col justify-center items-start' style={{backgroundColor:thememode=="dark"?"#181818":"#f0f0f0"}}>


       
          <div className='font-extrabold text-5xl mx-4 mt-4 dark:text-[#f0f0f0]'>Split Bills</div>
          <div className="m-3 pt-3 text-4xl bg-[#f0f0f0] light:text-black font-bold dark:bg-[#181818] dark:text-white p-2">
            Group Title: {groupData.title}
          </div>
        
           <div className=" min-h-screen w-[98%] flex-col align-middle justify-center dark:text-white m-3">
          <div className='flex'> <button onClick={handleShowPart} className='bg-[#000080] text-white rounded-lg w-full p-1 m-2'>
            Participants
           </button>
            <button className="bg-[#000080] text-white p-1 rounded-lg m-2 w-full" onClick={handleShow}>Split Bill</button></div>


            {/* -----------------------------------------Bill Split Modal-------------------------------------- */}
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
          <button onClick={handleSubmit} required className='bg-[#000080] text-white rounded-lg w-full p-1 m-2'>Split Bill</button>
        </Modal.Footer>
        
      </Modal>

      {/* -----------------------------------------Group Participants-------------------------------------- */}
      <Modal show={showPart} onHide={handleClosePart} animation={false} centered>
            <Modal.Header closeButton>
          <Modal.Title>Group Participants</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <div className='flex flex-col gap-1'>
              {membersdata?.map(data=>(
               <div >{" "}{data.username}{" "}</div>
               ))}
               </div>
           
        
        </Modal.Body>
      
      </Modal>

      {/* ---------------------------------------------------------Bill Split--------------------------------------------------- */}
       {
        billSplitData[billSplitData.length-1]?.map((mem)=>(
          <div  key={mem.userId} className='mx-auto w-[50%] flex justify-around gap-2 items-center'>
             <div><b>Name: {" "}</b>{mem.name}</div> 
             <div><b>Amount: {" "}</b>{mem.amount}</div>
            {(groupData.userId==user._id) &&  <button onClick={()=>handleApproved(mem.userId)} style={{cursor:"pointer"}} className='bg-[#000080] text-white p-2 m-2 rounded-md cursor-pointer'>{mem.approved===false ? "Approve" : "Approved"}</button>}
           </div>

        ))
      }
          </div>
        </div> 
        </div>
    
  )
}

export default Grouphome;