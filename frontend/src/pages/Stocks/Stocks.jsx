import React, { useEffect, useState } from 'react'
import TradingViewWidget from '../../components/TradingViewWidget'
import Navbar from '../../components/Navbar'
import StockWidget from '../../components/StockWidget'
import axios from "axios"
import StockChart from '../../components/StockChart'

const Stocks = ({user}) => {
    const [input,setInput]=useState({})
    // const [data,setData] = useState([{ ticker: 'AAPL', company: 'Apple' }])
  const [stockData,setStockData]=useState([{ ticker: 'AAPL', company: 'Apple' }])
  console.log(stockData)
    //handling user input for ticker symbol and company/crypto name
    const handleInput = name=>e=>{
        setInput(prev=>({...prev,[name]:e.target.value}))
        console.log(input)
    }
    const handleSubmit = async()=>{
        try{
            const res=await axios.post(`http://localhost:3001/api/user/addStock/${user._id}`,{input})
            console.log(res.data.user.stocks)
            const val=res.data.user.stocks
            setStockData(prev=>[...prev,val])
            setInput({
                ticker:'',
                company:''
            })

        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
      const getStocks = async()=>{ try{ const res=await axios.get(`http://localhost:3001/api/user/getStocks/${user._id}`)
        console.log("widget",res.data)
        setStockData(res.data.val)
    }catch(err){
        console.log(err)
    }
    }
    getStocks()

    },[])


  return (
    <div>
        <Navbar/>
        {/* <div className="h-[60vh] border-2 mx-4 my-4 flex justify-center">
        <div className='flex flex-col border-3 w-1/3 mx-2 my-2 justify-center'>
            <input type='text' placeholder='Enter ticker symbol' className='my-2' name='ticker' onChange={handleInput('ticker')}></input>
            <input type='text' placeholder='Enter company/crypto name' className='my-2' name='company' onChange={handleInput('company')}></input>
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
        <div className="mx-4 my-4">
        <TradingViewWidget sym={"AAPL"}/>
        <TradingViewWidget sym={"MSFT"}/>

        </div>
    </div>
  )
}

export default Stocks