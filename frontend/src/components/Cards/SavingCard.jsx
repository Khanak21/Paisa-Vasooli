import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const SavingCard = ({user,props,savingData,setSavingData,items,thememode,toggle}) => {
  console.log()
  const [show, setShow] = useState(false);
  const [flag,setflag] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
console.log(props._id)
const percentage=Math.round((props.currAmt*100/props.targetAmt) * 100) / 100
console.log(percentage)
const [SavingInput, setSavingInput] = useState({
  userId: user._id,
  title: '',
  currAmt: '',
  targetAmt: '',
});
console.log(savingData)
const { title, currAmt, targetAmt } = SavingInput;

const handleSavingInput = (name) => (e) => {
  setSavingInput({ ...SavingInput, [name]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  const editSavings = async () => {
    try {
      const res = await axios.put(`http://localhost:3001/api/savings/editSaving/${props._id}`, { SavingInput });
      console.log(res.data);
      setSavingInput({
        userId: user._id,
        title: '',
        currAmt: '',
        targetAmt: '',
      });
      setflag((prev)=>!(prev))
    } catch (err) {
      console.log(err);
    }
  };
  editSavings();
};

const handleDelete = async()=>{
    try{
        const res=await axios.delete(`http://localhost:3001/api/savings/deleteSaving/${props._id}`)
        console.log(res.data.saving)
        const sav=res.data.saving
        setSavingData(savingData.filter(data=>data._id!=sav._id))

    }catch(err){
        console.log(err)
    }
}
  // Add your state variables here
  // const [type, setType] = useState('');
  // const [amount, setAmount] = useState('');
  // ...

  // Add your state update functions here
  // const handleTransInput = (fieldName) => (event) => {
  //   // Update state based on the field name
  // };

  // const handleSubmit = () => {
  //   // Handle form submission
  // };

  return (
    
    <div className='flex flex-col justify-center items-start gap-8 w-full p-1 h-[300px]' style={{backgroundColor:thememode=="dark"?"":"white",color:thememode=="dark"?"white":"black",}}>
    
      <Card variant="light" border="secondary" className="w-full flex flex-col gap-3  rounded-lg border-2 h-40 p-1 " style={{backgroundColor:thememode=="dark"?"#3a3a3a":"white",border: thememode === "dark" ? "3px solid white" : "1px solid black",color: thememode=="dark"?"white":"black"}}>


        <Card.Header className=' font-semibold text-center text-lg flex justify-evenly bg-[#8656cd] '>Title{" "}- <div>
         {props.title}</div></Card.Header>


        <Card.Body>
          <div className="flex justify-between gap-3 align-middle items-center p-3 w-full">
            <div className="flex flex-col gap-5 justify-between align-middle items-center w-5/10">
              <div className="w-full">
              <div>Complete (success) </div>
                <div
                  className="text-sm h-5 w-full bg-[#8656cd] rounded-lg text-white p-2 flex justify-center items-center"
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  // style={{ width: `${percentage}%`}}
                  style={{ backgroundColor: 'rgb(157, 122, 253)',width: `${percentage}%`}}
                >
                  
                </div>
                <div> {percentage}% </div>
              </div>
              <Card.Text className="align-middle items-center my-1 text-sm">Current Amount:{props.currAmt}</Card.Text>
            </div>

            <div className="flex flex-col gap-4 align-middle items-center justify-between  w-5/10 h-full">
              <Card.Text className="text-md align-middle items-center my-1">Goal Amount:{props.targetAmt}</Card.Text>
              <div className="flex justify-between w-full items-center">
                <AiFillEdit onClick={handleShow} style={{ cursor: 'pointer' }} />
                <AiFillDelete onClick={()=>{handleDelete()}} style={{"cursor":"pointer"}}/>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <label htmlFor="title">Title:</label>
          <input type="text" name={'title'} defaultValue={props.title} onChange={handleSavingInput('title')} required />
          <label htmlFor="person">currAmt: </label>
          <input name={'currAmt'} type="text" value={currAmt} onChange={handleSavingInput('currAmt')} required />
          <label htmlFor="targetAmt">targetAmt:</label>
          <input type="text" name={'targetAmt'} value={targetAmt} onChange={handleSavingInput('targetAmt')} required />
        </Modal.Body>
        <Modal.Footer>
          <button className="bg-[#8656cd] text-white p-2 rounded-md" onClick={handleSubmit}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  
  );
};

export default SavingCard;
