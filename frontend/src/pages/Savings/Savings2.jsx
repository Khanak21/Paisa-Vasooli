import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-bootstrap';
import SavingCard from "../../components/SavingCard";
import axios from "axios";
import Navbar from "../../components/Navbar";
import './Savings.css';

function Savings2({ user,setUser,thememode,toggle}) {
  console.log(thememode);
  const [inputTitle, setInputTitle] = useState("");
  const [currentAmount, setCurrentAmount] = useState();
  const [amount, setAmount] = useState();
  const [items, setItems] = useState([]);
  const [editAmount, setEditAmount] = useState("");
  const [editCurrent, setEditCurrent] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [savingData, setSavingData] = useState([]);


 
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
    const newItem = {
      id: Date.now(),
      title: inputTitle,
      currentAmount: currentAmount,
      goalAmount: amount,
    };
    setItems([...items, newItem]);

    setInputTitle("");
    setCurrentAmount(0);
    setAmount(0);
  };

  const handleEditAmount = (event) => {
    setEditAmount(event.target.value);
  };

  const handleEditCurrent = (event) => {
    setEditCurrent(event.target.value);
  };

  const deleteData = () => {
    setEditAmount("");
    setEditCurrent("");
    setEditItemId(null);
  };

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

  // const openModel = (itemId) => {
  //   setEditItemId(itemId);
  //   setIsVisible(true);
  // };

  const handleAddSaving = async () => {
    try {
      const saving = {
        userId: user._id,
        title: inputTitle,
        currAmt: currentAmount,
        targetAmt: amount,
      };
      const res = await axios.post("http://localhost:3001/api/savings/addSaving", { saving });
      console.log(res.data.saving);
      const val = res.data.saving;
      setSavingData(prev => [...prev, val]);
    } catch (err) {
      console.log(err);
    } 
  };

  useEffect(()=>{
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
  },[user._id])
  return (
    <>
    <Navbar thememode={thememode} toggle={toggle}/>
    <div className="savings-container" style={{ color: thememode === "dark" ? "orange" : "white", backgroundColor: thememode === "dark" ? "rgb(11, 9, 9)" : "green" }}>

      {/* <div className="header flex justify-end items-center" style={{ color: thememode === "dark" ? "orange" : "white", backgroundColor: thememode === "dark" ? "rgb(11, 9, 9)" : "green" }}>
        <div className="toggle p-1" onClick={toggle} >
          Toggle Theme
        </div>
      </div> */}
     
      <div className="main-body" style={{ color: thememode === "dark" ? "orange" : "black", backgroundColor: thememode === "dark" ? "rgb(11, 9, 9)" : "white" }}>
        <div className="main-head" style={{ color: thememode === "dark" ? "orange" : "black" }}>
          <h2>
            <b>Have any financial goals ?</b>
          </h2>
          <p>Track them here</p>
        </div>

        <div className="main-content" style={{ color: thememode === "dark" ? "orange" : "black", backgroundColor: thememode === "dark" ? " #000000" : "white",borderColor:thememode==="dark"?"green":"white"}}>
          <div className="main-left">
            <div className="savings-holder"  >
              <label htmlFor="">Title</label>
              <br />
              <input
                type="text"  
                placeholder="Input the title"
                className="saving-input"
                value={inputTitle}
                onChange={handleInputTitle}
                style={{ color: thememode === "dark" ? "black" : "black"}}
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
                style={{ color: thememode === "dark" ? "black" : "black"}}
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
                style={{ color: thememode === "dark" ? "black" : "black"}}
              />
            </div>

            <div className="savings-holder" onClick={addItem}>
              <Button variant="success" onClick={handleAddSaving} style={{color:thememode==="dark"?"white":"white"}}>
                Add Saving
              </Button>
            </div>
          </div>

          <div className="main-right flex flex-col justify-center items-start gap-5 h-[500px]">
            <div className="overflow-y-scroll w-full mt-2">
            {savingData?.map((sav)=>(
            <SavingCard user = {user} props={sav} setSavingData={setSavingData} savingData={savingData} thememode={thememode} toggle={toggle}/> 
          ))
          }
              {/* {items.map((item) => (
                <SavingCard
                  key={item.id}
                  title={item.title}
                  currentAmount={item.currentAmount}
                  goalAmount={item.goalAmount}
                  className="w-full h-full"
                  props={{thememode:thememode,toggle:toggle}}
                />
              ))} */}
            </div>
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
    </>
  );
}

export default Savings2;
