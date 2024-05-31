import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faMinus } from '@fortawesome/free-solid-svg-icons';
import './Dues.css'
import axios from "axios";
import BillCard from "../../components/Cards/BillCard.jsx"
import Navbar from '../../components/Navbar/Navbar.jsx';
import ToggleBtn from '../../components/Navbar/ToggleBtn.jsx';
import Table from 'react-bootstrap/Table';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';



function Dues({ user, thememode, toggle,setUser }) {
  const [billflag,setbillflag] = useState(false)
  const [dueItem, setdueItem] = useState({
    userId: user._id,
    title: '',
    dueDate: '',
    amount: '',
    toWhom: '',
    recurring: '',
    currency:''
  });

  const [filterInput, setFilterInput] = useState({
    userId: user._id,
    category: '',
    startDate: '',
    endDate: '',
  });

  const [deleteDiv, setdeleteDiv] = useState(false);
  const [BillData, setBillData] = useState([]);
  console.log(BillData)
    // ---------------input ----------------------- 
  const handleBillInput = (name) => (e) => {
    setdueItem({ ...dueItem, [name]: e.target.value });
  };
  //  --------------handling filter input --------------- 
  const handleFilterInput = (name) => (e) => {
    setFilterInput({ ...filterInput, [name]: e.target.value });
  };
  // -----------------function to manage mails ------------------- 
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
      const recurring = dueItem.recurring
      console.log(reqmail);
      const res = await axios.post('http://localhost:3001/api/mail/sendmailrecurring', { reqmail, duedate, recurring });
      alert('Message Sent Successfully');
    } catch (err) {
      console.error('Error sending recurring mail:', err);
    }
  };
