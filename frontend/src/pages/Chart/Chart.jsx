import React, { useEffect,useState } from 'react'
import WeeklyChart from '../../components/WeeklyChart'
import MonthlyChart from '../../components/MonthlyChart'
import YearlyChart from '../../components/YearlyChart'
import axios from 'axios'
import Navbar from '../../components/Navbar'
const Chart = ({user,thememode,toggle}) => {
    const [weeklyData,setWeeklyData]=useState([])
    const [monthlyData,setMonthlyData]=useState([])
    const [yearlyData,setYearlyData]=useState([])


    useEffect(()=>{
       const getWeeklyData = async()=>{
        try{
            const res = await axios.get(`http://localhost:3001/api/transactions/getWeeklyTransaction/${user._id}`)
            console.log(res.data.weeklyData)
            setWeeklyData(res.data.weeklyData)

        }catch(err){
            console.log(err)
        }
       } 
       const getMonthlyData = async()=>{
        try{
            const res = await axios.get(`http://localhost:3001/api/transactions/getMonthlyTransaction/${user._id}`)
            setMonthlyData(res.data.monthlyData)

        }catch(err){
            console.log(err)
        }
       } 
       const getYearlyData = async()=>{
        try{
            const res = await axios.get(`http://localhost:3001/api/transactions/getYearlyTransaction/${user._id}`)
            setYearlyData(res.data.yearlyData)

        }catch(err){
            console.log(err)
        }
       } 
       getWeeklyData()
       getMonthlyData()
       getYearlyData()


    },[])

  return (
    <div>
        <Navbar thememode={thememode} toggle={toggle}/>
    <div className='flex flex-col justify-center items-center w-full p-2 gap-3'  style={{backgroundColor:thememode==="dark"?"#000435":"white"}}>
      <div className='w-full flex justify-evenly items-center'>
          <div className='font-bold text-5xl  flex justify-center items-center' style={{fontFamily:'Sofia Sans Condensed, sans-serif',fontStyle:"italic",color:"darkblue"}}>Weekly Chart</div>
        <div className='w-[800px]'>
        <WeeklyChart weeklyData={weeklyData}/>
        </div>

    </div>

    <div className='w-full flex justify-evenly items-center'>
        <div className='w-[800px]'>
        <MonthlyChart monthlyData={monthlyData}/>
        </div>
    <div className='font-bold text-5xl flex justify-center items-center'  style={{fontFamily:'Sofia Sans Condensed, sans-serif',fontStyle:"italic",color:"darkblue"}}>Monthly Chart</div>

    </div>

    <div className='w-full flex justify-evenly items-center'>
    <div className='font-bold text-5xl flex justify-center items-center'  style={{fontFamily:'Sofia Sans Condensed, sans-serif',fontStyle:"italic",color:"darkblue"}}>Yearly Chart</div>
        <div className='w-[800px]'>
           
        <YearlyChart yearlyData={yearlyData}/>
        </div>
    </div>
      </div>
    </div>
  )
}

export default Chart