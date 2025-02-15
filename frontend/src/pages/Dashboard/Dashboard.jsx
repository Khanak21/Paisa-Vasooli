import React,{useState,useEffect} from 'react'
import Navbar from '../../components/Navbar'
import {Button} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import TransactionCard from '../../components/Cards/TransactionCard';
import { CSVLink, CSVDownload } from "react-csv"
import { useTranslation,initReactI18next } from "react-i18next"; 
import i18next from "i18next"
import './Dashboard.css'
const languages = [
  { value: "", text: "Options" },
  { value: "en", text: "English" },
  { value: "hi", text: "Hindi" },
];


const Dashboard = ({user,thememode,toggle,setUser}) => {
  const [lang, setLang] = useState("en");
  const [updateFlag, setUpdateFlag] = useState(false); 
  const [show,setShow] = useState(false)
  // console.log(user)
  console.log(user._id)
    const [transInput,setTransInput] = useState({
        userId:user._id,
        type: 'expense',
        amount:'',
        category:'',
        desc:'',
        date:'',
        currency:'inr'
    })
    const [filterInput,setFilterInput] = useState({
      userId:user._id,
      category:'',
      startDate:'',
      endDate:'',
    })
    const [errorMessage, setErrorMessage] = useState("");
    const [transactionData,setTransactionData]=useState([])
    // console.log(transactionData)
    const [filteredData,setFilteredData]=useState(transactionData)
    const [filterstate,setFilterState]=useState(false)
    // console.log(filteredData)
    const [uniqueCategories, setUniqueCategories] = useState([]);
    const [stats,setStats] = useState({})
    const bigincome = 'BadeLog.png'
    const bigexpense = 'AAKR.png'
    const [incomeshow,setIncomeshow] = useState(false)
    const [expenseshow,setExpenseshow] = useState(false)
    const incomebadge = 'SoBeautiful.png'
    const expensebadge = 'SoElegant.png'

    // console.log(uniqueCategories)
    const headers = [
      { label: "Transaction Type", key: "type" },
      { label: "Amount", key: "amount" },
      { label: "Category", key: "category" },
      { label: "Description", key: "desc" },
      { label: "Date", key: "date" }

    ];
    const {type,category,desc,date,currency} = transInput
    let {amount} = transInput

    //functions to handle modal visibility
    const handleClose = () => {setShow(false);setTransInput({
      userId:user._id,
      type: 'Expense',
      amount:'',
      category:'',
      desc:'',
      date:'',
      currency:'inr'
  });setErrorMessage("")};
    const handleShow = () => setShow(true);

    const handleIncomeClose = () => setIncomeshow(false);
    const handleIncomeShow = () => setIncomeshow(true);
    const handleExpenseClose = () => setExpenseshow(false);
    const handleExpenseShow = () => setExpenseshow(true);

     //functions to handle input
    const handleTransInput = name=>(e)=>{
      if(name=='type' ||name=='category'||name=='desc'){
        const capitalizedValue = capitalizeFirstLetter(e.target.value);
        // console.log(capitalizedValue)
        setTransInput({...transInput,[name]:capitalizedValue})
      }
      else{
        setTransInput({...transInput,[name]:e.target.value})
      }
    }

    const capitalizeFirstLetter = (string) => {
      // console.log("string"+string);
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // ----------------------- Filter Input ----------------------------------  
    const handleFilterInput = name=>e=>{
      console.log(filterInput)
      setFilterInput({...filterInput,[name]:e.target.value})
}
  

// console.log("filters:",filterInput)
// -----------------checking whether filter empty or not ------------------------- 
const isFilterEmpty =filterInput.category === "" && filterInput.startDate === "" && filterInput.endDate === "";

useEffect(()=>{
  //function to retrieve all user transactions
  const ifnocategselect=async()=>{
    try{
      const res = await axios.get(`http://localhost:3001/api/transactions/getTransactions/${user._id}`);
      console.log("transaction data",res.data)
      setFilteredData(res.data.trans)
      setTransactionData(res.data.trans)
    }catch(err){
        console.log(err)
    }
  }
  if(isFilterEmpty){
    ifnocategselect()
  }
},[updateFlag,user._id,isFilterEmpty])
 
const datat = localStorage.getItem("transactions")
// console.log(datat)
   //function to retrieve user transactions with filter
    const handleFilter = e=>{
        e.preventDefault()
        console.log("filters:",filterInput)
        const addFilter = async()=>{
        try{
          const res = await axios.post("http://localhost:3001/api/transactions/getTransactionsByFilter",{filterInput})
          // console.log(res.data)
          setFilteredData(res.data.trans)
          setFilterState(true)
        }catch(err){
          console.log(err)
        }
      }
      addFilter()
    }

    //function to send mail
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

      //function to add badge
      const addBadge=async(img)=>{
        try{
          console.log(img)
          const res = await axios.post(`http://localhost:3001/api/user/addbadge/${user._id}`,{img})
          console.log(res.data.user)
        }catch(err){
          console.log(err.response.data)
        }
      }
  
      //function to handle multiple currencies
      
      const UCurrency=(currency)=>{
        const [data, setData] = useState({})
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=LQvy3LtRMZSLNj7WvwKX3tPoA37h6FdzWNaLbw4f&currencies=INR%2CMXN%2CSEK%2CCHF%2CSGD%2CHKD%2CCNY%2CCAD%2CAUD%2CJPY%2CGBP%2CEUR%2CUSD%2CCAD&base_currency=INR`);
              const result = await response.json();
              setData(result.data);
              console.log(result.data);
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
      //function to retrive user data from local storage
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
    },[user._id])

    useEffect(()=>{
    //function to fetch total income,balance and expense
    const getTotalStats = async()=>{
      try{
        const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=LQvy3LtRMZSLNj7WvwKX3tPoA37h6FdzWNaLbw4f&currencies=MXN%2CSEK%2CCHF%2CSGD%2CHKD%2CCNY%2CCAD%2CAUD%2CJPY%2CGBP%2CEUR%2CUSD%2CCAD&base_currency=INR`);
        const result=response.json();
        console.log(result);
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
        const res = await axios.get(`http://localhost:3001/api/transactions/getTransactions/${user._id}`)//add user Id
        console.log(res.data)
        const numberOfIncomeTransactions = res.data.trans.filter((transaction) => transaction.type === 'income').length;
        console.log(numberOfIncomeTransactions)
        if(numberOfIncomeTransactions==50){
          addBadge(incomebadge)
        }
        const numberOfExpenseTransactions = res.data.trans.filter((transaction) => transaction.type === 'expense').length;
        console.log(numberOfExpenseTransactions)
        if(numberOfExpenseTransactions==50){
          addBadge(expensebadge)
        }
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
    },[updateFlag,transactionData]);

     // Replace with your dynamic currency value
    const currencyData = UCurrency('inr');
    // console.log(currencyData['usd'])
    
    const handleSubmit = async(e)=>{
      e.preventDefault()
      console.log('Currency data:', currenciData);
      const currencysmall = currency.toUpperCase();
      amount =Math.floor(amount / currenciData[currencysmall]);
      console.log(amount)
      const addTrans = async()=>{
      try{
        console.log("TRANSINPUT",transInput)
        if(transInput.amount===''||transInput.category===''||transInput.currency===''||transInput.date===''||transInput.type===''||transInput.userId===''){
          setErrorMessage("All fields except description should be filled");
          return ;
        }
        const res = await axios.post("http://localhost:3001/api/transactions/addTransaction",{userId:user._id,type,category,desc,date,currency,amount})
        console.log(res.data)
        const val=res.data.transaction
        setTransactionData(prev=>[...prev,val])
        setUpdateFlag((prevFlag) => !(prevFlag));
        if(amount>=100000 && type=="expense"){
          addBadge(bigexpense)
          handleExpenseShow()
        }
        if(amount>=100000 && type=="income"){
          addBadge(bigincome)
          handleIncomeShow()
        }
        setTransInput({
          userId:user._id,
          type:'expense',
          amount:'',
          category:'',
          desc:'',
          date:'',
          currency:'',
      })
        setErrorMessage("");
        handleClose()
      }catch(err){
        console.log(err.response.data)
      }
    }
    addTrans()
    
    mailsend()
   
  }
  

  return (
    <div style={{backgroundColor:thememode=="dark"?"#181818":"#f0f0f0"}} className='min-h-screen'>
        <Navbar thememode={thememode} toggle={toggle}/>
      <div className='font-extrabold text-2xl mx-4 mt-2 px-6 dark:text-[#f0f0f0]'>Welcome, {user.username}!</div>
      <div className='mt-2 mx-4 px-6 text-gray-600 dark:text-gray-400'>Let's add some transactions!</div>

      <div className='h-full flex flex-col justify-center items-start '>
       
          <div className='flex w-[99vw] justify-evenly items-center h-20 p-4  d-parent' style={{backgroundColor:thememode=="dark"?"#181818":"#f0f0f0"}}>

            <div className='  w-60 rounded-md flex flex-col justify-center bg-[#000080] h-10 text-white items-center chill'>
             <div className='flex  justify-between p-4 font-bold gap-6'>
                <div>
                Income
                </div>

                <div> 
                  &#8377;{stats.totalIncome}
                </div>
              </div>
            </div>


            <div className='  w-60 rounded-md flex flex-col justify-center bg-[#000080] h-10 text-white items-center chill'>
             <div className='flex  justify-between p-4 font-bold gap-6' >
                <div> 
                  Balance
                </div>
                <div>
                  &#8377;{stats.balance}
                </div>
              </div>
            </div>

          <div className='  w-60 rounded-md flex flex-col justify-center bg-[#000080] h-10 text-white items-center chill'>
             <div className='flex  justify-between p-4 font-bold gap-6'>
                <div className='text-md flex justify-evenly gap-2'>
                 <span> Expense </span>
                </div>
              <div>
          
              &#8377;{stats.totalExpense}
              </div>

              </div>
          </div>

          </div>
      
        {/* -----------------------Filters------------------------ */}
        <div className='grid grid-cols-3'>
        <div className='col-span-1'>
        <div className='flex-col px-6 py-4 justify-center items-center h-[100%] filter mx-4 w-fit' style={{backgroundColor:thememode=="dark"?"#181818":"#f0f0f0"}}>
              <label for="category" className='px-2 pb-2 dark:text-white'>Category:</label>
              <select className='mx-2 border-2 rounded-md p-3 category-all w-full' name="category" id="category" selected="All" onChange={handleFilterInput('category')} value={filterInput.category}>
                <option value="">All Categories</option>
                   {
                      uniqueCategories.map(cat=>(
                      <option value={cat}>{cat}</option>
                       ))
                    }

              </select>

        <label for="startDate" className='p-2 dark:text-white'>Start Date:</label>
        <input type="date" id="startDate" className="mx-2 border-2 rounded-md p-3" value={filterInput.startDate} onChange={handleFilterInput('startDate')} placeholder='Start date'></input> 
        <label for="endDate" className='p-2 dark:text-white'>End Date:</label>
        <input type="date" id="endDate" className="mx-2 border-2 rounded-md p-3" value={filterInput.endDate} onChange={handleFilterInput('endDate')} placeholder='End date'></input> 
        <button style={{}} onClick={handleFilter} className='mx-2 p-2 my-2 bg-[#000080] text-white p-2 rounded-md w-full'>Apply Filter</button>
        <CSVLink className='export-dashboard' data={filteredData} headers={headers} filename={"Transaction_Data.csv"}><button className='mx-2 p-2 bg-[#000080] text-white rounded-md w-full mt-5'>Export CSV</button></CSVLink>
        <button onClick={handleShow} className='bg-[#000080] z-10 text-white rounded-full px-2 py-2 w-12 h-12 shadow-md fixed bottom-8 right-8'>+</button>
        </div>
        </div>


        {/* -------------------------------Listing Transaction Cards below filter bar---------------------------- */}
      <div className='h-[95%] w-full flex flex-col align-middle col-span-2'> 
        <div style={{width:"100%"}} className='overflow-y-scroll'>
          {(filterstate==false ? transactionData : filteredData)?.map(trans=>(
            <TransactionCard user={user} key={trans._id} transactionData={trans} thememode={thememode} toggle={toggle} setTransactionData={setTransactionData} setUpdateFlag={setUpdateFlag}/> 
            ))}
        </div>
       
      </div>
        
      </div>

      </div>

      {/* --------------------------------------Add transaction modal-------------------------------- */}
      <Modal show={show} onHide={handleClose} animation={false} centered>
          <Modal.Header  closeButton>
            <Modal.Title className='text-center w-full' >Add Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body className='flex flex-col text-md gap-1'>
              {/* Add transaction input section */}

              <div className='w-full flex justify-between items-center'>
                  <label htmlFor="type" className='w-3/12 text-center text-md'>Type: </label>
                  <select name="type" 
                          id="type"  
                          value={transInput.type}
                          onChange={handleTransInput('type')}
                          className='border-1 w-7/12  text-center py-1 px-1 rounded-md'
                          required
                          >
                  <option>select</option>    
                  <option value="Expense">Expense</option>
                  <option value="Income">Income</option>
                  </select>
              </div>
              
          
              <div className='w-full flex justify-between items-center'>
                <label htmlFor='currency' className='w-3/12 text-center'>Currency: </label>
                <select
                        name="currency"
                        id="currency"
                        value={transInput.currency}
                        onChange={handleTransInput('currency')}
                        className='border-1 w-7/12  text-center py-1 px-1 rounded-md'
                        required
                      >
                        <option>select:</option>
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
              </div>

              <div
              className='w-full flex justify-between items-center'
              >
                <label htmlFor='amount' className='w-3/12 text-center'>Amount: </label>
                <input type="number" 
                      name={'amount'}
                      className='w-7/12 text-center'
                      value={amount}
                      onChange={handleTransInput('amount')}
                      required
                      >
                </input>
              </div>

              <div
              className='w-full flex justify-between items-center'
              >
                <label htmlFor='category' className='w-3/12 text-center'>Category: </label>
                <input name={"category"}
                      type="text"
                      className='w-7/12 '
                      value={category}
                      onChange={handleTransInput('category')}
                      required
                ></input>
              </div>


              <div className='w-full flex justify-between items-center'
              >
                <label htmlFor='desc' className='w-3/12 text-center'>Description:</label>
                <input type='text' 
                      name={'desc'}
                      value={desc}
                      className='w-7/12 '
                      onChange={handleTransInput('desc')}
                ></input>
              </div>

              <div className='w-full flex justify-between items-center'>
                <label htmlFor='date' className='w-3/12 text-center'>Date:</label>
                <input type='date'
                      name={"date"}
                      value={date}
                      className='w-7/12 '
                      onChange={handleTransInput('date')}
                      required
                ></input>
              </div>
          </Modal.Body>
          <Modal.Footer>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button className='bg-[#000080] p-2 rounded-md text-white md:w-full' onClick={handleSubmit} required>Save</button>
          </Modal.Footer>
      </Modal>

      <Modal show={incomeshow} onHide={handleIncomeClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations! You are rewarded with a Badge!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <img src="BadeLog.png" alt="Badge Image" className="w-100" />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      <Modal show={expenseshow} onHide={handleExpenseClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations! You are rewarded with a Badge!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <img src="AAKR.png" alt="Badge Image" className="w-100" />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
        </div>

  )
}

export default Dashboard