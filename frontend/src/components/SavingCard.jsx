import React,{useState} from 'react'
import Card from 'react-bootstrap/Card';
import {AiTwotoneCalendar} from 'react-icons/ai';
import {AiFillEdit} from 'react-icons/ai';
import {AiFillDelete} from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import {Button} from 'react-bootstrap'

export const SavingCard = ({props,savingData,setSavingData}) => {
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
console.log(props._id)
const percentage=props.currAmt*100/props.targetAmt
const handleDelete = async()=>{
    try{
        const res=await axios.delete(`http://localhost:3001/api/savings/deleteSaving/${props._id}`)
        console.log(res.data.saving)
        const sav=res.data.saving
        setSavingData(savingData.filter(data=>data._id!=sav._id))

    }catch(err){
        console.log(err)
    }
}
  return (
    <div>
         <Card variant="light" border="success" className='w-full'>
      <Card.Header>{props.title}</Card.Header>
      <Card.Body>
        <div>
        <div className='flex justify-between align-middle items-center'>
            <div className="progress">
              <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" style={{"width":`${percentage}%`}}>
                 {percentage}% Complete
              </div>
            </div>
            <Card.Text className='text-3xl align-middle items-center my-1'>${props.targetAmt}</Card.Text></div>
        <div className='flex align-middle items-center justify-between'>
        <Card.Text className='text-md align-middle items-center my-1'>current amount: ${props.currAmt}</Card.Text>
        <div className='flex'><AiFillEdit onClick={handleShow} style={{"cursor":"pointer"}}/><AiFillDelete onClick={()=>handleDelete()} style={{"cursor":"pointer"}}/></div>
        </div>
        </div>
      </Card.Body>
    </Card>
    
     {/* <Modal show={show} onHide={handleClose} animation={false} centered>
     <Modal.Header closeButton>
       <Modal.Title>Edit Transaction</Modal.Title>
     </Modal.Header>
     <Modal.Body>
        
         <label htmlFor="type">Transaction type: </label>
         <select name="type" 
                 id="type" 
                 selected="Expense" 
                 value={type}
                 onChange={handleTransInput('type')}
                 className='px-1 border-1 py-1 mx-2 rounded-md'
                 required
                 >
         <option value="expense">Expense</option>
         <option value="income">Income</option>
         </select><br/>

         <label htmlFor='amount'>Amount: </label>
         <input type="number" 
                name={'amount'}
                value={amount}
                onChange={handleTransInput('amount')}
                required
                ></input>

         <label htmlFor='category'>Category: </label>
         <input name={"category"}
                type="text"
                value={category}
                onChange={handleTransInput('category')}
                required
                ></input>

         <label htmlFor='desc'>Description:</label>
         <input type='text' 
                name={'desc'}
                value={desc}
                onChange={handleTransInput('desc')}
         ></input>

         <label htmlFor='date'>Date:</label>
         <input type='date'
                name={"date"}
                value={date}
                onChange={handleTransInput('date')}
                required
         ></input>
     </Modal.Body>
     <Modal.Footer>
       <Button variant="success"
               onClick={handleSubmit}
               required
       >
         Save
       </Button>
     </Modal.Footer>
   </Modal> */}
    </div>
  )
}
