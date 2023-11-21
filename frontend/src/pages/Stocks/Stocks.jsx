import React, { useEffect, useState } from 'react'
import TradingViewWidget from '../../components/TradingViewWidget'
import Navbar from '../../components/Navbar'
import StockWidget from '../../components/StockWidget'
import axios from "axios"
import StockChart from '../../components/StockChart'
import HeatmapStocks from '../../components/HeatmapStocks'

const Stocks = ({user,thememode,toggle}) => {
  //   const [input,setInput]=useState({})
  //   // const [data,setData] = useState([{ ticker: 'AAPL', company: 'Apple' }])
  // const [stockData,setStockData]=useState(['AAPL'])
  // console.log(stockData)
  //   //handling user input for ticker symbol and company/crypto name
  //   const handleInput = e=>{
  //       setInput(prev=>([...prev,e.target.value]))
  //       console.log(input)
  //   }
  //   const handleSubmit = async()=>{
  //       try{
  //           const res=await axios.post(`http://localhost:3001/api/user/addStock/${user._id}`,{input})
  //           console.log(res.data.user.stocks)
  //           const val=res.data.user.stocks
  //           setStockData(prev=>([...prev,val]))
  //           setInput("")

  //       }catch(err){
  //           console.log(err)
  //       }
  //   }
  //   useEffect(()=>{
  //     const getStocks = async()=>{ try{ const res=await axios.get(`http://localhost:3001/api/user/getStocks/${user._id}`)
  //       console.log("widget",res.data)
  //       setStockData(res.data.val)
  //   }catch(err){
  //       console.log(err)
  //   }
  //   }
  //   getStocks()

  //   },[])


  return ( 
    <div>
        <Navbar thememode={thememode} toggle={toggle}/>
        {/* <div className="h-[60vh] border-2 mx-4 my-4 flex justify-center">
        <div className='flex flex-col border-3 w-1/3 mx-2 my-2 justify-center'>
            <input type='text' placeholder='Enter ticker symbol' className='my-2' name='ticker' onChange={handleInput('ticker')}></input>
        <button className='bg-[#198754] my-4 rounded-md py-2' onClick={handleSubmit}>Add</button>
        </div> */}


        {/* <StockWidget user={user} stockData={stockData}/> */}
        {/* {
            stockData?.map((data)=>(
             <StockChart data={data}/>
            )
            )
            
        }
        helooooooooooooo */}
        {/* </div> */}
        <div className="mx-auto my-auto h-[200vh] block justify-center items-center" style={{backgroundColor:thememode==="dark"?"#181818":"white"}} >
        <div className='flex w-full justify-center p-2 font-bold text-2xl' style={{color:thememode==="dark"?"white":"black"}}> Explore the Trendy Stocks...</div>
       <HeatmapStocks thememode={thememode}/>
        
       <div className='flex w-full justify-center p-2 font-bold text-2xl' style={{color:thememode==="dark"?"white":"black"}}> Search for a particular stock/crypto...</div>
        <div className='p-4'>
        <TradingViewWidget sym={"AAPL"} thememode={thememode} />
        {/* <TradingViewWidget sym={"MSFT"}/> */}
         </div>
   

        </div>
    </div>
  )
}

export default Stocks