// ----------------------- Submit ------------------- 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Currency data:', currenciData);
    console.log(currenciData[dueItem.currency]);
    dueItem.amount =Math.floor(dueItem.amount / currenciData[dueItem.currency]);
      console.log(dueItem.amount)
    try {
      const res = await axios.post('http://localhost:3001/api/bills/addBill', { dueItem });
      console.log(res.data);
      const val = res.data.bill;
      setBillData((prev) => [...prev, val]);
      mailsendstart();
      const currdate = new Date();
      const dueDateStr = dueItem.dueDate;
      const duedate = new Date(dueDateStr);
      const oneDayInMillis = 24 * 60 * 60 * 1000;
      if (currdate.getFullYear() === duedate.getFullYear() && currdate.getMonth() === duedate.getMonth() && currdate.getDate() === duedate.getDate() && currdate.getTime() + oneDayInMillis === duedate.getTime()) {
        mailsendrecurring(dueItem.recurring);
      }

      setdueItem({
        title: '',
        dueDate: '',
        amount: '',
        toWhom: '',
        recurring: '',
        currency:''
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

  const UCurrency=(currency)=>{
    const [data, setData] = useState({})
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`);
          const result = await response.json();
          setData(result[currency]);
        } catch (error) {
          console.error('Error fetching currency data:', error);
        }
      };
      fetchData();
    }, [currency]);
    useEffect(() => {
      console.log(data); // Log the state after it has been updated
    }, [data]);
    return data
}
const [currenci, setCurrenci] = useState('inr');
const currenciData = UCurrency(currenci);

//Table entry data

const [show, setShow] = useState(false);
const [Bill, setBill] = useState({
  userId: user._id,
  title: '',
  dueDate: '',
  amount: '',
  toWhom: '',
  recurring: '',
});

const { title, amount, toWhom, dueDate } = Bill;

{/*-----------------function to handle the bill's input8--------*/}
const handleBill = (name) => (e) => {
  setBill({ ...Bill, [name]: e.target.value });
};

// -------------- handling the closing and opening of edit ------------- 
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

// --------------funtion to handle the submitting the edit data --------------------- 
const handleSubmitBill = (e,id) => {
  e.preventDefault();
  const editBill = async () => {
    try {
      const res = await axios.put(`http://localhost:3001/api/bills/editBill/${id}`, { Bill });
      console.log(res.data);
      setBill({
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

return (
  <>
   <Navbar thememode={thememode} toggle={toggle}/> 
    <div className="outer min-h-screen w-full" style={{ backgroundColor: thememode === 'dark' ? '#181818' : '#f0f0f0'}}>
      <div className='font-extrabold text-5xl mx-4 mt-4 dark:text-[#f0f0f0]'>Bills and Dues</div>
      <div className='mx-4 text-gray-600 dark:text-gray-400'>Manage your recurring bills and dues here. Receive reminders through email</div>
      

      <div className="hero-section h-full"  >
        <div className="hero-left " style={{ borderColor: thememode === 'dark' ? '#8656cd' : '#8656cd',backgroundColor: thememode === 'dark' ? '#2c3034' : 'white'}}>
          <div className="due flex justify-between w-full gap-4 ">
            <label htmlFor="Title" style={{ color: thememode === 'dark' ? 'white' : 'black'}} className='w-[30%]'>Title</label>
            <input
              type="text"
              name="title"
              id=""
              placeholder="Input due-title"
              value={dueItem.title}
              onChange={handleBillInput('title')}
              className="w-[70%] p-2 dark:bg-[#3a3a3a]"
              />
          </div>

          <div className="due flex justify-between w-full gap-4">
            <label htmlFor="Date" className='w-[30%]' style={{ color: thememode === 'dark' ? 'white' : 'black'}}>Due date</label>
            <input
              type="date"
              name="date"
              id=""
              placeholder="Input date of due"
              value={dueItem.dueDate}
              onChange={handleBillInput('dueDate')}
              className="w-[70%] p-2 dark:bg-[#3a3a3a] dark:text-gray-400"
             
            />
          </div>

          <div className="due flex justify-between w-full gap-4">
            <label htmlFor="amount" className='w-[30%]' style={{ color: thememode === 'dark' ? 'white' : 'black'}}>Amount</label> <br />
            <input
              type="number"
              name="amount"
              id=""
              placeholder="Input amount in Rs."
              value={dueItem.amount}
              onChange={handleBillInput('amount')}
              className="w-[70%] p-2 rounded-md text-center dark:bg-[#3a3a3a]"
              
            />
          </div>

          <div className="due flex justify-between w-full gap-4 dueperson ">
            <label htmlFor="PersonDue " className='w-[30%]' style={{ color: thememode === 'dark' ? 'white' : 'black'}}>Due To</label> <br />
            <input
              type="text"
              name="toWhom"
              id=""
              value={dueItem.toWhom}
              onChange={handleBillInput('toWhom')}
              placeholder="To whom"
              className="w-[70%] p-2 dark:bg-[#3a3a3a]"
             
            />
          </div>


          <div className="due flex justify-between w-full gap-4 dueperson ">
            <label htmlFor="PersonDue " style={{ color: thememode === 'dark' ? 'white' : 'black'}}>Currency</label> <br />
            <select
                    name="currency"
                    id="currency"
                    value={dueItem.currency}
                    onChange={handleBillInput('currency')}
                    className="w-[33rem] p-2 bg-[#f0f0f0] rounded-md dark:bg-[#3a3a3a] dark:text-gray-400"
                    required
                  >
                    <option>Select:</option>
                    <option value="inr">inr</option>
                    <option value="usd">usd</option>
                    <option value="eur">eur</option>
                    <option value="gbp">gbp</option>
                    <option value="jpy">jpy</option>
                    <option value="aud">aud</option>
                    <option value="cad">cad</option>
                    <option value="cny">cny</option>
                    <option value="hkd">hkd</option>
                    <option value="sgd">sgd</option>
                    <option value="chf">chf</option>
                    <option value="sek">sek</option>
                    <option value="mxn">mxn</option>
                  </select>
          </div>


          <div className="due flex justify-between w-full gap-4">
            <label htmlFor="PersonDue" style={{ color: thememode === 'dark' ? 'white' : 'black'}}>Recurring</label>
             <select
              name="recurring"
              id=""
              value={dueItem.recurring}
              onChange={handleBillInput('recurring')}
              className="w-[70%] p-2 dark:bg-[#3a3a3a] rounded-md bg-[#f0f0f0] dark:text-gray-400"
            >
              <option value="">Select</option>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select> 

          </div>

          <div className="add-btn flex justify-center items-center hover:cursor-pointer "  style={{ backgroundColor: 'rgb(157, 122, 253)' }} onClick={handleSubmit}>
            Add Due
          </div>
        </div>

      <div className="hero-right h-full">
        <div className="storing-dues">
          <div className="overflow-y-scroll w-full max-h-[500px]">
          <Table striped borderless hover variant={thememode == 'dark' ? 'dark' : ''}>
            <thead>
              <tr>
                <th>Due To</th>
                <th>Amount</th>
                <th>Due date</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
            {BillData?.map((bill) => (
              // <BillCard billflag={billflag} setbillflag={setbillflag} user={user} BillData={bill} key={bill._id} thememode={thememode}/>
              <>
              <tr key = {bill._id}>
              <td>{bill.title}</td>
              <td>&#8377; {bill.amount}</td>
              <td>{bill.dueDate?.substring(0,10)}</td>
              <td>
                <div className='flex justify-end w-[80%] gap-4 mr-6'>
                  <AiFillEdit onClick={handleShow} style={{ cursor: 'pointer' }} />
                  <AiFillDelete onClick={() => handleDelete(bill._id)} style={{ cursor: 'pointer' }} />
                </div>
              </td>
              </tr>
              </>
            ))}
            </tbody>
          </Table>
            {BillData?.map((bill) => (
              <BillCard billflag={billflag} setbillflag={setbillflag} user={user} BillData={bill} key={bill._id} thememode={thememode}/>
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

