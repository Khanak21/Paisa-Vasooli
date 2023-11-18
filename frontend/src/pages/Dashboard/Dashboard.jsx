import React,{useState,useEffect} from 'react'
import Navbar from '../../components/Navbar'
import {Button} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import TransactionCard from '../../components/TransactionCard';
import { CSVLink, CSVDownload } from "react-csv"
import StockChart from '../../components/StockChart';

const Dashboard = ({user,thememode,toggle,setUser}) => {
 
  
  // useEffect(() => {

  //   const loggedInUser = localStorage.getItem("user");
  //   if (loggedInUser) {
  //     console.log(loggedInUser)

  //    const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser);
  //   }

  // }, []);
  const [updateFlag, setUpdateFlag] = useState(false); 
  const [show,setShow] = useState(false)
  // console.log(user)
console.log(user._id)
  //states
    const [transInput,setTransInput] = useState({
        userId:user._id,
        type: 'expense',
        amount:'',
        category:'',
        desc:'',
        date:'',
        currency:''
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

    // console.log(uniqueCategories)
    const headers = [
      { label: "Transaction Type", key: "type" },
      { label: "Amount", key: "amount" },
      { label: "Category", key: "category" },
      { label: "Description", key: "desc" },
      { label: "Date", key: "date" }

    ];
    // console.log("transanction data being logged:",transactionData)

    const {type,category,desc,date,currency} = transInput
    let {amount} = transInput

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
          let res
          if (filterInput.category === "") {
            res = await axios.get(`http://localhost:3001/api/transactions/getTransactions/${user._id}`);
          } 
          res = await axios.post("http://localhost:3001/api/transactions/getTransactionsByFilter",{filterInput})
          console.log(res.data)
          setFilteredData(res.data.trans)
        }catch(err){
          console.log(err)
        }
      }
      addFilter()
    }

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
  
      
      const UCurrency=(currency)=>{
        const [data, setData] = useState({})
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`);
              const result = await response.json();
              setData(result[currency]);
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
    const [currenci, setCurrenci] = useState('inr');
    const currenciData = UCurrency(currenci);
    
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
    // },[])
    },[user._id])
    useEffect(()=>{
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
  },[updateFlag])
    
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
    },[updateFlag])

    useEffect(() => {
      const categoriesSet = new Set(transactionData.map(transaction => transaction.category));
      setUniqueCategories([...categoriesSet]);
    }, [updateFlag]);

     // Replace with your dynamic currency value
    const currencyData = UCurrency('inr');
    console.log(currencyData['usd'])
    
    const handleSubmit = async(e)=>{
      e.preventDefault()
      console.log('Currency data:', currenciData);
      // // console.log(transInput)
      // // addTransaction(transInput)
      console.log(currenciData[currency]);
      amount =Math.floor(amount / currenciData[currency]);
      console.log(amount)
      const addTrans = async()=>{
      try{
        console.log(transInput)
        const res = await axios.post("http://localhost:3001/api/transactions/addTransaction",{userId:user._id,type,category,desc,date,currency,amount})
        console.log(res.data)
        const val=res.data.transaction
        setTransactionData(prev=>[...prev,val])
        setUpdateFlag((prevFlag) => !prevFlag);
      }catch(err){
        console.log(err.response.data)
      }
    }
    addTrans()
    
    mailsend()
    setTransInput({
      userId:user._id,
      type:'expense',
      amount:'',
      category:'',
      desc:'',
      date:'',
      currency:'',
  })
  }
  

  return (
    <div>
      
        <Navbar thememode={thememode} toggle={toggle}/>
        {/* --------------------------User monetary stats------------------------ */}
     
        <div className='flex w-full justify-center h-20 p-4' style={{backgroundColor:thememode=="dark"?"black":"white"}}>
          <div className='flex justify-start items-center gap-4'>

            <div className='  w-60 rounded-md flex flex-col justify-center bg-[#198754] h-10 text-white items-center'>
             <div className='flex  justify-between p-4 font-bold gap-6'>
              <div>
              Total Income
              </div>

             <div> 
       
             &#8377;{stats.totalIncome}
             </div>

             
              </div>
            </div>


           <div className='  w-60 rounded-md flex flex-col justify-center bg-[#198754] h-10 text-white items-center'>
             <div className='flex  justify-between p-4 font-bold gap-6'>
              <div> 
                Balance
              </div>
                <div>
              
                &#8377;{stats.balance}
                </div>
              </div>
          </div>

          <div className='  w-60 rounded-md flex flex-col justify-center bg-[#198754] h-10 text-white items-center'>
             <div className='flex  justify-between p-4 font-bold gap-6'>
                <div className='text-md flex justify-evenly gap-2'>
                 <span>Total</span><span> Expense </span>
                </div>
              <div>
          
              &#8377;{stats.totalExpense}
              </div>

              </div>
          </div>

          </div>
        </div>
        
        {/* -----------------------Filters------------------------ */}
        <div className='flex px-4 py-4 justify-center items-center h-[100%]' style={{backgroundColor:thememode=="dark"?"#000435":"white"}}>
           <div className='flex justify-center align-middle py-2 px-2 font-bold text-2xl'>Filters:</div>
        
        {/* Category */}
              <select className='mx-2 border-2 rounded-md p-3' name="category" id="category" selected="All" onChange={handleFilterInput('category')} value={filterInput.category}>
                <option value="">All Categories</option>
                   {
                      uniqueCategories.map(cat=>(
                      <option value={cat}>{cat}</option>
                       ))
                    }

              </select>

        {/* Date */}
 
        <input type="date" id="startDate" className="mx-2 my-2 border-2 rounded-md p-3" value={filterInput.startDate} onChange={handleFilterInput('startDate')} placeholder='Start date'></input> 
        <input type="date" id="endDate" className="mx-2 my-2 border-2 rounded-md p-3" value={filterInput.endDate} onChange={handleFilterInput('endDate')} placeholder='End date'></input> 
        <Button style={{}} variant="success" onClick={handleFilter} className='mx-2 p-2 my-2'>Apply Filter</Button>

          {/* ----------------------Exporting data-------------------------- */}
        <CSVLink className='' data={filteredData} headers={headers} filename={"Transaction_Data.csv"}><Button variant="success" className='my-2  p-2'>Export</Button></CSVLink>
        </div>


        {/* -------------------------------Listing Transaction Cards below filter bar---------------------------- */}
      <div className='h-[100%] w-full my-0'  style={{backgroundColor:thememode=="dark"?"#000435":"white"}}> 
        <div style={{width:"50%"}}>
          {filteredData?.map(trans=>(
            //  console.log("mapped data",trans)
            <TransactionCard user={user} key={trans._id} transactionData={trans}  style={{backgroundColor:thememode=="dark"?"#000435":"white"}} /> 
            ))}
        </div>
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

            <label htmlFor='currency'>Currency: </label>
            <select
                    name="currency"
                    id="currency"
                    value={currency}
                    onChange={handleTransInput('currency')}
                    className='px-1 border-1 py-1 mx-2 rounded-md'
                    required
                  >
                    <option value="inr">inr</option>
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
                  <br />
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

  )
}

export default Dashboard