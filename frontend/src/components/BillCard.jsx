import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { AiTwotoneCalendar } from 'react-icons/ai';

const BillCard = ({ user,BillData }) => {
  const [show, setShow] = useState(false);
  const [BillInput, setBillInput] = useState({
    userId: user._id,
    title: '',
    dueDate: '',
    amount: '',
    toWhom: '',
    recurring: '',
  });

  const { title, amount, toWhom, dueDate } = BillInput;

  const handleBillInput = (name) => (e) => {
    setBillInput({ ...BillInput, [name]: e.target.value });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editBill = async () => {
      try {
        const res = await axios.put(`http://localhost:3001/api/bills/editBill/${BillData._id}`, { BillInput });
        console.log(res.data);
        setBillInput({
          userId: user._id,
        title: '',
        dueDate: '',
        amount: '',
        toWhom: '',
        recurring: '',
        });
      } catch (err) {
        console.log(err);
      }
    };
    editBill();
  };

  const handleDelete = (id) => {
    const delBill = async (id) => {
      try {
        const res = await axios.delete(`http://localhost:3001/api/bills/deleteBill/${id}`);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    delBill(id);
  };

  return (
    <div>
      <Card variant="light" border="success" className="mx-4 my-4">
        <Card.Body>
          <Card.Text className="" style={{backgroundColor:"rgb(134, 199, 255)"}}>Title:-{"  "} {BillData.title}</Card.Text>
          <div className="flex justify-between items-center border-2 gap-3 p-2">
            <div className='flex flex-col justify-center items-start'>
            <Card.Text className="text-md align-middle items-center "><b>To :-{" "}{BillData.toWhom} </b></Card.Text>
            <Card.Text className="text-md align-middle items-center"><b>Due Amount :-{" " }&#8377; {BillData.amount} </b> </Card.Text>
            </div>
          
          <div className='flex flex-col w-full justify-end items-start gap-2 '>
            <Card.Text className="flex items-center justify-evenly  text-md w-full">
               <br/>
             <b>Date:-{" "}  {BillData.dueDate} </b>
             <AiTwotoneCalendar size={20} />
            </Card.Text>

          <div className='flex justify-end w-full gap-4 mr-6'>
            <AiFillEdit onClick={handleShow} style={{ cursor: 'pointer' }} />
            <AiFillDelete onClick={() => handleDelete(BillData._id)} style={{ cursor: 'pointer' }} />
          </div>
          </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add Bill input section */}
          <label htmlFor="amount">Amount: </label>
          <input type="number" name={'amount'} value={amount} onChange={handleBillInput('amount')} required />

          <label htmlFor="person">toWhom: </label>
          <input name={'person'} type="text" value={toWhom} onChange={handleBillInput('toWhom')} required />

          <label htmlFor="title">Title:</label>
          <input type="text" name={'title'} value={title} onChange={handleBillInput('title')} required />

          <label htmlFor="date">Date:</label>
          <input type="date" name={'dueDate'} value={dueDate} onChange={handleBillInput('dueDate')} required />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit} required>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BillCard;
