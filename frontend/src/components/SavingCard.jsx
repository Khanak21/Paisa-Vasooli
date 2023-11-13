import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const SavingCard = (items) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Add your state variables here
  // const [type, setType] = useState('');
  // const [amount, setAmount] = useState('');
  // ...

  // Add your state update functions here
  // const handleTransInput = (fieldName) => (event) => {
  //   // Update state based on the field name
  // };

  // const handleSubmit = () => {
  //   // Handle form submission
  // };

  return (
    
    <div className='flex flex-col justify-center items-start gap-8 w-full p-1 h-auto'>
    
      <Card variant="light" border="success" className="w-full flex flex-col gap-3 border-green-400 rounded-lg border-2 h-auto p-1 ">


        <Card.Header className='bg-slate-300 font-semibold text-center text-lg flex justify-evenly'>Title{" "}- <div>
         {items.title}</div></Card.Header>


        <Card.Body>
          <div className="flex justify-between gap-3 align-middle items-center p-3 w-full">
            <div className="flex flex-col gap-5 justify-between align-middle items-center w-5/10">
              <div className="progress w-full">
              <div>Complete (success) </div>
                <div
                  className="progress-bar progress-bar-success text-sm h-5 w-full bg-green-800 rounded-lg text-white p-2 flex justify-center items-center"
                  role="progressbar"
                  aria-valuenow="40"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: '40%' }}
                >
              
                  <div>  40% </div>
                
                </div>
              </div>
              <Card.Text className="align-middle items-center my-1 text-sm">Current Amount{"  "}- ${items.currentAmount}</Card.Text>
            </div>

            <div className="flex flex-col gap-4 align-middle items-center justify-between  w-5/10 h-full">
              <Card.Text className="text-md align-middle items-center my-1">Goal Amount{"  "}-{" "}${items.goalAmount}</Card.Text>
              <div className="flex justify-between w-full items-center">
                <AiFillEdit onClick={handleShow} style={{ cursor: 'pointer' }} />
                <AiFillDelete />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your form inputs here */}
          {/* Example: */}
          {/* <label htmlFor="type">Transaction type:</label> */}
          {/* <select name="type" id="type" value={type} onChange={handleTransInput('type')} required> */}
          {/*   <option value="expense">Expense</option> */}
          {/*   <option value="income">Income</option> */}
          {/* </select> */}
          {/* ... */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  
  );
};

export default SavingCard;
