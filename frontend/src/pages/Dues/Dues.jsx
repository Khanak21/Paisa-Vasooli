import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faMinus } from '@fortawesome/free-solid-svg-icons';
import './Dues.css'
import axios from "axios";
import BillCard from "../../components/BillCard.jsx"
import Navbar from '../../components/Navbar.jsx';
import ToggleBtn from '../../components/ToggleBtn.jsx';


function Dues({ user, thememode, toggle,setUser }) {
  const [billflag,setbillflag] = useState(false)
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
    const check=async()=>{
      try{
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          console.log(loggedInUser);
          const foundUser = JSON.parse(loggedInUser);
          console.log("found user",foundUser  )
          await setUser(foundUser);
        }
      }catch(err){
        console.log(err)
      }
    }
    check()
  }, [user._id]);

  useEffect(()=>{
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
  },[billflag])

  return (
  <>
   <Navbar thememode={thememode} toggle={toggle}/>
    <div className="outer" style={{ backgroundColor: thememode === 'dark' ? 'rgb(85, 98, 106)' : 'white'}}>
      

      <div className="hero-section "  >
        <div className="hero-left" style={{ borderColor: thememode === 'dark' ? 'white' : 'green'}}>
          <div className="due flex justify-between w-full gap-4">
            <label htmlFor="Title" style={{ color: thememode === 'dark' ? 'white' : 'black'}}>Title</label>
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
            <label htmlFor="Date" style={{ color: thememode === 'dark' ? 'white' : 'black'}}>Due-Date</label>
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
            <label htmlFor="amount" style={{ color: thememode === 'dark' ? 'white' : 'black'}}>Amount</label> <br />
            <input
              type="number"
              name="amount"
              id=""
              placeholder="Input amount in Rs."
              value={dueItem.amount}
              onChange={handleBillInput('amount')}
              className="w-[33rem] p-2 "
            />
          </div>

          <div className="due flex justify-between w-full gap-4 dueperson ">
            <label htmlFor="PersonDue " style={{ color: thememode === 'dark' ? 'white' : 'black'}}>Due-To-Person</label> <br />
            <input
              type="text"
              name="toWhom"
              id=""
              value={dueItem.toWhom}
              onChange={handleBillInput('toWhom')}
              placeholder="To whom"
              className="w-[33rem] p-2 dueperson"
            />
          </div>

          {/* <div className="due flex justify-between w-full gap-4">
            <label htmlFor="PersonDue" style={{ color: thememode === 'dark' ? 'white' : 'black'}}>Recurring</label>
            <input
              type="text"
              name="recurring"
              id=""
              value={dueItem.recurring}
              onChange={handleBillInput('recurring')}
              placeholder="recurring"
              className="w-[33rem] p-2"
             
            />
          </div> */}

        <div className="due flex justify-between w-full gap-4">
          <label htmlFor="PersonDue" style={{ color: thememode === 'dark' ? 'white' : 'black' }}>Recurring</label>
          <select
            name="recurring"
            value={dueItem.recurring}
            onChange={handleBillInput('recurring')}
            className="w-[33rem] p-2"
          >
            <option value="">Select:</option>x
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

          <div className="add-btn flex bg-green-600 justify-center items-center hover:cursor-pointer " onClick={handleSubmit}>
            Add Due
          </div>
        </div>

      <div className="hero-right h-full">
        <div className="storing-dues">
          <div className="overflow-y-auto w-full">
            {BillData?.map((bill) => (
              <BillCard billflag={billflag} setbillflag={setbillflag} user={user} BillData={bill} key={bill._id} />
            ))}
          </div>
        </div>
      </div>
      </div>

    </div>
  </>
  );
}

export default Dues;
