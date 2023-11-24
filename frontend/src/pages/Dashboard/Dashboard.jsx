import React,{useState,useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
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
  // console.log(user)
  // const { t } = useTranslation();
  const [lang, setLang] = useState("en");
  
  const handleChange = (e) => {
    // i18next.changeLanguage(e.target.value)
    setLang(e.target.value);
    i18next.changeLanguage(e.target.value).catch((err)=>{
      console.log(err)
    })
    // let loc = "http://localhost:3000/dashboard"
    // window.location.replace(
    //     loc + "?lng=" + e.target.value
    // );
};
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
    console.log(transactionData)
    const [filteredData,setFilteredData]=useState(transactionData)
    const [filterstate,setFilterState]=useState(false)
    console.log(filteredData)

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

    const {type,category,desc,date,currency} = transInput
    let {amount} = transInput

    //functions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //  ---------------Input ------------------------ 
    const handleTransInput = name=>e=>{
          setTransInput({...transInput,[name]:e.target.value})
    }

    // ----------------------- Filter Input ----------------------------------  
    const handleFilterInput = name=>e=>{
      console.log(filterInput)
      setFilterInput({...filterInput,[name]:e.target.value})

}
console.log("filters:",filterInput)
// -----------------checking whether filter empty or not ------------------------- 
const isFilterEmpty =filterInput.category === "" && filterInput.startDate === "" && filterInput.endDate === "";


useEffect(()=>{
  const ifnocategselect=async()=>{
    try{
      const res = await axios.get(`http://localhost:3001/api/transactions/getTransactions/${user._id}`);
      console.log(res.data)
      setFilteredData(res.data.trans)
      setTransactionData(res.data.trans)
    }catch(err){
        console.log(err)
    }
  }
  if(isFilterEmpty){
    ifnocategselect()
  }
},[updateFlag])
    //  ------------------- handling filter data-----------------------------
    const handleFilter = e=>{
        e.preventDefault()
        console.log("filters:",filterInput)
        const addFilter = async()=>{
        try{
          const res = await axios.post("http://localhost:3001/api/transactions/getTransactionsByFilter",{filterInput})
          console.log(res.data)
          setFilteredData(res.data.trans)
          setFilterState(true)
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
    },[updateFlag,transactionData]);

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
        setUpdateFlag((prevFlag) => !(prevFlag));
        handleClose()
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

  //---------------------MULTI LANGUAGE SUPPORT-----------------------
  i18next.use(initReactI18next).init({
    resources : {
      en:{
        translation : {
          welcome : "Welcome to my app",
          sub_title : "This is a really good app and I love it"
        }
      },
      hi : {
        translation : {
          welcome : "मेरे ऐप में आपका स्वागत है",
          sub_title : "यह वास्तव में एक अच्छा ऐप है और मुझे यह पसंद है"
        }
      },
      fr : {
        translation : {
          welcome : "Bienvenue dans mon application"
        }
      }
    }
  })
  

  return (
    <div style={{backgroundColor:thememode=="dark"?"#181818":"#f0f0f0"}}>
      
        <Navbar thememode={thememode} toggle={toggle}/>
        {/* --------------------------User monetary stats------------------------ */}
        {/* <select onChange={(e)=> handleChange(e)}>
                {languages.map((item) => {
                    return (
                        <option
                            key={item.value}
                            value={item.value}
                        >
                            {item.text}
                        </option>
                    );
                })}
            </select> */}

     <div className='h-full flex flex-col justify-center items-start '>
       
          <div className='flex w-[99vw] justify-evenly items-center h-20 p-4  d-parent' style={{backgroundColor:thememode=="dark"?"#181818":"#f0f0f0"}}>

            <div className='  w-60 rounded-md flex flex-col justify-center bg-[#8656cd] h-10 text-white items-center chill'>
             <div className='flex  justify-between p-4 font-bold gap-6'>
              <div>
              Income
              </div>

             <div> 
       
             &#8377;{stats.totalIncome}
             </div>

             
              </div>
            </div>


           <div className='  w-60 rounded-md flex flex-col justify-center bg-[#8656cd] h-10 text-white items-center chill'>
             <div className='flex  justify-between p-4 font-bold gap-6' >
              <div> 
               Balance
              </div>
                <div>
              
                &#8377;{stats.balance}
                </div>
              </div>
          </div>

          <div className='  w-60 rounded-md flex flex-col justify-center bg-[#8656cd] h-10 text-white items-center chill'>
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
        <div className='flex px-4 py-4 justify-center items-center h-[100%] filter w-[99vw]' style={{backgroundColor:thememode=="dark"?"#181818":"#f0f0f0"}}>
           <div className='flex justify-center align-middle py-2 px-2 font-bold text-2xl' style={{color:thememode=="dark"?"white":"black"}}>Filters:</div>
        
        {/* Category */}
              <select className='mx-2 border-2 rounded-md p-3 category-all' name="category" id="category" selected="All" onChange={handleFilterInput('category')} value={filterInput.category}>
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
        <button style={{}} onClick={handleFilter} className='mx-2 p-2 my-2 bg-[#8656cd] text-white p-2 rounded-md lg:w-80'>Apply Filter</button>

          {/* ----------------------Exporting data-------------------------- */}
        <CSVLink className='export-dashboard' data={filteredData} headers={headers} filename={"Transaction_Data.csv"}><button className='my-2  p-2 bg-[#8656cd] text-white p-2 rounded-md'>Export</button></CSVLink>
        </div>


        {/* -------------------------------Listing Transaction Cards below filter bar---------------------------- */}
      <div className='min-h-screen w-full flex flex-col align-middle'> 
        <div style={{width:"100%"}}>
          {(filterstate==false ? transactionData : filteredData)?.map(trans=>(
            //  console.log("mapped data",trans)
            <TransactionCard user={user} key={trans._id} transactionData={trans} thememode={thememode} toggle={toggle} setTransactionData={setTransactionData} setUpdateFlag={setUpdateFlag}/> 
            ))}
        </div>
        </div>
      </div>

    {/* --------------------------------------Add transaction modal-------------------------------- */}
    <button onClick={handleShow} className='bg-[#8656cd] text-white rounded-full px-2 py-2 w-12 h-12 shadow-md fixed bottom-8 right-8'>+</button>
    <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* Add transaction input section */}
            <label htmlFor="type">Transaction type: </label>
            <select name="type" 
                    id="type"  
                    value={type}
                    onChange={handleTransInput('type')}
                    className='px-1 border-1 py-1 mx-2 rounded-md'
                    required
                    >
            <option value="">Select</option>    
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
          <button className='bg-[#8656cd] p-2 rounded-md text-white' onClick={handleSubmit} required>Save</button>
        </Modal.Footer>
      </Modal>
      
            
             
        </div>

  )
}

export default Dashboard