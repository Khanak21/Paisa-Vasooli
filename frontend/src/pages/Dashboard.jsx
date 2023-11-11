import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import {Button} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import TransactionCard from '../components/TransactionCard';
import { CSVLink, CSVDownload } from "react-csv"

const Dashboard = ({user}) => {
  // console.log(user)
  //states
    const [show, setShow] = useState(false);
    const [transInput,setTransInput] = useState({
        userId:user._id,
        type: 'expense',
        amount:'',
        category:'',
        desc:'',
        date:'',
    })
    const [filterInput,setFilterInput] = useState({
      userId:user._id,
      category:'',
      startDate:'',
      endDate:'',

      // month:'',
      // year:''
    })

    const [transactionData,setTransactionData]=useState([])
    const [filteredData,setFilteredData]=useState(transactionData)

    const [uniqueCategories, setUniqueCategories] = useState([]);
    const [stats,setStats] = useState({})
    console.log(uniqueCategories)
    const headers = [
      { label: "Transaction Type", key: "type" },
      { label: "Amount", key: "amount" },
      { label: "Category", key: "category" },
      { label: "Description", key: "desc" },
      { label: "Date", key: "date" }

    ];
    // console.log("transanction data being logged:",transactionData)

    const {type,amount,category,desc,date} = transInput

    //functions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

     
    const handleTransInput = name=>e=>{
          setTransInput({...transInput,[name]:e.target.value})
    }
    const handleFilterInput = name=>e=>{
      console.log(filterInput)
      setFilterInput({...filterInput,[name]:e.target.value})

}
    const handleFilter = e=>{
        e.preventDefault()
        console.log("filters:",filterInput)
        const addFilter = async()=>{
        try{
          const res = await axios.post("http://localhost:3001/api/transactions/getTransactionsByFilter",{filterInput})
          console.log(res.data)
          setFilteredData(res.data.trans)
        }catch(err){
          console.log(err)
        }
      }
      addFilter()
    //   setFilterInput({
    //     type:'Expense',
    //     amount:'',
    //     category:'',
    //     desc:'',
    //     date:''
    // })
    }
    // const sendEmail = e=>{
      
      
    // }

    
      const mailsend=async()=>{
        try{
          const reqmail = user.email
          console.log(reqmail)
          const res = await axios.post("http://localhost:3001/api/mail/sendmail",{reqmail})
          .then(() => alert("Message Sent Succesfully"))
          .catch((err) => console.log(err));
        }catch(err){
          console.log(err.response.data)
        }
      }
    
    
    const handleSubmit = e=>{
        e.preventDefault()
        // console.log(transInput)
        // addTransaction(transInput)
        
        const addTrans = async()=>{
        try{
          console.log(transInput)
          const res = await axios.post("http://localhost:3001/api/transactions/addTransaction",{transInput})
          console.log(res.data)
          const val=res.data.transaction
          setTransactionData(prev=>[...prev,val])
        }catch(err){
          console.log(err.response.data)
        }
      }
      
      addTrans()
      mailsend()
      setTransInput({
        type:'expense',
        amount:'',
        category:'',
        desc:'',
        date:''
    })
    }
    useEffect(()=>{
      const getTrans = async()=>{
        try{
          // console.log("Sending request with data:", transInput);
          const res = await axios.get(`http://localhost:3001/api/transactions/getTransactions/${user._id}`)//add user Id
          console.log(res.data)
          setTransactionData(res.data.trans)
        }catch(err){
          console.log(err)
        }
      }
      getTrans()
      const getTotalStats = async()=>{
        try{
          const res = await axios.get(`http://localhost:3001/api/transactions/getTotalStats/${user._id}`)
          console.log(res.data)
          setStats(res.data)
        }catch(err){
          console.log(err)
        }
      }
      getTotalStats()
    },[])
    useEffect(() => {
      const categoriesSet = new Set(transactionData.map(transaction => transaction.category));
      setUniqueCategories([...categoriesSet]);
    }, [transactionData]);

  return (
    <div>
      
        <Navbar/>
        {/* --------------------------User monetary stats------------------------ */}
        <div >
            <div className='flex w-full justify-center h-40'>
            <div className=' mx-4 w-60 my-2 rounded-md flex justify-center bg-[#198754] text-white align-middle'>${stats.totalIncome}</div>
            <div className=' mx-4 w-60 my-2 rounded-md flex justify-center bg-[#198754] text-white align-middle'>${stats.balance}</div>
            <div className=' mx-4 w-60 my-2 rounded-md flex justify-center bg-[#198754] text-white align-middle'>${stats.totalExpense}</div>
        </div>
        
        {/* -----------------------Filters------------------------ */}
        <div className='flex px-4 py-4 justify-center'>
        <div className='flex justify-center align-middle py-2 px-2 font-bold text-xl'>Filters:</div>
        
        {/* Category */}
        <select className='mx-2 border-2 rounded-md' name="category" id="category" selected="All" onChange={handleFilterInput('category')} value={filterInput.category}>
        <option value="">All Categories</option>
          {
            uniqueCategories.map(cat=>(
               <option value={cat}>{cat}</option>
            ))
          }
        </select>

        {/* Date */}
        <input type="date" id="startDate" className="mx-2 border-2 rounded-md" value={filterInput.startDate} onChange={handleFilterInput('startDate')} placeholder='Start date'></input> 
        <input type="date" id="endDate" className="mx-2 border-2 rounded-md" value={filterInput.endDate} onChange={handleFilterInput('endDate')} placeholder='End date'></input> 
        <Button variant="success" onClick={handleFilter} className='mx-2'>Apply Filter</Button>

          {/* ----------------------Exporting data-------------------------- */}
          <CSVLink data={filteredData} headers={headers} filename={"Transaction_Data.csv"}><Button variant="success">Export</Button></CSVLink>
        </div>

        {/* -------------------------------Listing Transaction Cards below filter bar---------------------------- */}
        <div>
          {filteredData?.map(trans=>(
            //  console.log("mapped data",trans)
            <TransactionCard key={trans._id} transactionData={trans}/> 
            ))}
        </div>

    {/* --------------------------------------Add transaction modal-------------------------------- */}
    <button onClick={handleShow} className='bg-[#198754] text-white rounded-full px-2 py-2 w-12 h-12 shadow-md fixed bottom-8 right-8'>+</button>
    <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* Add transaction input section */}
            <label htmlFor="type">Transaction type: </label>
            <select name="type" 
                    id="type" 
                    selected="expense" 
                    value={type}
                    onChange={handleTransInput('type')}
                    className='px-1 border-1 py-1 mx-2 rounded-md'
                    required
                    >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            </select><br/>

            <label htmlFor='amount'>Amount: </label>
            <input type="number" 
                   name={'amount'}
                   value={amount}
                   onChange={handleTransInput('amount')}
                   required
                   ></input>

            <label htmlFor='category'>Category: </label>
            <input name={"category"}
                   type="text"
                   value={category}
                   onChange={handleTransInput('category')}
                   required
                   ></input>

            <label htmlFor='desc'>Description:</label>
            <input type='text' 
                   name={'desc'}
                   value={desc}
                   onChange={handleTransInput('desc')}
            ></input>

            <label htmlFor='date'>Date:</label>
            <input type='date'
                   name={"date"}
                   value={date}
                   onChange={handleTransInput('date')}
                   required
            ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit} required>Save</Button>
        </Modal.Footer>
      </Modal>
      
            
             
        </div>
    </div>
  )
}

export default Dashboard