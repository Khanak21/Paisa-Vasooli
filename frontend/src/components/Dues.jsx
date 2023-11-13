import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faPlus,faMinus } from '@fortawesome/free-solid-svg-icons';
import './Dues.css'
import axios from "axios";
import BillCard from "./BillCard.jsx"

function Dues({user,thememode,toggle}) {
    console.log(user)
    const [input,setInput]=useState('')
    const [selectedDate,setDate]=useState('')
    // const [amount,setAmount]=useState(0)
    // const [person,setPerson]=useState('')


    //hook to add items of due payments
    const [dueItem,setdueItem]=useState({
        userId:user._id,
        title:'',
        dueDate:'',
        amount:'',
        toWhom:'',
        recurring:''
    })
    const [filterInput,setFilterInput] = useState({
        userId:user._id,
        category:'',
        startDate:'',
        endDate:'',
      })
    const [deleteDiv,setdeleteDiv]=useState(false)
    const [BillData,setBillData] = useState([])

    // const listItems=()=>{
       
    //   const newDueItem={
        
    //   }

    //   setdueItem([...dueItem,newDueItem])
    //   setInput('');
    //   setAmount('');
    //   setDate('');
    //   setPerson('');

    // };
    
    // const itemEvent=(event)=>{
    //   const k=event.target.value
    //   setInput(k);
    //   console.log(k);
    // }

    // const SettingDate=(event)=>{
    //     const d=event.target.value
    //     setDate(d)
    //     console.log(d)
    // }

    // const amountSet=(event)=>{
    //     const yum=event.target.value
    //     setAmount(yum)
    // }

    // const DueMoneyPerson=(event)=>{
    //     const per=event.target.value
    //    setPerson(per)
    // }

   const handleDelete=()=>{

    setdeleteDiv(!deleteDiv)
   }

   const {title,dueDate,amount,toWhom,recurring} = dueItem
    
   const handleBillInput = name=>e=>{
    setdueItem({...dueItem,[name]:e.target.value})
}
    const handleFilterInput = name=>e=>{
    console.log(filterInput)
    setFilterInput({...filterInput,[name]:e.target.value})

}

   const mailsendstart=async()=>{
    try{
      const reqmail = user.email
      console.log(reqmail)
      const res = await axios.post("http://localhost:3001/api/mail/sendstartmail",{reqmail})
      .then(() => alert("Message Sent Succesfully"))
      .catch((err) => console.log(err));
    }catch(err){
      console.log(err.response.data)
    }
  }

  const mailsendrecurring=async()=>{
    try{
      const reqmail = user.email
      const recurringcat = BillData.recurring
      const duedate = BillData.dueDate
      console.log(reqmail)
      const res = await axios.post("http://localhost:3001/api/mail/sendmailrecurring",{reqmail,duedate,recurringcat})
      .then(() => alert("Message Sent Succesfully"))
      .catch((err) => console.log(err));
    }catch(err){
      console.log(err.response.data)
    }
  }

   const handleSubmit = e=>{
    e.preventDefault()
    // console.log(transInput)
    // addTransaction(transInput)
    const addBill = async()=>{
    try{
      const res = await axios.post("http://localhost:3001/api/bills/addBill",{dueItem})
      console.log(res.data)
      const val=res.data.bill
      setBillData(prev=>[...prev,val])
    }catch(err){
      console.log(err.response.data)
    }
  }
  addBill()
  mailsendstart()
  const currdate = new Date()
  const dueDateStr = BillData.dueDate;
  const duedate = new Date(dueDateStr)
  if(
    currdate.getFullYear()===duedate.getFullYear() &&
    currdate.getMonth()===duedate.getMonth() &&
    currdate.getDate()===duedate.getDate()
  ){
    mailsendrecurring()
  }
  setdueItem({
    title:'',
    dueDate:'',
    amount:'',
    toWhom:'',
    recurring:''
})
}

React.useEffect(()=>{
    const getBills = async()=>{
      try{
        // console.log("Sending request with data:", transInput);
        const res = await axios.get(`http://localhost:3001/api/bills/getBills/${user._id}`)//add user Id
        console.log(res.data)
        setBillData(res.data.bill)
      }catch(err){
        console.log(err)
      }
    }
    getBills()
  },[])

    return (
 
     
   <div className="outer">
    <div className="Tt">
       <h2> Manage Dues</h2>
    </div>

    <div className="hero-section">

        <div className="hero-left">

            <div className="add-dues">

                <div className="due-Title">
                    <label htmlFor="Title">Title</label>
                    <input 
                    type="text"  
                    name="title" 
                    id="" 
                    placeholder='Input due-title'
                    value={title}
                    onChange={handleBillInput('title')}
                    className='input-dues'
                    />
                </div>

                <div className="due-Date">
                    <label htmlFor="Date">Due-Date</label>
                    <input 
                    type="date"
                    name="dueDate" 
                    id="" 
                    placeholder='Input date of due' 
                    value={dueDate}
                    onChange={handleBillInput('dueDate')}
                    className='input-dues'
                    />
                </div>

                <div className="due-Amount">
                    <label htmlFor="amount">Amount</label>
                    <input 
                    type="number" 
                    name="amount" 
                    id="" 
                    placeholder='Input amount in Rs.' 
                    value={amount}
                    onChange={handleBillInput('amount')}
                    className='input-dues'

                    />
                </div>

                <div className="due-To">
                    <label htmlFor="PersonDue">Due-To-Person</label>
                    <input 
                    type="text" 
                    name="toWhom" 
                    id="" 
                    value={toWhom}
                    onChange={handleBillInput('toWhom')}
                    placeholder='To whom'
                    className='input-dues'

                    />
                </div>

                <div className="due-To">
                    <label htmlFor="PersonDue">Recurring</label>
                    <input 
                    type="text" 
                    name="recurring" 
                    id="" 
                    value={recurring}
                    onChange={handleBillInput('recurring')}
                    placeholder='recurring'
                    className='input-dues'

                    />
                </div>
                
            </div>
                <div className="add-btn">
                    <div className="add-item" >
                    Add Due 
                    </div>
                    <div className="plus-btn" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faPlus} className='plus' />
                    </div>
                </div>

        </div>

        <div>
          {BillData?.map(bill=>(
            //  console.log("mapped data",trans)
            <BillCard  BillData={bill} thememode={thememode} toggle={toggle}/> 
            ))}
        </div>
    </div>

   </div>

  )
}

export default Dues
