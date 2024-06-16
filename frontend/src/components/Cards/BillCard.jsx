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
 
  {/*-----------------function to handle the bill's input8--------*/}
  const handleBillInput = (name) => (e) => {
    setBillInput({ ...BillInput, [name]: e.target.value });
  };

  // -------------- handling the closing and opening of edit ------------- 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  // --------------funtion to handle the submitting the edit data --------------------- 
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
 
  // ----------------  handling the delete function -------------------- 
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
  
  //function to track past due payments
  const paymentTime=()=>{
    let duedate=new Date(BillData.dueDate)
    let currDate=new Date();
  
    return currDate>duedate;
  };

  return (
              <tr>
              <td>{BillData.title}</td>
              <td>&#8377; {BillData.amount}</td>
              <td>{BillData.dueDate?.substring(0,10)}</td>
              <td>
                <div className='flex justify-end w-[80%] gap-4 mr-6'>
                  <AiFillEdit onClick={handleShow} style={{ cursor: 'pointer' }} />
                  <AiFillDelete onClick={() => handleDelete(BillData._id)} style={{ cursor: 'pointer' }} />
                </div>
              </td>
              </tr>
  );
};

export default BillCard;
