import React,{useState} from 'react'
import Card from 'react-bootstrap/Card';
// import {AiTwotoneCalendar} from 'react-icons/ai';
import {AiFillEdit} from 'react-icons/ai';
import {AiFillDelete} from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import {Button} from 'react-bootstrap'
import { AiTwotoneCalendar } from 'react-icons/ai';

const BillCard = ({BillData}) => {
const [show, setShow] = useState(false);
//state to store edited values
const [BillInput,setBillInput] = useState({
    title:'',
    dueDate:'',
    amount:'',
    toWhom:''
})
const {title,amount,toWhom,dueDate} = BillInput

//handling edited values input
const handleBillInput = name=>e=>{
  setBillInput({...BillInput,[name]:e.target.value})
}
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

//handling edit transaction submit
const handleSubmit = (e,id)=>{
  e.preventDefault()
  // console.log(transInput)
  // addTransaction(transInput)
  const editBill = async(id)=>{
  try{
    const res = await axios.put(`http://localhost:3001/api/bills/editBill/${id}`,{BillInput})
    console.log(res.data)
  }catch(err){
    console.log(err)
  }}

  editBill(id)

  setBillInput({
    title:'',
    dueDate:'',
    amount:'',
    toWhom:''
  })
}

// handling deletion of transaction
const handleDelete = (id)=>{
  // console.log(transInput)
  // addTransaction(transInput)
  const delBill = async(id)=>{
  try{
    const res = await axios.delete(`http://localhost:3001/api/bills/deleteBill/${id}`)
    console.log(res.data)
  }catch(err){
    console.log(err)
  }}
  delBill(id)
}


  return (
    <div>
        {/* <div className='border-2 rounded-md mx-4 my-2'>
            <div>
            Sabji 
            <div>
                this is a sabzi
            </div>
            <div>
                $100
            </div>

            </div>
            <div>
                7/9/23
            </div>
           
        </div> */
        // <AiTwotoneCalendar size={20} />7
      }
    <Card variant="light" border="success" className='mx-4 my-4'>
      <Card.Body>
        <div className='flex align-middle items-center border-2'>
        <Card.Text className='text-3xl align-middle items-center border-2 my-1'>${BillData.toWhom}</Card.Text>
        <Card.Text className='text-3xl align-middle items-center border-2 my-1'>${BillData.amount}</Card.Text>
        <Card.Text className='flex align-middle border-2 my-1 mx-4'><AiTwotoneCalendar size={20} />{BillData.dueDate}</Card.Text>
        <AiFillEdit onClick={handleShow} style={{"cursor":"pointer"}}/><AiFillDelete/>
        </div>
        <Card.Text>
            {BillData.title}
        </Card.Text>
      </Card.Body>
    </Card>
    
     <Modal show={show} onHide={handleClose} animation={false} centered>
     <Modal.Header closeButton>
       <Modal.Title>Edit Bill</Modal.Title>
     </Modal.Header>
     <Modal.Body>
         {/* Add Bill input section */}

         <label htmlFor='amount'>Amount: </label>
         <input type="number" 
                name={'amount'}
                value={amount}
                onChange={handleBillInput('amount')}
                required
                ></input>

         <label htmlFor='person'>toWhom: </label>
         <input name={"person"}
                type="text"
                value={toWhom}
                onChange={handleBillInput('toWhom')}
                required
                ></input>

         <label htmlFor='title'>Title:</label>
         <input type='text' 
                name={'title'}
                value={title}
                onChange={handleBillInput('title')}
         ></input>

         <label htmlFor='date'>Date:</label>
         <input type='date'
                name={"dueDate"}
                value={dueDate}
                onChange={handleBillInput('dueDate')}
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
   </Modal>
   </div>
  )
}

export default BillCard