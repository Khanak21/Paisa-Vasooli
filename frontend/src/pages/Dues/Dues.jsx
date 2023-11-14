import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faMinus } from '@fortawesome/free-solid-svg-icons';
import './Dues.css'
import axios from "axios";
import BillCard from "../../components/BillCard.jsx"
import Navbar from '../../components/Navbar.jsx';
import ToggleBtn from '../../components/ToggleBtn.jsx';

function Dues({ user, thememode, toggle }) {
  const [dueItem, setdueItem] = useState({
    userId: user._id,
    title: '',
    dueDate: '',
    amount: '',
    toWhom: '',
    recurring: '',
  });

  const [filterInput, setFilterInput] = useState({
    userId: user._id,
    category: '',
    startDate: '',
    endDate: '',
  });

  const [deleteDiv, setdeleteDiv] = useState(false);
  const [BillData, setBillData] = useState([]);

  const handleBillInput = (name) => (e) => {
    setdueItem({ ...dueItem, [name]: e.target.value });
  };

  const handleFilterInput = (name) => (e) => {
    setFilterInput({ ...filterInput, [name]: e.target.value });
  };

  const mailsendstart = async () => {
    try {
      const reqmail = user.email;
      console.log(reqmail);
      const res = await axios.post('http://localhost:3001/api/mail/sendstartmail', { reqmail });
      alert('Message Sent Successfully');
    } catch (err) {
      console.error('Error sending start mail:', err);
    }
  };

  const mailsendrecurring = async (recurring) => {
    try {
      const reqmail = user.email;
      const duedate = dueItem.dueDate;
      console.log(reqmail);
      const res = await axios.post('http://localhost:3001/api/mail/sendmailrecurring', { reqmail, duedate, recurring });
      alert('Message Sent Successfully');
    } catch (err) {
      console.error('Error sending recurring mail:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3001/api/bills/addBill', { dueItem });
      console.log(res.data);
      const val = res.data.bill;
      setBillData((prev) => [...prev, val]);
      mailsendstart();

      const currdate = new Date();
      const dueDateStr = dueItem.dueDate;
      const duedate = new Date(dueDateStr);

      if (currdate.getFullYear() === duedate.getFullYear() && currdate.getMonth() === duedate.getMonth() && currdate.getDate() === duedate.getDate()) {
        mailsendrecurring(dueItem.recurring);
      }

      setdueItem({
        title: '',
        dueDate: '',
        amount: '',
        toWhom: '',
        recurring: '',
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/bills/getBills/${user._id}`);
        console.log(res.data);
        setBillData(res.data.bill);
      } catch (err) {
        console.log(err);
      }
    };

    getBills();
  }, [user._id]);

  return (
    <div className="outer">
      <div className="Tt flex justify-evenly">
        <div className="">
          <h2> Manage Dues</h2>
        </div>
        <div className="toggle-dues hover:cursor-pointer mb-3 w-fit " >
        <ToggleBtn  thememode={thememode} toggle={toggle} /> 
        </div>
      </div>

      <div className="hero-section " style={{ backgroundColor: thememode === 'dark' ? 'black' : '', color: thememode === 'dark' ? 'white' : 'black' }}>
        <div className="hero-left">
          <div className="due flex justify-between w-full gap-4">
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              name="title"
              id=""
              placeholder="Input due-title"
              value={dueItem.title}
              onChange={handleBillInput('title')}
              className="w-[33rem] p-2"
            />
          </div>

          <div className="due flex justify-between w-full gap-4">
            <label htmlFor="Date">Due-Date</label>
            <input
              type="date"
              name="date"
              id=""
              placeholder="Input date of due"
              value={dueItem.dueDate}
              onChange={handleBillInput('dueDate')}
              className="w-[33rem] p-2"
            />
          </div>

          <div className="due flex justify-between w-full gap-4">
            <label htmlFor="amount">Amount</label> <br />
            <input
              type="number"
              name="amount"
              id=""
              placeholder="Input amount in Rs."
              value={dueItem.amount}
              onChange={handleBillInput('amount')}
              className="w-[33rem] p-2 rounded-md text-center"
            />
          </div>

          <div className="due flex justify-between w-full gap-4">
            <label htmlFor="PersonDue">Due-To-Person</label> <br />
            <input
              type="text"
              name="toWhom"
              id=""
              value={dueItem.toWhom}
              onChange={handleBillInput('toWhom')}
              placeholder="To whom"
              className="w-[33rem] p-2"
            />
          </div>

          <div className="due flex justify-between w-full gap-4">
            <label htmlFor="PersonDue">Recurring</label>
            <input
              type="text"
              name="recurring"
              id=""
              value={dueItem.recurring}
              onChange={handleBillInput('recurring')}
              placeholder="recurring"
              className="w-[33rem] p-2"
            />
          </div>

          <div className="add-btn flex bg-green-600 justify-center items-center hover:cursor-pointer " onClick={handleSubmit}>
            Add Due
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="storing-dues">
          <div className="overflow-y-auto w-full">
            {BillData?.map((bill) => (
              <BillCard BillData={bill} key={bill._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dues;
