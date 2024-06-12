import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
// import { Button } from 'react-bootstrap';
// import SavingCard from "../../components/Cards/SavingCard";
import axios from "axios";
import Navbar from '../../components/Navbar'
import './Savings.css';
import Table from 'react-bootstrap/Table';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';

function Savings2({ user,setUser,thememode,toggle}) {
  console.log(thememode);
  const [inputTitle, setInputTitle] = useState("");
  const [currentAmount, setCurrentAmount] = useState();
  const [amount, setAmount] = useState();
  const [items, setItems] = useState([]);
  const [Currency,setCurrency]=useState('inr');
  const [editAmount, setEditAmount] = useState("");
  const [editCurrent, setEditCurrent] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [savingData, setSavingData] = useState([]);
  const [updateFlag,setUpdateFlag] =useState(false)

 //function to handle savings input

 const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

 const handleInputTitle = (event) => {
  const capitalizedTitle = capitalizeFirstLetter(event.target.value);
  setInputTitle(capitalizedTitle);
};

  const handleCurrentAmount = (event) => {
    setCurrentAmount(event.target.value);
  };

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleCurrency = (event) =>{
    setCurrency(event.target.value)
  }

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      title: inputTitle,
      currentAmount: currentAmount,
      goalAmount: amount,
    };
    setItems([...items, newItem]);
    setInputTitle("");
    setCurrentAmount();
    setAmount();
  };

  //function to edit details
  const handleEditAmount = (event) => {
    setEditAmount(event.target.value);
  };

  const handleEditCurrent = (event) => {
    setEditCurrent(event.target.value);
  };

  //function to delete data
  const deleteData = () => {
    setEditAmount("");
    setEditCurrent("");
    setEditItemId(null);
  };

  //function to handle submit
  const handleSubmitEdit = () => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === editItemId
          ? {
              ...item,
              currentAmount: parseFloat(editCurrent),
              goalAmount: parseFloat(editAmount),
            }
          : item
      )
    );
    deleteData();
    setIsVisible(false);
  };
  const[show,setShow] =useState(false);
  const [sellectedsav,setselectedsav] = useState(null);
  const [sav,setsav]=useState({
    userId:user._id,
    targetAmt:'',
    currAmt:'',
    currency:'',
    title:''
  })
  const handleSaving = (name) => (e) => {
    if(name==='title'){
      const capitalizedTitle = capitalizeFirstLetter(e.target.value);
      setsav({ ...sav, [name]: capitalizedTitle });
    }
    else{
      setsav({ ...sav, [name]: e.target.value });
    }
  };

  const [errorMessage,setErrorMessage]= useState("");
  const handleClose = () => {setShow(false);setselectedsav(null);setErrorMessage("")}
  const handleShow = (sav) => {
  setShow(true);
  setselectedsav(sav)
  setsav({
    userId: user._id,
    targetAmt:sav.targetAmt,
    currAmt:sav.currAmt,
    title:sav.title,
    });
  }
  const handlesavedit = (e,obj) => {
    e.preventDefault();
    const editSavings = async () => {
      try {
        if(sav.userId===''||sav.currAmt===''||sav.currency===''||sav.targetAmt===''||sav.title===''){
          setErrorMessage("All entries should be filled");
          return;
        }
        const res = await axios.put(`http://localhost:3001/api/savings/editSaving/${obj._id}`, {sav});
        console.log(res.data);
        setsav({
          userId: user._id,
          title: '',
          currAmt: '',
          targetAmt: '',
        });
        setUpdateFlag(prev=>!prev)
        setErrorMessage('');
        handleClose()
      } catch (err) {
        console.log(err);
      }
    };
    editSavings();
  };

  const UCurrency=(currency)=>{
    const [data, setData] = useState({})
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=LQvy3LtRMZSLNj7WvwKX3tPoA37h6FdzWNaLbw4f&currencies=INR%2CMXN%2CSEK%2CCHF%2CSGD%2CHKD%2CCNY%2CCAD%2CAUD%2CJPY%2CGBP%2CEUR%2CUSD%2CCAD&base_currency=INR`);
          const result = await response.json();
          setData(result.data);
          console.log(result.data);
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
// eslint-disable-next-line no-unused-vars
const [currenci, setCurrenci] = useState('inr');
const currenciData = UCurrency(currenci);

  //function to add saving
  const handleAddSaving = async (e) => {
    try {
      const saving = {
        userId: user._id,
        title: inputTitle,
        currAmt: currentAmount,
        targetAmt: amount,
        Currency:Currency
      };
      console.log(saving)
      e.preventDefault()
      console.log('Currency data:', currenciData);
      const currencysmall = Currency.toUpperCase();
      console.log(currenciData[currencysmall]);
      console.log(saving.currAmt)
      saving.currAmt =Math.floor(saving.currAmt / currenciData[currencysmall]);
      console.log(saving.currAmt)
      saving.targetAmt =Math.floor(saving.targetAmt / currenciData[currencysmall]);
      console.log(saving.targetAmt)
      const res = await axios.post("http://localhost:3001/api/savings/addSaving", { saving });
      console.log(res.data.saving);
      const val = res.data.saving;
      setSavingData(prev => [...prev, val]);
      setInputTitle("");
      setCurrentAmount("");
      setAmount("");
    } catch (err) {
      console.log(err);
    } 
  };
// adding saving badge
  const savingbadge = 'JLLAW.png';
  const addBadge=async(img)=>{
    try{
      console.log(img)
      const res = await axios.post(`http://localhost:3001/api/user/addbadge/${user._id}`,{img})
      console.log(res.data.user)
    }catch(err){
      console.log(err.response.data)
    }
  }

  useEffect(()=>{
    //function to retrieve user data from local storage
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

    //function to fetch savings data
    const getSavings = async()=>{
      try{
        const res = await axios.get(`http://localhost:3001/api/savings/getSavings/${user._id}`)//add user Id
        console.log("savings data:",res.data)
        setSavingData(res.data.savings)
        const numberOfSavings = res.data.savings.filter(saving => saving.currAmt >= saving.targetAmt).length;
        console.log(numberOfSavings);
        if(numberOfSavings===5){
          addBadge(savingbadge)
        }
      }catch(err){
        console.log(err)
      }
    }
    getSavings()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user._id,updateFlag,setUser])

  const handleDelete = (id) => {
  const delsaving = async(id)=>{
    try{
        const res=await axios.delete(`http://localhost:3001/api/savings/deleteSaving/${id}`)
        console.log(res.data)
        setUpdateFlag((prev)=>!(prev))

    }catch(err){
        console.log(err)
    }
}
delsaving(id);

  }

  return (
    <div className="min-h-screen"  style={{ color: thememode === "dark" ? "white" : "white",backgroundColor:thememode==="dark"?"#181818":"#f0f0f0" }}>

    <Navbar thememode={thememode} toggle={toggle}/>
    <div className="savings-container" style={{ color: thememode === "dark" ? "white" : "black",backgroundColor:thememode==="dark"?"#181818":"#f0f0f0" }}>
       <div className='font-extrabold text-2xl mx-4 mt-4 decoration-[#000080] dark:text-[#f0f0f0]'>Savings Tracker</div>
      <div className='m-4 text-gray-600 dark:text-gray-400'>Have any financial goals? Track them here!</div>
     
      <div className="main-body" style={{ color: thememode === "dark" ? "white" : "black"}}>
        <div className="main-content p-1" style={{
          color: thememode === "dark" ? "white" : "black",
          backgroundColor: thememode === "dark" ? "#282828" : "#E5E4E2",
          borderRadius: thememode==="dark" ? "20px" : "20px"
          }}
        >
          <div className="main-left">
            <div className="savings-holder"  >
              <label htmlFor="">Title</label>
              <br />
              <input
                type="text"  
                placeholder="Input the title"
                className="saving-input border-none"
                value={inputTitle}
                onChange={handleInputTitle}
                style={{ color: thememode === "dark" ? "black" : "black",backgroundColor:thememode==="dark"?"#3a3a3a":"white" }}
                  />
            </div>

            <div className="savings-holder">
              <label htmlFor="">Current Amount</label> <br />
              <input
                type="number"
                placeholder="Input the Current Amount"
                className="saving-input border-none"
                value={currentAmount}
                onChange={handleCurrentAmount}
                style={{ color: thememode === "dark" ? "black" : "black",backgroundColor:thememode==="dark"?"#3a3a3a":"white" }}
              />
            </div>

            <div className="savings-holder">
              <label htmlFor="">Goal Amount</label> <br />
              <input
                type="number"
                placeholder="Input the Goal Amount"
                className="saving-input border-none"
                value={amount}
                onChange={handleAmount}
                style={{ color: thememode === "dark" ? "black" : "black",backgroundColor:thememode==="dark"?"#3a3a3a":"white" }}
              />
            </div>

            <div className="savings-holder">
              <label htmlFor="">Currency</label> <br />
              <select
                    name="currency"
                    id="currency"
                    value={Currency}
                    onChange={handleCurrency}
                    className="p-2 border-1 rounded-md"
                    style={{ color: thememode === "dark" ? "white" : "black",backgroundColor:thememode==="dark"?"#3a3a3a":"white" }}
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

            <div className="savings-holder" onClick={addItem}>
              <button className="rounded-md p-1 text-white w-full bg-[#000080]" onClick={handleAddSaving}>
                Add Saving
              </button>
            </div>
          </div>
          
          {/* Saving Cards list */}
          <div className="hero-right h-full mt-10">
        <div className="storing-savings">
          <div className="overflow-y-scroll w-full max-h-[500px]">
          <Table striped borderless hover variant={thememode === 'dark' ? 'dark' : ''}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Current Amount</th>
                <th>Goal Amount</th>
                <th>Completion(%)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {savingData?.map((sav)=>(
              <>
              <tr key = {sav._id}>
              <td>{sav.title}</td>
              <td>&#8377; {sav.currAmt}</td>
              <td>&#8377; {sav.targetAmt}</td>
              <td>{Math.min((sav.currAmt / sav.targetAmt) * 100, 100)} %</td>
              <td>
                <div className='flex justify-end w-[80%] gap-4 mr-6'>
                  <AiFillEdit onClick={() => handleShow(sav)} style={{ cursor: 'pointer' }} />
                  <AiFillDelete onClick={() => handleDelete(sav._id)} style={{ cursor: 'pointer' }} />
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
          <Modal.Title className='font-bolder'>Edit Saving</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={(e) => handlesavedit(e, sellectedsav)}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-sm">Title</label>
                  <input type="text" className="border border-gray-300 p-2 rounded w-full text-sm" value={sav.title} onChange={handleSaving('title')} />
                </div>
                <div>
                  <label className="font-bold text-sm">Current Amount</label>
                  <input type="date" className="border border-gray-300 p-2 rounded w-full text-sm" value={sav.currAmt} onChange={handleSaving('currAmt')} />
                </div>
                <div>
                  <label className="font-bold text-sm">Target Amount</label>
                  <input type="number" className="border border-gray-300 p-2 rounded w-full text-sm" value={sav.targetAmt} onChange={handleSaving('targetAmt')} />
                </div>
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <button type="submit" className="mt-4 bg-[#000080] text-white py-2 px-4 rounded">Save Changes</button>
            </form>
        </Modal.Body>
      </Modal>
          </div>
        </div>
      </div>

      {isVisible && (
        <div className="model visible">
          <div className="cross">
            <FontAwesomeIcon icon={faMinus} className="minus" />
          </div>
          <div className="input-amount">
            <label htmlFor="">Goal</label>
            <input
              type="number"
              placeholder="Input the new Goal"
              className="input-A"
              value={editAmount}
              onChange={handleEditAmount}
            />
          </div>
          <div className="input-amount">
            <label htmlFor="">Current Amount</label>
            <input
              type="number"
              placeholder="Input the current Amount"
              className="input-A"
              value={editCurrent}
              onChange={handleEditCurrent}
            />
          </div>
          <div className="model-button">
            <div className="model-br">
              <button onClick={handleSubmitEdit}>Submit</button>
            </div>
            <div className="model-br">
              <button onClick={deleteData}>Clear</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default Savings2;
