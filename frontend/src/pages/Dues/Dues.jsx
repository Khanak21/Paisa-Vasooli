import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faMinus } from '@fortawesome/free-solid-svg-icons';
import './Dues.css'
import axios from "axios";
import BillCard from "../../components/Cards/BillCard.jsx"
import Navbar from '../../components/Navbar.jsx'
import ToggleBtn from '../../components/Toggle/ToggleBtn.jsx';
import Table from 'react-bootstrap/Table';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

function Dues({ user, thememode, toggle,setUser }) {
  const [billflag,setbillflag] = useState(false)
  const [selecteddue,setselecteddue] = useState(null);
  const [showDeleteModal,setShowDeleteModal] = useState(false)
  const [dueItem, setdueItem] = useState({
    userId: user._id,
    title: '',
    dueDate: '',
    amount: '',
    toWhom: '',
    recurring: 'daily',
    currency:'inr'
  });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [filterInput, setFilterInput] = useState({
    userId: user._id,
    category: '',
    startDate: '',
    endDate: '',
  });

  const [deleteDiv, setdeleteDiv] = useState(false);
  const [BillData, setBillData] = useState([]);
  const [errorMessageAdd, setErrorMessageAdd] = useState("");
  console.log(BillData)
    // ---------------input ----------------------- 
  const handleBillInput = (name) => (e) => {
    if(name=='title' ||name=='toWhom'){
      const capitalizedTitle = capitalizeFirstLetter(e.target.value);
      setdueItem({ ...dueItem, [name]: capitalizedTitle });
    }
    else{
      setdueItem({ ...dueItem, [name]: e.target.value });
    }
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
    const currencysmall = dueItem.currency.toUpperCase();
    dueItem.amount =Math.floor(dueItem.amount / currenciData[currencysmall]);
    if(dueItem.amount==''||dueItem.currency===''||dueItem.dueDate===''||dueItem.recurring===''||dueItem.title===''||dueItem.toWhom===''||dueItem.userId===''){
      setErrorMessageAdd("All entries should be filled");
      return ;
    }
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
        recurring: 'daily',
        currency:'inr'
      });
      setErrorMessageAdd("");
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
          const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=LQvy3LtRMZSLNj7WvwKX3tPoA37h6FdzWNaLbw4f&currencies=INR%2CMXN%2CSEK%2CCHF%2CSGD%2CHKD%2CCNY%2CCAD%2CAUD%2CJPY%2CGBP%2CEUR%2CUSD%2CCAD&base_currency=INR`);
          const result = await response.json();
          setData(result.data);
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
const [errorMessage, setErrorMessage] = useState("");
const [show, setShow] = useState(false);
const [sellectedbill,setselectedbill] = useState(null);
const [Bill, setBill] = useState({
  userId: user._id,
  titleedit: '',
  dueDateedit: '',
  amountedit: '',
  toWhomedit: '',
});

const {titleedit, amountedit, toWhomedit, dueDateedit } = Bill;

const handleBill = (name) => (e) => {
  // setBill({ ...Bill, [name]: e.target.value });
  if(name=='titleedit' ||name=='toWhomedit'){
    const capitalizedTitle = capitalizeFirstLetter(e.target.value);
    setBill({ ...Bill, [name]: capitalizedTitle });
  }
  else{
    setBill({ ...Bill, [name]: e.target.value });
  }
};

// -------------- handling the closing and opening of edit ------------- 
const handleClose = () => {setShow(false);setselectedbill(null);setErrorMessage("")}
const handleShow = (bill) => {
  setShow(true);
  setselectedbill(bill)
  setBill({
    userId: user._id,
    titleedit: bill.title,
    dueDateedit: bill.dueDate.slice(0,10),
    amountedit: bill.amount,
    toWhomedit: bill.toWhom,
    });
}

// --------------funtion to handle the submitting the edit data --------------------- 
const handleSubmitBill = (e,obj) => {
  e.preventDefault();
  const editBill = async () => {
    try {
      console.log(obj);
      if(Bill.amountedit===''||Bill.dueDateedit===''||Bill.titleedit===''||Bill.toWhomedit===''||Bill.userId===''){
        setErrorMessage("All entries should be filled");
        return;
      }
      const res = await axios.put(`http://localhost:3001/api/bills/editBill/${obj._id}`, {Bill});
      console.log(res.data);
      setBill({
      userId: user._id,
      titleedit: '',
      dueDateedit: '',
      amountedit: '',
      toWhomedit: '',
      });
      setbillflag((prev)=>!(prev))
      setErrorMessage("");
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };
  editBill();
};

// ----------------  handling the delete function -------------------- 
const handleDelete = () => {
  const delBill = async () => {
    try {
      console.log(selecteddue);
      const res = await axios.delete(`http://localhost:3001/api/bills/deleteBill/${selecteddue}`);
      console.log(res.data);
      setbillflag((prev)=>!(prev))
      setShowDeleteModal(false)
    } catch (err) {
      console.log(err);
    }
  };
  delBill();
};

const handleopendeletemodal=(id)=>{
  console.log(id)
  setShowDeleteModal(true)
  setselecteddue(id)
}

const handleCloseDeleteModal=()=>{
  setShowDeleteModal(false)
  setselecteddue(null)
}


