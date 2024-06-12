// import React, { useState } from 'react';
// import Card from 'react-bootstrap/Card';
// import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
// import Modal from 'react-bootstrap/Modal';
// import axios from 'axios';
// import { Button } from 'react-bootstrap';
// import { AiTwotoneCalendar } from 'react-icons/ai';


// const BillCard = ({ billflag,setbillflag,user,BillData,thememode }) => {

//   const [show, setShow] = useState(false);
//   const [BillInput, setBillInput] = useState({
//     userId: user._id,
//     title: '',
//     dueDate: '',
//     amount: '',
//     toWhom: '',
//     recurring: '',
//   });
  
//   const { title, amount, toWhom, dueDate } = BillInput;
 
//   {/*-----------------function to handle the bill's input8--------*/}
//   const handleBillInput = (name) => (e) => {
//     setBillInput({ ...BillInput, [name]: e.target.value });
//   };

//   // -------------- handling the closing and opening of edit ------------- 
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
 
//   // --------------funtion to handle the submitting the edit data --------------------- 
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const editBill = async () => {
//       try {
//         const res = await axios.put(`http://localhost:3001/api/bills/editBill/${BillData._id}`, { BillInput });
//         console.log(res.data);
//         setBillInput({
//           userId: user._id,
//         title: '',
//         dueDate: '',
//         amount: '',
//         toWhom: '',
//         recurring: '',
//         });
//         setbillflag((prev)=>!(prev))
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     editBill();
//   };
 
//   // ----------------  handling the delete function -------------------- 
//   const handleDelete = (id) => {
//     const delBill = async (id) => {
//       try {
//         const res = await axios.delete(`http://localhost:3001/api/bills/deleteBill/${id}`);
//         console.log(res.data);
//         setbillflag((prev)=>!(prev))
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     delBill(id);
//   };
  
//   //function to track past due payments
//   const paymentTime=()=>{
//     let duedate=new Date(BillData.dueDate)
//     let currDate=new Date();
  
//     return currDate>duedate;
//   };

//   return (
//     // <div>
//       {/* ---------- ----- Card component -------------------  */}
    
//               <tr>
//               <td>{BillData.title}</td>
//               <td>&#8377; {BillData.amount}</td>
//               <td>{BillData.dueDate?.substring(0,10)}</td>
//               <td>
//                 <div className='flex justify-end w-[80%] gap-4 mr-6'>
//                   <AiFillEdit onClick={handleShow} style={{ cursor: 'pointer' }} />
//                   <AiFillDelete onClick={() => handleDelete(BillData._id)} style={{ cursor: 'pointer' }} />
//                 </div>
//               </td>
//               </tr>
      
//       {/* <Card variant="light" border="secondary" className="mx-4 my-4 p-1"  style={{backgroundColor:thememode=="dark" ? "#282828":"",color:thememode=="dark"?"white":"black"}}>

//         <Card.Body>
//           <Card.Text className="rounded-sm bg-green-600" style={{ backgroundColor: 'rgb(157, 122, 253)' }}>Title:-{"  "} {BillData.title}</Card.Text>
          
//           <div className="flex justify-between items-center gap-3 p-2 " style={{color:paymentTime()==true?"red":"green"}}>
//           <div className='flex flex-col justify-center items-start'>

//             <Card.Text className="text-md align-middle items-center "><b>To :-{" "}{BillData.toWhom} </b></Card.Text>
//             <Card.Text className="text-sm align-middle items-center"><b>Amount :-{" " }&#8377; {BillData.amount} </b> </Card.Text>
//             </div>
          
//           <div className='flex flex-col w-[60%] justify-end items-start gap-2 '>
//             <Card.Text className="flex items-center justify-evenly  text-md w-full">
//                <br/>
//              <b>Date:-{" "}  {BillData.dueDate?.substring(0,10)} </b>
//              <AiTwotoneCalendar size={20} />
//   </Card.Text>*/}

//       {/* ---------------    The buttons for edit and delete  ---------------  */}
//           {/* <div className='flex justify-end w-[80%] gap-4 mr-6'>
//             <AiFillEdit onClick={handleShow} style={{ cursor: 'pointer' }} />
//             <AiFillDelete onClick={() => handleDelete(BillData._id)} style={{ cursor: 'pointer' }} />
//           </div>
//           </div>
//           </div>
//         </Card.Body>
//       </Card>  */}

//       {/* ------------Modal component----------------  */}
//       // <Modal show={show} onHide={handleClose} animation={false} centered>
        
//       //   <Modal.Header closeButton>
//       //     <Modal.Title className='font-bolder'>Edit Bill</Modal.Title>
//       //   </Modal.Header>
        
        
//       //   <Modal.Body>
//       //     {/* Add Bill input section */}
//       //     <label htmlFor="amount" className='font-bold'>Amount: </label>
//       //     <input type="number" value={amount} name={'amount'}  onChange={handleBillInput('amount')} required />

//       //     <label htmlFor="person" className='font-bold'>toWhom: </label>
//       //     <input name={'person'} type="text" value={toWhom}  onChange={handleBillInput('toWhom')} required />

//       //     <label htmlFor="title" className='font-bold'>Title:</label>
//       //     <input type="text" name={'title'} value={title} onChange={handleBillInput('title')} required />

//       //     <label htmlFor="date" className='font-bold'>Date:</label>
//       //     <input type="date" name={'dueDate'} value={dueDate} onChange={handleBillInput('dueDate')} required />
//       //   </Modal.Body>

//       //   <Modal.Footer>
//       //     <button className="bg-[#8656cd] text-white p-2 rounded-md" onClick={handleSubmit} required>
//       //       Save
//       //     </button>
//       //   </Modal.Footer>
        
//       // </Modal>
//     // </div>
//   );
// };

// export default BillCard;
import React, { useState } from 'react';
// import Card from 'react-bootstrap/Card';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
// import Modal from 'react-bootstrap/Modal';
import axios from 'axios'; 
// import { Button } from 'react-bootstrap';
// import { AiTwotoneCalendar } from 'react-icons/ai';


const BillCard = ({ billflag,setbillflag,user,BillData,thememode }) => {

  // eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState(false);
  // const [BillInput, setBillInput] = useState({
  //   userId: user._id,
  //   title: '',
  //   dueDate: '',
  //   amount: '',
  //   toWhom: '',
  //   recurring: '',
  // });
  
  // const { title, amount, toWhom, dueDate } = BillInput;
 
  // eslint-disable-next-line no-lone-blocks
  {/*-----------------function to handle the bill's input8--------*/}
  // const handleBillInput = (name) => (e) => {
  //   setBillInput({ ...BillInput, [name]: e.target.value });
  // };

  // -------------- handling the closing and opening of edit ------------- 
  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  // --------------funtion to handle the submitting the edit data --------------------- 
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const editBill = async () => {
  //     try {
  //       const res = await axios.put(`http://localhost:3001/api/bills/editBill/${BillData._id}`, { BillInput });
  //       console.log(res.data);
  //       setBillInput({
  //       userId: user._id,
  //       title: '',
  //       dueDate: '',
  //       amount: '',
  //       toWhom: '',
  //       recurring: '',
  //       });
  //       setbillflag((prev)=>!(prev))
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   editBill();
  // };
 
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
  // const paymentTime=()=>{
  //   let duedate=new Date(BillData.dueDate)
  //   let currDate=new Date();
  
  //   return currDate>duedate;
  // };

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
