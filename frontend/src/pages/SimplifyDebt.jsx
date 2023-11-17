import React, { useState } from 'react';
import axios from "axios"
import Navbar from '../components/Navbar';

const ExampleComponent = () => {
  const [inputFields, setInputFields] = useState([]);
  const [data,setData] = useState([])
  console.log(inputFields)

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
          const res = await axios.post("http://localhost:3001/api/group/simplifyDebt/65549d1f353d66ab479892f0",{outputArray})
          console.log(res.data)
          setData(res.data)
        }catch(err){
          console.log(err)
        }
      }
      simplify()
      
  };

  return (
    <div>
        <Navbar/>
      <form onSubmit={handleSubmit}>
        {inputFields.map((field, index) => (
          <div key={index}>
            <input
              type="text"
              value={field.paidBy}
              onChange={(e) => handleInputChange(index, 'paidBy', e.target.value)}
              placeholder="Paid By"
            />
            <input
              type="text"
              value={field.paidFor}
              onChange={(e) => handleInputChange(index, 'paidFor', e.target.value)}
              placeholder="Paid For"
            />
            <input
              type="number"
              value={field.amount}
              onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
              placeholder="Amount"
            />
            <button type="button" onClick={() => handleRemoveField(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddField}>
          Add Field
        </button>
        <button type="submit">Submit</button>
      </form>
      {
        data?.map(debt=>(
            <div>
                <div>{debt[0]} owes {debt[1]} ${debt[2]}</div>
                <button >approve</button>
            </div>
        ))
      }
    </div>
  );
};

export default ExampleComponent;