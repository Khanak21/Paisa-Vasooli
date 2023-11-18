import React, { useEffect, useState } from 'react';
import axios from "axios"
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';

const SimplifyDebt = ({user}) => {
    console.log(user)
    const {id} = useParams()
  const [inputFields, setInputFields] = useState([]);
  const [data,setData] = useState([])
  console.log(inputFields)
  console.log(data)

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

    //   const a = async()=>{
    //     try{
    //         const res = await axios.post(`http://localhost:3001/api/group/approveDebt/${id}`,data)
    //         console.log(res.data)


    //     }catch(err){
    //         console.log(err)
    //     }
    //   }
      
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

  return (
    <div>
        <Navbar/>
        <div className='text-4xl m-4 w-full flex justify-center'>Simplify your debts!</div>
   <form onSubmit={handleSubmit}>
        {inputFields.map((field, index) => (
          <div className='flex justify-center'><div key={index}>
            <input
              type="text"
              value={field.paidBy}
              onChange={(e) => handleInputChange(index, 'paidBy', e.target.value)}
              placeholder="Paid By"
              className='w-80 m-4'
            />
            <input
              type="text"
              value={field.paidFor}
              onChange={(e) => handleInputChange(index, 'paidFor', e.target.value)}
              placeholder="Paid For"
              className='w-80'
            />
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
      
        <div><button type="submit" className='bg-[#198754] w-60 p-2 rounded-md text-white m-4 ' onClick={handleSubmit}>Simplify</button></div></div>
      {
        data?.map(debt=>(
            <div className='m-4 flex bg-gray-100 rounded-2xl justify-between p-2'>
                <div className='text-2xl flex align-middle p-3'>{debt[0]} owes {debt[1]} ${debt[2]}</div>
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
            </div>
        ))
      }
    </div>
  );
};

export default SimplifyDebt;