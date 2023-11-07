import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faPlus,faMinus } from '@fortawesome/free-solid-svg-icons';
import './Dues.css'



function Dues() {

    const [input,setInput]=useState('')
    const [selectedDate,setDate]=useState('')
    const [amount,setAmount]=useState(0)
    const [person,setPerson]=useState('')


    //hook to add items of due payments
    const [dueItem,setdueItem]=useState([])
    const [deleteDiv,setdeleteDiv]=useState(false)

    const listItems=()=>{
       
      const newDueItem={
        name:input,
        date:selectedDate,
        amount:amount,
        person:person
      }

      setdueItem([...dueItem,newDueItem])
      setInput('');
      setAmount('');
      setDate('');
      setPerson('');

    };
    
    const itemEvent=(event)=>{
      const k=event.target.value
      setInput(k);
      console.log(k);
    }

    const SettingDate=(event)=>{
        const d=event.target.value
        setDate(d)
        console.log(d)
    }

    const amountSet=(event)=>{
        const yum=event.target.value
        setAmount(yum)
    }

    const DueMoneyPerson=(event)=>{
        const per=event.target.value
       setPerson(per)
    }

   const handleDelete=()=>{

    setdeleteDiv(!deleteDiv)
   }
    


    return (
 
     
   <div className="outer">
    <div className="Tt">
       <h2> Manage Dues</h2>
    </div>

    <div className="hero-section">

        <div className="hero-left">

            <div className="add-dues">

                <div className="due-Title">
                    <label htmlFor="Title">Title</label>
                    <input 
                    type="text"  
                    name="title" 
                    id="" 
                    placeholder='Input due-title'
                    value={input}
                    onChange={itemEvent}
                    />
                </div>

                <div className="due-Date">
                    <label htmlFor="Date">Due-Date</label>
                    <input 
                    type="date"
                    name="date" 
                    id="" 
                    placeholder='Input date of due' 
                    value={selectedDate}
                    onChange={SettingDate}
                    />
                </div>

                <div className="due-Amount">
                    <label htmlFor="amount">Amount</label>
                    <input 
                    type="number" 
                    name="amount" 
                    id="" 
                    placeholder='Input amount in Rs.' 
                    value={amount}
                    onChange={amountSet}
                    />
                </div>

                <div className="due-To">
                    <label htmlFor="PersonDue">Due-To-Person</label>
                    <input 
                    type="text" 
                    name="toWhom" 
                    id="" 
                    value={person}
                    onChange={DueMoneyPerson}
                    placeholder='To whom'
                    />
                </div>
                
            </div>
                <div className="add-btn">
                    <div className="add-item">
                    Add Due 
                    </div>
                    <div className="plus-btn" onClick={listItems}>
                    <FontAwesomeIcon icon={faPlus} className='plus' />
                    </div>
                </div>

        </div>

        <div className="hero-right">
            <div className="storing-dues">

               {
                  dueItem.map(
                    (items)=>{
                        return (
                            <>
                            <div className={deleteDiv?'parent-due active':'parent-due'}>
                            <div className="delete-minus"  onClick={handleDelete}>
                                {console.log(deleteDiv)}
                            <FontAwesomeIcon icon={faMinus} className='johnny' />
                            </div>
                            <div className="due-box">
                                <div className="due-name">
                                    <div>  Name:-   </div>
                                    <div>  { items.name}</div>
                              
                                </div>
                                <div className="due-date">
                                <div>Date:-  </div>
                                    <div>  { items.date}</div>
                                </div>
                                <div className="due-amount">
                                <div>  Amount:-   </div>
                                    <div>  { items.amount}</div>
                                </div>
                                <div className="due-whom">
                                <div>  To Person:-   </div>
                                    <div>  { items.person}</div>
                                </div>
                            </div>
                            </div>
                            </>
                        )
                    }
                  )
               }

            </div>
        </div>
    </div>

   </div>

  )
}

export default Dues
