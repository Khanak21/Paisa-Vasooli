import React,{useState} from 'react'
import Card from 'react-bootstrap/Card';
// import {AiTwotoneCalendar} from 'react-icons/ai';
import {AiFillEdit} from 'react-icons/ai';
import {AiFillDelete} from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import {Button} from 'react-bootstrap'
import { AiTwotoneCalendar } from 'react-icons/ai';

const TransactionCard = ({transactionData,key}) => {
const [show, setShow] = useState(false);
//state to store edited values
const [transInput,setTransInput] = useState({
  type: 'Expense',
  amount:'',
  category:'',
  desc:'',
  date:'',
})
const {type,amount,category,desc,date} = transInput

//handling edited values input
const handleTransInput = name=>e=>{
  setTransInput({...transInput,[name]:e.target.value})
}
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

//handling edit transaction submit
const handleSubmit = (e,id)=>{
  e.preventDefault()
  // console.log(transInput)
  // addTransaction(transInput)
  const editTrans = async(id)=>{
  try{
    const res = await axios.put(`http://localhost:3001/api/transactions/editTransaction/${id}`,{transInput})
    console.log(res.data)
  }catch(err){
    console.log(err)
  }}

  editTrans(id)

  setTransInput({
  type:'Expense',
  amount:'',
  category:'',
  desc:'',
  date:''
  })
}

// handling deletion of transaction
const handleDelete = (id)=>{
  // console.log(transInput)
  // addTransaction(transInput)
  const delTrans = async(id)=>{
  try{
    const res = await axios.delete(`http://localhost:3001/api/transactions/deleteTransaction/${id}`)
    console.log(res.data)
  }catch(err){
    console.log(err)
  }}
  delTrans(id)
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
      <Card.Header>{transactionData.category}</Card.Header>
      <Card.Body>
        <div className='flex align-middle items-center border-2'>
        <Card.Text className='text-3xl align-middle items-center border-2 my-1'>${transactionData.amount}</Card.Text>
        <Card.Text className='flex align-middle border-2 my-1 mx-4'><AiTwotoneCalendar size={20} />{transactionData.date}</Card.Text>
        <AiFillEdit onClick={handleShow} style={{"cursor":"pointer"}}/><AiFillDelete/>
        </div>
        <Card.Text>
            {transactionData.desc}
        </Card.Text>
      </Card.Body>
    </Card>
    
     <Modal show={show} onHide={handleClose} animation={false} centered>
     <Modal.Header closeButton>
       <Modal.Title>Edit Transaction</Modal.Title>
     </Modal.Header>
     <Modal.Body>
         {/* Add transaction input section */}
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
   </Modal>
   </div>
  )
}

export default TransactionCard