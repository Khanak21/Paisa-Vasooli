import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { AiTwotoneCalendar } from 'react-icons/ai';

const BillCard = ({ billflag,setbillflag,user,BillData,thememode }) => {
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
        setbillflag((prev)=>!(prev))
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
        setbillflag((prev)=>!(prev))
      } catch (err) {
        console.log(err);
      }
    };
    delBill(id);
  };

  return (
    <div>
      <Card variant="light" border="secondary" className="mx-4 my-4 p-1"  style={{backgroundColor:thememode=="dark" ? "#282828":"",color:thememode=="dark"?"white":"black"}}>
        <Card.Body>
          <Card.Header >Title:-{"  "} {BillData.title}</Card.Header>
          <div className="flex justify-between items-center gap-3 p-2">
            <div className='flex flex-col justify-center items-start'>
            <Card.Text className="text-md align-middle items-center "><b>To :-{" "}{BillData.toWhom} </b></Card.Text>
            <Card.Text className="text-sm align-middle items-center"><b>Amount :-{" " }&#8377; {BillData.amount} </b> </Card.Text>
            </div>
          
          <div className='flex flex-col w-[60%] justify-end items-start gap-2 '>
            <Card.Text className="flex items-center justify-evenly  text-md w-full">
               <br/>
             <b>Date:-{" "}  {BillData.dueDate?.substring(0,10)} </b>
             <AiTwotoneCalendar size={20} />
            </Card.Text>

          <div className='flex justify-end w-[80%] gap-4 mr-6'>
            <AiFillEdit onClick={handleShow} style={{ cursor: 'pointer' }} />
            <AiFillDelete onClick={() => handleDelete(BillData._id)} style={{ cursor: 'pointer' }} />
          </div>
          </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title className='font-bolder'>Edit Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add Bill input section */}
          <label htmlFor="amount" className='font-bold'>Amount: </label>
          <input type="number" defaultValue={BillData.amount} name={'amount'}  onChange={handleBillInput('amount')} required />

          <label htmlFor="person" className='font-bold'>toWhom: </label>
          <input name={'person'} type="text" defaultValue={BillData.toWhom}  onChange={handleBillInput('toWhom')} required />

          <label htmlFor="title" className='font-bold'>Title:</label>
          <input type="text" name={'title'} defaultValue={BillData.title} onChange={handleBillInput('title')} required />

          <label htmlFor="date" className='font-bold'>Date:</label>
          <input type="date" name={'dueDate'} defaultValue={BillData?.dueDate?.substring(0,10)} onChange={handleBillInput('dueDate')} required />
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
