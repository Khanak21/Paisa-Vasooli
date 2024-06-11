import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Dues.css';
import axios from 'axios';
// import BillCard from '../../components/Cards/BillCard.jsx';
import Navbar from '../../components/Navbar.jsx';
// import ToggleBtn from '../../components/Navbar/ToggleBtn.jsx';
import Table from 'react-bootstrap/Table';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';

function Dues({ user, thememode, toggle, setUser }) {
  // eslint-disable-next-line no-unused-vars
  const [billflag, setbillflag] = useState(false);
  const [dueItem, setdueItem] = useState({
    userId: user._id,
    title: '',
    dueDate: '',
    amount: '',
    toWhom: '',
    recurring: 'daily',
    currency: 'inr'
  });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // const [filterInput, setFilterInput] = useState({
  //   userId: user._id,
  //   category: '',
  //   startDate: '',
  //   endDate: '',
  // });

  // const [deleteDiv, setdeleteDiv] = useState(false);
  const [BillData, setBillData] = useState([]);
  const [errorMessageAdd, setErrorMessageAdd] = useState("");
  const toast = useToast();

  const handleBillInput = (name) => (e) => {
    if (name === 'title' || name === 'toWhom') {
      const capitalizedTitle = capitalizeFirstLetter(e.target.value);
      setdueItem({ ...dueItem, [name]: capitalizedTitle });
    } else {
      setdueItem({ ...dueItem, [name]: e.target.value });
    }
  };

  // const handleFilterInput = (name) => (e) => {
  //   setFilterInput({ ...filterInput, [name]: e.target.value });
  // };

  const mailsendstart = async () => {
    try {
      const reqmail = user.email;
      // eslint-disable-next-line no-unused-vars
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
      const recurring = dueItem.recurring;
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post('http://localhost:3001/api/mail/sendmailrecurring', { reqmail, duedate, recurring });
      alert('Message Sent Successfully');
    } catch (err) {
      console.error('Error sending recurring mail:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currencysmall = dueItem.currency.toUpperCase();
    dueItem.amount = Math.floor(dueItem.amount / currenciData[currencysmall]);

    if (!dueItem.amount || !dueItem.currency || !dueItem.dueDate || !dueItem.recurring || !dueItem.title || !dueItem.toWhom || !dueItem.userId) {
      toast({
        title: 'Validation Error',
        description: 'All fields are required.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setErrorMessageAdd("All entries should be filled");
      return;
    }

    if (isNaN(dueItem.amount) || dueItem.amount <= 0) {
      toast({
        title: 'Validation Error',
        description: 'Amount must be a positive number.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setErrorMessageAdd("Amount must be a positive number.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/api/bills/addBill', { dueItem });
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
        currency: 'inr'
      });
      setErrorMessageAdd("");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    const check = async () => {
      try {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          await setUser(foundUser);
        }
      } catch (err) {
        console.log(err);
      }
    };
    check();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/bills/getBills/${user._id}`);
        setBillData(res.data.bill);
      } catch (err) {
        console.log(err);
      }
    };
    getBills();
  }, [billflag,user._id]);

  const UCurrency = (currency) => {
    const [data, setData] = useState({});
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
    return data;
  };

  // eslint-disable-next-line no-unused-vars
  const [currenci, setCurrenci] = useState('inr');
  const currenciData = UCurrency(currenci);

  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const [sellectedbill, setselectedbill] = useState(null);
  const [Bill, setBill] = useState({
    userId: user._id,
    titleedit: '',
    dueDateedit: '',
    amountedit: '',
    toWhomedit: '',
  });

  const { titleedit, amountedit, toWhomedit, dueDateedit } = Bill;

  const handleBill = (name) => (e) => {
    if (name === 'titleedit' || name === 'toWhomedit') {
      const capitalizedTitle = capitalizeFirstLetter(e.target.value);
      setBill({ ...Bill, [name]: capitalizedTitle });
    } else {
      setBill({ ...Bill, [name]: e.target.value });
    }
  };

  const handleClose = () => { setShow(false); setselectedbill(null); setErrorMessage("") };
  const handleShow = (bill) => {
    setShow(true);
    setselectedbill(bill);
    setBill({
      userId: user._id,
      titleedit: bill.title,
      dueDateedit: bill.dueDate.slice(0, 10),
      amountedit: bill.amount,
      toWhomedit: bill.toWhom,
    });
  };

  const handleSubmitBill = (e, obj) => {
    e.preventDefault();
    const editBill = async () => {
      try {
        if (!Bill.amountedit || !Bill.dueDateedit || !Bill.titleedit || !Bill.toWhomedit || !Bill.userId) {
          toast({
            title: 'Validation Error',
            description: 'All fields are required.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          setErrorMessage("All entries should be filled");
          return;
        }

        if (isNaN(Bill.amountedit) || Bill.amountedit <= 0) {
          toast({
            title: 'Validation Error',
            description: 'Amount must be a positive number.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          setErrorMessage("Amount must be a positive number.");
          return;
        }

        const res = await axios.put(`http://localhost:3001/api/bills/updateBill/${obj._id}`, {
          title: titleedit,
          amount: amountedit,
          toWhom: toWhomedit,
          dueDate: dueDateedit,
        });
        console.log(res.data);
        setBillData((prevBillData) =>
          prevBillData.map((bill) =>
            bill._id === obj._id
              ? {
                ...bill,
                title: titleedit,
                amount: amountedit,
                toWhom: toWhomedit,
                dueDate: dueDateedit,
              }
              : bill
          )
        );
        setShow(false);
        setselectedbill(null);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    editBill();
  };

  const deleteBill = async (billId) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.delete(`http://localhost:3001/api/bills/deleteBill/${billId}`);
      const updatedBillData = BillData.filter(bill => bill._id !== billId);
      setBillData(updatedBillData);
    } catch (err) {
      console.error('Error deleting bill:', err);
    }
  };

  return (
    <>
      <Navbar user={user} thememode={thememode} toggle={toggle} />
      <div className={thememode ? 'dues-body-dark' : 'dues-body'}>
        <div className="content-title">Dues</div>
        <form className={thememode ? 'add-bill-form-dark' : 'add-bill-form'} onSubmit={handleSubmit}>
          <input
            className={thememode ? 'add-bill-input-dark' : 'add-bill-input'}
            type="text"
            placeholder="Title"
            value={dueItem.title}
            onChange={handleBillInput('title')}
            required
          />
          <input
            className={thememode ? 'add-bill-input-dark' : 'add-bill-input'}
            type="date"
            value={dueItem.dueDate}
            onChange={handleBillInput('dueDate')}
            required
          />
          <input
            className={thememode ? 'add-bill-input-dark' : 'add-bill-input'}
            type="number"
            placeholder="Amount"
            value={dueItem.amount}
            onChange={handleBillInput('amount')}
            required
          />
          <input
            className={thememode ? 'add-bill-input-dark' : 'add-bill-input'}
            type="text"
            placeholder="To Whom"
            value={dueItem.toWhom}
            onChange={handleBillInput('toWhom')}
            required
          />
          <select
            className={thememode ? 'add-bill-select-dark' : 'add-bill-select'}
            value={dueItem.recurring}
            onChange={handleBillInput('recurring')}
            required
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <select
            className={thememode ? 'add-bill-select-dark' : 'add-bill-select'}
            value={dueItem.currency}
            onChange={handleBillInput('currency')}
            required
          >
            <option value="inr">INR</option>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            {/* Add more currencies as needed */}
          </select>
          <button type="submit" className={thememode ? 'add-bill-button-dark' : 'add-bill-button'}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          {errorMessageAdd && <div className="error-message">{errorMessageAdd}</div>}
        </form>
        <Table striped bordered hover variant={thememode ? 'dark' : 'light'} className="bill-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>To Whom</th>
              <th>Recurring</th>
              <th>Currency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {BillData.map((bill) => (
              <tr key={bill._id}>
                <td>{bill.title}</td>
                <td>{bill.dueDate.slice(0, 10)}</td>
                <td>{bill.amount}</td>
                <td>{bill.toWhom}</td>
                <td>{bill.recurring}</td>
                <td>{bill.currency}</td>
                <td>
                  <AiFillEdit onClick={() => handleShow(bill)} className="action-icon" />
                  <AiFillDelete onClick={() => deleteBill(bill._id)} className="action-icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => handleSubmitBill(e, sellectedbill)}>
            <input
              className={thememode ? 'edit-bill-input-dark' : 'edit-bill-input'}
              type="text"
              placeholder="Title"
              value={Bill.titleedit}
              onChange={handleBill('titleedit')}
              required
            />
            <input
              className={thememode ? 'edit-bill-input-dark' : 'edit-bill-input'}
              type="date"
              value={Bill.dueDateedit}
              onChange={handleBill('dueDateedit')}
              required
            />
            <input
              className={thememode ? 'edit-bill-input-dark' : 'edit-bill-input'}
              type="number"
              placeholder="Amount"
              value={Bill.amountedit}
              onChange={handleBill('amountedit')}
              required
            />
            <input
              className={thememode ? 'edit-bill-input-dark' : 'edit-bill-input'}
              type="text"
              placeholder="To Whom"
              value={Bill.toWhomedit}
              onChange={handleBill('toWhomedit')}
              required
            />
            <button type="submit" className={thememode ? 'edit-bill-button-dark' : 'edit-bill-button'}>
              Save Changes
            </button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Dues;
