import React, { useEffect, useState } from 'react'
import TradingViewWidget from '../../components/TradingViewWidget'
import Navbar from '../../components/Navbar'
import StockWidget from '../../components/StockWidget'
import axios from "axios"
import StockChart from '../../components/StockChart'
import HeatmapStocks from '../../components/HeatmapStocks'

const Stocks = ({user,thememode,toggle}) => {
    const [input,setInput]=useState()
    const[flag,setflag]=useState(false)
    const[stockflag,setstockflag]=useState(false)
    const[sym,setsym] = useState("MSFT")
    // const [data,setData] = useState([{ ticker: 'AAPL', company: 'Apple' }])
    const [stockData,setStockData]=useState(['AAPL'])
    console.log(stockData)
    //handling user input for ticker symbol and company/crypto name
    const handleInput = e=>{
        setInput(e.target.value)
        console.log(input)
    }
    const handleSETSYM = async(e)=>{
      setsym(e)
      console.log("mausam",sym)
      setstockflag(prev=>!prev)
    }
    const handleSubmit = async()=>{
        try{
            const res=await axios.post(`http://localhost:3001/api/user/addStock/${user._id}`,{input})
            console.log(res.data.user.stocks)
            const val=res.data.user.stocks
            setStockData(prev=>([...prev,val]))
            setflag(prev=>!prev)
            setInput("")
        }catch(err){
            console.log(err)
        }
    }
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
    <div>
        <Navbar thememode={thememode} toggle={toggle}/>
        <div className="mx-auto my-auto h-[200vh] block justify-center items-center" style={{backgroundColor:thememode==="dark"?"#181818":"#f0f0f0"}} >
        <div className='flex justify-center p-2 font-bold text-2xl' style={{color:thememode==="dark"?"white":"black"}}> Explore the Trendy Stocks...</div>
       <HeatmapStocks thememode={thememode}/>
       <div className='flex justify-center p-2 font-bold text-2xl' style={{color:thememode==="dark"?"white":"black"}}> Search for a particular stock/crypto...</div>
    
         <div className='m-4 dark:text-white text-xl font-bold flex justify-center'>
       <label htmlFor='stocks' >Add Stocks: </label>
       <input name={"input"}
                   type="text"
                   value={input}
                   onChange={handleInput}
                   required
                   className='w-[60%] mx-2'
                   ></input>
                   <button onClick={handleSubmit} className='mx-2 bg-[#198754]  text-white p-2 rounded-md dark:bg-[#3a3a3a]'>Save</button>
                   </div>
                 <div className=' w-full flex lg:grid lg:grid-cols-12'>  {stockData.map((stock, index) => (
                       <div className=' bg-green-500 w-[60px] rounded-sm m-2 flex' key={index} onClick={()=>handleSETSYM(stock.input)}  style={{ cursor: "pointer",padding: "5px" }}>
                         {stock.input}
                      </div>
      ))}
                  </div>

       <div className='p-4'>
        <TradingViewWidget sym={sym} stockflag={stockflag} thememode={thememode} />
         </div>



      </div>

      
    </div>
  )
}

export default Stocks