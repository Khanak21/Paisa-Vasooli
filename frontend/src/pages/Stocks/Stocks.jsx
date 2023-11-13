import React, { useState } from 'react'
import TradingViewWidget from '../../components/TradingViewWidget'
import Navbar from '../../components/Navbar'
import StockWidget from '../../components/StockWidget'
import axios from "axios"

const Stocks = ({user}) => {
    const [input,setInput]=useState({})
    // const [data,setData] = useState([{ ticker: 'AAPL', company: 'Apple' }])
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
            // setData(prev=>[...prev,val])

        }catch(err){
            console.log(err)
        }
    }


  return (
    <div>
        <Navbar/>
        <div className="h-[60vh] border-2 mx-4 my-4 flex justify-end">
        <div className='flex flex-col border-3 w-1/3 mx-2 my-2'>
            <input type='text' placeholder='Enter ticker symbol' className='my-2' name='ticker' onChange={handleInput('ticker')}></input>
            <input type='text' placeholder='Enter company/crypto name' className='my-2' name='company' onChange={handleInput('company')}></input>
        <button className='bg-[#198754] my-4 rounded-md py-2' onClick={handleSubmit}>Add</button>
        </div>


        <StockWidget user={user}/>
        </div>
        <div className="mx-4 my-4">
        {/* <TradingViewWidget/> */}
        </div>
    </div>
  )
}

export default Stocks