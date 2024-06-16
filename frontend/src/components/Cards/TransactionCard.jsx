import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { AiTwotoneCalendar } from 'react-icons/ai';
// ------------- TransactionCard -------------------------- 
const TransactionCard = ({ user,transactionData, key,thememode,toggle,setTransactionData,setUpdateFlag }) => {
  const [show, setShow] = useState(false)
  const [showDeleteModal,setShowDeleteModal]= useState(false)
  const [transInput, setTransInput] = useState({
        userId:user._id,
        type:'expense',
        amount:'',
        category:'',
        desc:'',
        date:'',
        currency:'',
  });
  const [errorMessage,setErrorMessage]= useState("");
  // Check if transactionData is defined
  if (!transactionData) {
    return null;
  }
  
  const { type, amount, category, desc, date,currency } = transInput;
//  ---------------- Input --------------------- 
  const handleTransInput = (name) => (e) => {
    setTransInput({ ...transInput, [name]: e.target.value });
  };
  // -------------------- functions to handle open and close  --------------- 
  const handleClose = () => {
    setShow(false);
    setErrorMessage('')
  }
  
  const handleShow = () => {
    setShow(true);
    console.log(transactionData)
    setTransInput({
      type:transactionData.type,
      amount:transactionData.amount,
      category:transactionData.category,
      desc:transactionData.desc,
      date:transactionData.date.slice(0, 10),
      currency:transactionData.currency
    })
  }
//  ---------------- function to handle submit ----------------  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitbutton =async()=>{
      try {
        if(transInput.amount===''||transInput.category===''||transInput.currency===''||transInput.date===''||transInput.type===''){
          setErrorMessage("All entries except description should be filled");
          return;
        }
        const res = await axios.put(`http://localhost:3001/api/transactions/editTransaction/${transactionData._id}`, { transInput });
        console.log(res.data);
        setTransInput({
          userId:user._id,
          type:'',
          amount:'',
          category:'',
          desc:'',
          date:'',
          currency:'',
      });
      setErrorMessage("");
      setUpdateFlag(prev=>!prev)
      handleClose()
      } catch (err) {
        console.log(err);
      }
    }
    submitbutton()
  };
