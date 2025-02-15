import React, { useEffect, useState } from 'react'
import TradingViewWidget from '../../components/Stocks/TradingViewWidget'
import Navbar from '../../components/Navbar'
import axios from "axios"
import HeatmapStocks from '../../components/Stocks/HeatmapStocks'

const Stocks = ({user,thememode,toggle}) => {

    const [input,setInput]=useState("")
    const[flag,setflag]=useState(false)
    const[stockflag,setstockflag]=useState(false)
    const[sym,setsym] = useState("MSFT")
    const [stockData,setStockData]=useState(['AAPL'])
    console.log(stockData)

    //handling user input for ticker symbol and company/crypto name
    const handleInput = e=>{
        setInput(e.target.value)
        console.log(input)
    }

    //function to set ticker symbol
    const handleSETSYM = async(e)=>{
      setsym(e)
      console.log("symbol",sym)
      setstockflag(prev=>!prev)
    }

    //function to add stock symbol
    const handleSubmit = async()=>{
        try{
          if(input!=""){
            const res=await axios.post(`http://localhost:3001/api/user/addStock/${user._id}`,{input})
            console.log(res.data.user.stocks)
            const val=res.data.user.stocks
            setStockData(prev=>([...prev,val]))
            setflag(prev=>!prev)
            setInput("")
          }else{
            alert('Enter a valid input')
          }
        }catch(err){
            console.log(err)
        }
    }

    const handledelete = async(stock)=>{
      try{
        const res = await axios.put(`http://localhost:3001/api/user/deletestock/${user._id}`,stock)
        console.log(res.data);
        setflag(prev=>!prev)
      }
      catch(e){
        console.log(e);
      }
    }

    //function to fetch user stocks
    useEffect(()=>{
      const getStocks = async()=>{ try{ const res=await axios.get(`http://localhost:3001/api/user/getStocks/${user._id}`)
        console.log("widget",res.data)
        setStockData(res.data.val)
        console.log(stockData)
    }catch(err){
        console.log(err)
    }
    }
    getStocks()
    console.log(stockData)
    },[flag])
    console.log(stockData)

  return ( 
    <div style={{backgroundColor:thememode=="dark"?"#181818":"#f0f0f0"}} className='min-h-screen overflow-x-hidden'>
        <Navbar thememode={thememode} toggle={toggle}/>
        <div className="mx-auto my-auto h-screen block justify-center items-center" style={{backgroundColor:thememode==="dark"?"#181818":"#f0f0f0"}} >
          
        <div className='flex justify-center p-2 font-bold text-2xl' style={{color:thememode==="dark"?"white":"black"}}></div>

        {/* -----------------------------Search Stocks and crypto-------------------------------- */}
        <div className='flex justify-left font-extrabold text-2xl mx-4 my-1 dark:text-[#f0f0f0] ' style={{color:thememode==="dark"?"white":"black"}}> Search for a particular stock/crypto...</div>
    <div className='mx-4 mb-4 text-gray-600 dark:text-gray-400'>Type the stock tick for a company and click on Save to add the stocks you would want to track for easy access later</div>
        
  <div className='flex justify-around'>
  <div className='flex'>
  <div className=''>
  <div className='m-4 dark:text-white flex justify-center w-full'>
  <input name={"input"}
              type="text"
              value={input}
              onChange={handleInput}
              placeholder='Enter stock tick'
              required
              className='p-2'
              ></input>
              <button onClick={handleSubmit} className='m-2 bg-[#000080]  text-white rounded-md p-2'>Save</button>
  </div>
           

  <div className='px-3 '>
    <div className=' w-full flex flex-wrap'>  
    {stockData.map((stock, index) => (
      <div className='h-fit w-fit mx-2 mb-4 border-[#8656cd] dark:text-white shadow-md p-2 rounded-md' key={index} onClick={()=>handleSETSYM(stock.input)}  style={{ cursor: "pointer",padding: "5px", backgroundColor:thememode==='dark'?"#2c3034":"white"}}>
          {stock.input}
      </div>
    ))}
    </div>
  </div>
  </div>

   <TradingViewWidget sym={sym} stockflag={stockflag} thememode={thememode} />
   </div>
    </div>
    </div>
    </div>
  )
}

export default Stocks