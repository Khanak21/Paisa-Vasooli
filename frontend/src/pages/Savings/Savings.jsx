import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./Savings.css";
import {Button} from 'react-bootstrap'
import  SavingCard  from "../../components/SavingCard";
import axios from "axios"
import Navbar from "../../components/Navbar"

function Savings({user,thememode,toggle}) {
  console.log(user)
  const [inputTitle, setInputTitle] = useState("");
  const [currentAmount, setCurrentAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [items, setItems] = useState([]);
  const [editAmount, setEditAmount] = useState("");
  const [editCurrent, setEditCurrent] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [savingData,setSavingData] = useState([])
  console.log(inputTitle,amount,currentAmount)
  // console.log(items) 

  const handleInputTitle = (event) => {
    setInputTitle(event.target.value);
  };

  const handleCurrentAmount = (event) => {
    setCurrentAmount(event.target.value);
  };

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  const addItem = () => {
    setInputTitle("");
    setCurrentAmount(0);
    setAmount(0);
  };

  const openModel = (itemId) => {
    setEditItemId(itemId);
    setIsVisible(true);
  };

  const handleAddSaving = async()=>{
    try{
      const saving = {
        userId:user._id,
        title:inputTitle,
        currAmt:currentAmount,
        targetAmt:amount
      }
      console.log(saving)
      const res = await axios.post("http://localhost:3001/api/savings/addSaving",{saving})
      console.log(res.data.saving)
      const val=res.data
      setSavingData(prev=>[...prev,val])
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    const getSavings = async()=>{
      try{
        // console.log("Sending request with data:", transInput);
        const res = await axios.get(`http://localhost:3001/api/savings/getSavings/${user._id}`)//add user Id
        console.log("savings data:",res.data)
        setSavingData(res.data.savings)
      }catch(err){
        console.log(err)
      }
    }
    getSavings()
  },[])

  return (
    <div className="savings-container">
      {/* <div className="header"></div> */}
      <Navbar thememode={thememode} toggle={toggle}/>
      <div className="main-body">
        <div className="main-head">
          <h2>
            <b>Have any financial goals ?</b>
          </h2>
          <p>Track them here</p>
        </div>

        <div className="main-content">
          <div className="main-left">
            <div className="savings-holder">
              <label htmlFor="">Title</label>
              <br />
              <input
                type="text"
                placeholder="Input the title"
                className="saving-input"
                value={inputTitle}
                onChange={handleInputTitle}
              />
            </div>

            <div className="savings-holder">
              <label htmlFor="">Current Amount</label> <br />
              <input
                type="number"
                placeholder="Input the Current Amount"
                className="saving-input"
                value={currentAmount}
                onChange={handleCurrentAmount}
              />
            </div>

            <div className="savings-holder">
              <label htmlFor="">Goal Amount</label> <br />
              <input
                type="number"
                placeholder="Input the Goal Amount"
                className="saving-input"
                value={amount}
                onChange={handleAmount}
              />
            </div>

            <div className="savings-holder" onClick={addItem}>
            <Button variant="success"
                onClick={handleAddSaving}
          >
            Add Saving
          </Button>
            </div>
          </div>

          <div className="main-right">
          {savingData?.map((sav)=>(
            <SavingCard props={sav} setSavingData={setSavingData} savingData={savingData}/> 
          ))
          }

            {items.map((item) => (
              <div className="savings-box" key={item.id}>
                <div className="box-header">
                  <h3>{item.title}</h3>
                </div>
                <div className="box-body">
                  <div className="box-left">
                    <div className="progress">Goal Progress bar</div>
                    <div className="input-range"></div>
                    <div className="current-amt">
                      <p>Current amt: {item.currentAmount}</p>
                    </div>
                  </div>
                  <div className="box-right">
                    <div className="amount-value">
                      Goal Amount: ${item.goalAmount}
                    </div>
                    <div className="edit-btn">
                      <button className="btn" onClick={() => openModel(item.id)}>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {
      isVisible && (
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
              // onChange={handleEditAmount}
            />
          </div>
          <div className="input-amount">
            <label htmlFor="">Current Amount</label>
            <input
              type="number"
              placeholder="Input the current Amount"
              className="input-A"
              value={editCurrent}
              // onChange={handleEditCurrent}
            />
          </div>
          <div className="model-button">
            <div className="model-br">
              {/* <button onClick={handleSubmitEdit}>Submit</button> */}
            </div>
            <div className="model-br">
              <button>Clear</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Savings;