//  --------------function to delete --------------- 
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/transactions/deleteTransaction/${transactionData._id}`);
      console.log(res.data);
      console.log(transactionData)
      setUpdateFlag((prevFlag) => !prevFlag);
      // You might want to update the UI or state here if needed
    } catch (err) {
      console.log(err);
    }
  };

  const handleopendeletemodal=()=>{
    setShowDeleteModal(true)
  }
  
  const handleCloseDeleteModal=()=>{
    setShowDeleteModal(false)
  }

  return (
    <div>
    <Card variant="light" border="secondary" className='mx-4 my-4 dark:text-white'>
      <Card.Header className='font-bold text-xl' style={{backgroundColor:thememode=="dark"?"#3a3a3a":"white"}}> Category{" "}:-{" "}{transactionData.category}</Card.Header>
      <Card.Body style={{backgroundColor:thememode=="dark"?"#282828":"white"}}>
        <div className='flex justify-between items-center'>
        <Card.Text className='text-md align-middle items-center my-1' style={{color:transactionData.type=="expense"?'red':'green'}}> Amount{" "}:-  &#8377;{" "}{transactionData.amount}</Card.Text>
        {/* <Card.Text className='flex align-middle my-1 mx-4'><AiTwotoneCalendar size={20} />{transactionData.date.substring(0,10)}</Card.Text> */}
      <div className='flex justify-between gap-2'>
        <AiFillEdit onClick={handleShow} style={{cursor:"pointer"}}/>
        <AiFillDelete onClick={handleopendeletemodal} style={{"cursor":"pointer"}}/>
      </div>
        
        </div>
        <Card.Text className='my-1'>
          Description{" "} :  {transactionData.desc ? transactionData.desc : 'N/A'}
        </Card.Text>
        <Card.Text className='my-1'>
          Date{" "} :  {transactionData?.date?.substring(0,10)}
        </Card.Text> 
      </Card.Body>
    </Card>
    
     <Modal show={show} onHide={handleClose} animation={false} centered>
     <Modal.Header closeButton>
       <Modal.Title>Edit Transaction</Modal.Title>
     </Modal.Header>
     <Modal.Body>
         Add transaction input section
         <label htmlFor="type">Transaction type: </label>
         <select name="type" 
                 id="type" 
                 selected="Expense" 
                 value={type}
                 onChange={handleTransInput('type')}
                 className='px-1 border-1 py-1 mx-2 rounded-md'
                 required
                 >
         <option value="expense" className='font-bold' style={{color:"red"}}>Expense</option>
         <option value="income" className='font-bold' style={{color:"green"}}>Income</option>
         </select><br/>
      <Card variant="light" border="success" className="mx-4 my-4">
        <Card.Header className='font-bold'>Transaction Category{" "} :-{" "} {transactionData.category}</Card.Header>
        <Card.Body>
          <div className="flex justify-between items-center gap-40 border-2">
       
            <Card.Text className="text-2xl  flex justify-evenly items-center font-bold mx-1">&#x20B9;{transactionData.amount}</Card.Text>
     
            <div className='flex justify-between items-center gap-40'>
                <Card.Text className="flex align-middle my-1 mx-2">
                   <AiTwotoneCalendar size={20} style={{cursor:"pointer"}} />
                    {transactionData.date && transactionData.date.substring(0, 10)}
                 </Card.Text>
            

            <div className='flex justify-between items-center gap-6'>
            <AiFillEdit onClick={handleShow} style={{ cursor: 'pointer',fontSize:"20px" }} />
            <AiFillDelete onClick={() => handleDelete(transactionData._id)} style={{ cursor: 'pointer',fontSize:"20px"  }} />
            </div>
            </div>
          </div>
         {transactionData.desc && <Card.Text className='font-bold my-2'>Transaction description :- {"  "}{transactionData.desc}</Card.Text>}
        </Card.Body>
      </Card>

      </Modal.Body>
      </Modal>
      <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton style={{cursor:"pointer"}}>
          <Modal.Title>Edit Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e)=>handleSubmit(e)}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-sm">Transaction type:</label>
                  <select
                    name="type"
                    id="type"
                    selected="Expense"
                    value={type}
                    onChange={handleTransInput('type')}
                    className="px-1 border-1 py-1 mx-2 rounded-md"
                    required
                  >
                  <option value="expense" className='font-bold' style={{color:"red"}}>Expense</option>
                  <option value="income" className='font-bold' style={{color:"green"}}>Income</option>
          </select>
                </div>
                <div>
                  <label className="font-bold text-sm">Amount:</label>
                  <input type="number" className="border border-gray-300 p-2 rounded w-full text-sm" value={amount} onChange={handleTransInput('amount')} />
                </div>
                <div>
                  <label className="font-bold text-sm">Category:</label>
                  <input type="text" className="border border-gray-300 p-2 rounded w-full text-sm" value={category} onChange={handleTransInput('category')} />
                </div>
                <div>
                  <label className="font-bold text-sm">Description:</label>
                  <input type="text" className="border border-gray-300 p-2 rounded w-full text-sm" value={desc} onChange={handleTransInput('desc')} />
                </div>
                <div>
                  <label className="font-bold text-sm">Date:</label>
                  <input type="date" className="border border-gray-300 p-2 rounded w-full text-sm" value={date} onChange={handleTransInput('date')} />
                </div>
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <button type="submit" className="mt-4 bg-[#000080] text-white py-2 px-4 rounded">Save Changes</button>
            </form>


        </Modal.Body>
      </Modal>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete this Bill?</p>
              </Modal.Body>
              <Modal.Footer>
                <div className='flex w-full justify-end'>
                <button className="bg-[#000080] mx-2 text-white p-2 rounded-md" onClick={handleCloseDeleteModal}>
                  Cancel
                </button>
                <button  className="bg-[#dc2626] text-white p-2 rounded-md" onClick={handleDelete}>
                  Delete
                </button>
                </div>
              </Modal.Footer>
            </Modal>
    </div>
    
    
  );
};

export default TransactionCard;
