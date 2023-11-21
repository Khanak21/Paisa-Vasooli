import React, { useEffect, useState } from 'react';
import axios from "axios"
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';

const SimplifyDebt = ({user,thememode,toggle}) => {
    console.log(user)
    const {id} = useParams()
  const [inputFields, setInputFields] = useState([]);
  const [data,setData] = useState([])
  const [commentflag,setcommentflag] = useState(false);
  console.log(inputFields)
  console.log(data)
  const [membersdata,setmembersdata]=useState([])

  const handleInputChange = (index, fieldName, value) => {
    const updatedInputFields = [...inputFields];
    updatedInputFields[index][fieldName] = value;
    setInputFields(updatedInputFields);
  };

  const handleAddField = () => {
    setInputFields([...inputFields, { paidBy: '', paidFor: '', amount: '' }]);
  };

  const handleRemoveField = (index) => {
    const updatedInputFields = [...inputFields];
    updatedInputFields.splice(index, 1);
    setInputFields(updatedInputFields);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputFields);
    
      const resultMap = inputFields.reduce((result, item) => {
        const key = item.paidBy;
      
        if (result[key]) {
          if (result[key].paidFor[item.paidFor]) {
            result[key].paidFor[item.paidFor] += parseInt(item.amount, 10);
          } else {
            result[key].paidFor[item.paidFor] = parseInt(item.amount, 10);
          }
        } else {
          result[key] = {
            paidBy: item.paidBy,
            paidFor: { [item.paidFor]: parseInt(item.amount, 10) },
          };
        }
      
        return result;
      }, {});
      
      const outputArray = Object.values(resultMap);
      
      const simplify = async()=>{
        try{
          const res = await axios.post(`http://localhost:3001/api/group/simplifyDebt/${id}`,{outputArray})
          console.log(res.data)
          const val=res.data
          setData(res.data)
        }catch(err){
          console.log(err)
        }
      }
      simplify()
      
  };
  useEffect(()=>{
     const getdebts = async()=>{
        try{
            const res = await axios.get(`http://localhost:3001/api/group/getDebts/${id}`)
            console.log(res.data)
            if(res.data)setData(res.data)
          }catch(err){
            console.log(err)
          }
     }
     getdebts()
  },[])

  const [commentText, setCommentText] = useState('');

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleAddComment = async () => {
      try {
          const res = await axios.post(`http://localhost:3001/api/group/addcomment`, {
                  userId: user._id, 
                  text:commentText,
                  groupId:id,
                  username:user.username
          });
          console.log(res.data)
          // socket.emit('comment', {
          //   userId: user._id,
          //   text: commentText,
          //   groupId: id,
          //   username: user.username,
          // });
          setCommentText('')
          setcommentflag((prev)=>!(prev))
      } catch (err) {
          console.log(err);
      }
  };
  const [comments, setComments] = useState([]);
  const getcomments = async()=>{
    try {
      const response = await axios.get(`http://localhost:3001/api/group/getcomments/${id}`);
      setComments(response.data.commentss);
      console.log(comments)
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }
  useEffect(()=>{
    getcomments()
  },[commentflag,comments.length])
  // useEffect(()=>{
  //   getcomments()
  // },[comments.length])

  // useEffect(() => {
  //   // Listen for incoming comments from the server
  //   socket.on('comment', (data) => {
  //     setComments((prevComments) => [...prevComments, data]);
  //   });

  //   return () => {
  //     // Clean up the socket connection when the component unmounts
  //     socket.disconnect();
  //   };
  // }, [socket]);

  useEffect(()=>{
    const getMembers = async()=>{
      try{
        const res = await axios.get(`http://localhost:3001/api/group/getmembers/${id}`)//add user Id
        console.log(res.data)
        setmembersdata(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getMembers()
  },[])

  const Dropdown = ({ options, value, onChange }) => (
    <select value={value} onChange={onChange} className="w-80 m-4 p-2 border border-gray-300 rounded-md" disabled={options.length <= 1}>
      <option value="" disabled>Select members</option>
      {options.map((option, index) => (
        <option key={index} value={option.username}>
          {option.username}
        </option>
      ))}
    </select>
  );

  return (
    <div className='w-screen h-screen' style={{backgroundColor:thememode=="dark"?"rgb(85, 98, 106)":"white"}}>
        <Navbar thememode={thememode} toggle={toggle}/>
        <div className='w-full flex justify-center bg-amber-500 text-black font-bold'>
                {console.log(id)}
               {membersdata?.map(data=>(
                <div>Group Members :- {" "}{data.username}{" "}</div>
                ))}
           </div>
        <div className='text-4xl m-4 w-full flex justify-center' style={{color:thememode=="dark"?"white":"black"}}>Simplify your debts!</div>
        <form onSubmit={handleSubmit}  className=' p-3 mx-auto flex flex-col gap-3 justify-center'>
          {inputFields.map((field, index) => (
          <div className='flex justify-center gap-3 w-[40%] mx-auto rounded-lg' style={{border:thememode=="dark"?"2px solid white":"1px solid black"}}>
            <div key={index} className='gap-3'>
             <div>
              <label htmlFor={`paidBy-${index}`}>Paid By</label>
              <Dropdown
                options={membersdata}
                value={field.paidBy}
                onChange={(e) => handleInputChange(index, 'paidBy', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={`paidFor-${index}`}>Paid To</label>
              <Dropdown
                options={membersdata}
                value={field.paidFor}
                onChange={(e) => handleInputChange(index, 'paidFor', e.target.value)}
              />
            </div>
            <input
              type="number"
              value={field.amount}
              onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
              placeholder="Amount"
              className='w-80 m-4'

            />
            <button type="button" className='bg-[#198754] p-2 rounded-md text-white m-2' onClick={() => handleRemoveField(index)}>
              Remove
            </button>
</div>
          </div>
        ))}
        
      </form>
     <div className='flex w-full justify-center'> <button type="button" onClick={handleAddField} className='bg-[#198754] p-2 rounded-md text-white w-60 m-4'>
          Add Field
        </button>
      
        <div>
          <button type="submit" className='bg-[#198754] w-60 p-2 rounded-md text-white m-4 ' onClick={handleSubmit}>Simplify</button></div></div>

      {
        data?.map(debt=>(
            <div className='flex items-center bg-gray-100 rounded-2xl justify-between p-2 mx-auto w-[60%]'>
                 <div className='w-[30%]'><h4>Statement:-</h4></div>
                <div className='w-[60%] text-2xl flex align-middle p-3'>{debt[0]}{" "} owes {debt[1]} {" "}&#x20B9;{debt[2]}</div>

                {user.username==debt[1] && <button onClick={async()=>{
                     try{
                        const res = await axios.post(`http://localhost:3001/api/group/approveDebt/${id}`,debt)
                        setData(res.data.simplifyDebt)
                        console.log(res.data)
                    }catch(err){
                        console.log(err)
                    }
                }}
                className='bg-[#198754] p-2 rounded-md text-white m-2'
                >{debt[3] ===true ? "Approved" : "Approve"}</button>}
                {user.username==debt[0] && debt[3]==true && <div>Approved by {debt[1]}✅</div>}
            </div>
        ))
      }

              <label htmlFor="commentText">Add Comment:</label>
                <input
                    type="text"
                    id="commentText"
                    value={commentText}
                    onChange={handleCommentChange}
                    placeholder="Type your comment here"
                    className="w-80 m-4 p-2 border border-gray-300 rounded-md"
                />
                <button onClick={handleAddComment} className="bg-[#198754] p-2 rounded-md text-white m-2">
                    Add Comment
                </button>

                <div className="m-4">
        <h3>Comments:</h3>
        {comments.map((comment) => (
          <div key={comment._id} className="border p-2 my-2 rounded-md">
            <p>{comment.text}</p>
            <p>By: {comment.username === user.username ? 'You' : comment.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimplifyDebt;