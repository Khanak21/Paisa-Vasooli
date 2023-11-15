import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { AiTwotoneCalendar } from 'react-icons/ai';

const TransactionCard = ({ transactionData, key }) => {
  const [show, setShow] = useState(false)
  const [transInput, setTransInput] = useState({
    type: 'Expense',
    amount: '',
    category: '',
    desc: '',
    date: '',
  });
  // Check if transactionData is defined
  if (!transactionData) {
    return null;
  }

  const { type, amount, category, desc, date } = transInput;

  const handleTransInput = (name) => (e) => {
    setTransInput({ ...transInput, [name]: e.target.value });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3001/api/transactions/editTransaction/${id}`, { transInput });
      console.log(res.data);
      // You might want to update the UI or state here if needed
    } catch (err) {
      console.log(err);
    }

    setTransInput({
      type: 'Expense',
      amount: '',
      category: '',
      desc: '',
      date: '',
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/transactions/deleteTransaction/${id}`);
      console.log(res.data);
      // You might want to update the UI or state here if needed
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
    <Card variant="light" border="success" className='mx-4 my-4'>
      <Card.Header>{transactionData.category}</Card.Header>
      <Card.Body>
        <div className='flex align-middle items-center border-2'>
        <Card.Text className='text-3xl align-middle items-center my-1'>${transactionData.amount}</Card.Text>
        <Card.Text className='flex align-middle my-1 mx-4'><AiTwotoneCalendar size={20} />{transactionData.date.substring(0,10)}</Card.Text>
        <AiFillEdit onClick={handleShow} style={{"cursor":"pointer"}}/><AiFillDelete onClick={()=>{handleDelete(transactionData._id)}} style={{"cursor":"pointer"}}/>
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
      <Card variant="light" border="success" className="mx-4 my-4">
        <Card.Header className='font-bold'>Transaction Category{" "} :-{" "} {transactionData.category}</Card.Header>
        <Card.Body>
          <div className="flex justify-between items-center gap-40 border-2">

            <Card.Text className="text-3xl align-middle items-center my-1">&#x20B9;{ " "}  {transactionData.amount}</Card.Text>
 
            <div className='flex justify-between items-center gap-40'>
            <Card.Text className="flex align-middle my-1 mx-4">
              <AiTwotoneCalendar size={20} />
              {transactionData.date && transactionData.date.substring(0, 10)}
            </Card.Text>
            

            <div className='flex justify-between items-center gap-6'>
            <AiFillEdit onClick={handleShow} style={{ cursor: 'pointer',fontSize:"20px" }} />
            <AiFillDelete onClick={() => handleDelete(transactionData._id)} style={{ cursor: 'pointer',fontSize:"20px"  }} />
            </div>

            </div>

          </div>
          <Card.Text className='font-bold my-2'>Transaction Data :- {"  "}{transactionData.desc}</Card.Text>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="type">Transaction type: </label>
          <select
            name="type"
            id="type"
            selected="Expense"
            value={type}
            onChange={handleTransInput('type')}
            className="px-1 border-1 py-1 mx-2 rounded-md"
            required
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <br />

          <label htmlFor="amount">Amount: </label>
          <input type="number" name={'amount'} value={amount} onChange={handleTransInput('amount')} required />

          <label htmlFor="category">Category: </label>
          <input name={'category'} type="text" value={category} onChange={handleTransInput('category')} required />

          <label htmlFor="desc">Description:</label>
          <input type="text" name={'desc'} value={desc} onChange={handleTransInput('desc')} />

          <label htmlFor="date">Date:</label>
          <input type="date" name={'date'} value={date} onChange={handleTransInput('date')} required />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={(e) => handleSubmit(e, transactionData._id)} required>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      </Modal.Body>
      </Modal>
    </div> 
  );
};

export default TransactionCard;