return (
  <div style={{backgroundColor:thememode=="dark"?"#181818":"#f0f0f0"}} className='min-h-screen overflow-x-hidden'>
   <Navbar thememode={thememode} toggle={toggle}/> 
    <div className="outer min-h-screen w-full" style={{ backgroundColor: thememode === 'dark' ? '#181818' : '#f0f0f0'}}>
      <div className='font-extrabold text-2xl mx-4 mt-4 dark:text-[#f0f0f0]'>Bills and Dues</div>
      <div className='mx-4 text-gray-600 dark:text-gray-200'>Manage your recurring bills and dues here. Receive reminders through email</div>
      <div className="hero-section h-full">
        <div className="hero-left dark:text-white" style={{ borderColor: thememode === 'dark' ? '#000080' : '#000080',backgroundColor: thememode === 'dark' ? '#2c3034' : 'white'}}>
          <div className="due flex justify-between w-full gap-4 ">
            <label htmlFor="Title" style={{ color: thememode === 'dark' ? 'white' : 'black'}} className='w-[30%]'>Title</label>
            <input
              type="text"
              name="title"
              id=""
              placeholder="Enter title"
              value={dueItem.title}
              onChange={handleBillInput('title')}
              className="w-[70%] p-2 dark:placeholder-white dark:bg-[#3a3a3a]"
              />
          </div>

          <div className="due flex justify-between w-full gap-4">
            <label htmlFor="Date" className='w-[30%]' style={{ color: thememode === 'dark' ? 'white' : 'black'}}>Due date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={dueItem.dueDate}
              onChange={handleBillInput('dueDate')}
              className="w-[70%] p-2 dark:placeholder-white dark:text-white dark:bg-[#3a3a3a] "
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
              className="w-[80%] p-2 dark:placeholder-white dark:bg-[#3a3a3a]"
              
            />
          </div>

          <div className="due flex justify-between w-full gap-4  ">
            <label htmlFor="PersonDue " className='w-[30%]' style={{ color: thememode === 'dark' ? 'white' : 'black'}}>Due To</label> <br />
            <input
              type="text"
              name="toWhom"
              id=""
              value={dueItem.toWhom}
              onChange={handleBillInput('toWhom')}
              placeholder="To whom"
              className="w-[80%] p-2 dark:placeholder-white dark:bg-[#3a3a3a]"
            />
          </div>


          <div className="due flex justify-between w-full gap-4 ">
            <label htmlFor="" className='w-[30%]' style={{ color: thememode === 'dark' ? 'white' : 'black'}}>Currency</label> <br />
            <select
                    name="currency"
                    id="currency"
                    value={dueItem.currency}
                    onChange={handleBillInput('currency')}
                    className="w-[80%] p-2 dark:bg-[#3a3a3a] dark:placeholder-white outline rounded-sm outline-slate-200"
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
            <label htmlFor="recurring" className='w-[30%]' style={{ color: thememode === 'dark' ? 'white' : 'black'}}>Recurring</label>
             <select
              name="recurring"
              id=""
              value={dueItem.recurring}
              onChange={handleBillInput('recurring')}
              className="w-[70%] p-2 dark:bg-[#3a3a3a] outline rounded-sm outline-slate-200"
            >
              <option value="">Select</option>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select> 
          </div>
          {errorMessageAdd && <p className="text-red-500">{errorMessageAdd}</p>}
          <div className="add-btn flex justify-center bg-[#000080] items-center hover:cursor-pointer " onClick={handleSubmit}>
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
                <th>Title</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
            {BillData?.map((bill) => (
              <>
              <tr key = {bill._id}>
              <td>{bill.title}</td>
              <td>&#8377; {bill.amount}</td>
              <td>{bill.dueDate?.substring(0,10)}</td>
              <td>{bill.title}</td>
              <td>
                <div className='flex justify-end w-[80%] gap-4 mr-6'>
                  <AiFillEdit onClick={() => handleShow(bill)} style={{ cursor: 'pointer' }} />
                  <AiFillDelete onClick={() => handleopendeletemodal(bill._id)} style={{ cursor: 'pointer' }} />
                </div>
              </td>
              </tr>
              </>
            ))}
            </tbody>
          </Table>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} animation={false} centered>
        
        <Modal.Header closeButton>
          <Modal.Title className='font-bolder'>Edit Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={(e) => handleSubmitBill(e, sellectedbill)}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-sm">Title</label>
                  <input type="text" className="border border-gray-300 p-2 rounded w-full text-sm" value={titleedit} onChange={handleBill('titleedit')} />
                </div>
                <div>
                  <label className="font-bold text-sm">Due Date</label>
                  <input type="date" className="border border-gray-300 p-2 rounded w-full text-sm" value={dueDateedit} onChange={handleBill('dueDateedit')} />
                </div>
                <div>
                  <label className="font-bold text-sm">Amount</label>
                  <input type="number" className="border border-gray-300 p-2 rounded w-full text-sm" value={amountedit} onChange={handleBill('amountedit')} />
                </div>
                <div>
                  <label className="font-bold text-sm">To Whom</label>
                  <input type="text" className="border border-gray-300 p-2 rounded w-full text-sm" value={toWhomedit} onChange={handleBill('toWhomedit')} />
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
      </div>
    </div>
    </div>
  );
}

export default Dues;