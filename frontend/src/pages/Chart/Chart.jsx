import React, { useEffect,useState } from 'react'
import WeeklyChart from '../../components/WeeklyChart'
import MonthlyChart from '../../components/MonthlyChart'
import YearlyChart from '../../components/YearlyChart'
import axios from 'axios'
import Navbar from '../../components/Navbar'
const Chart = ({user}) => {
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
        <Navbar/>
        <div className='w-[800px]'>
            Weekly chart
        <WeeklyChart weeklyData={weeklyData}/>
        </div>
        <div className='w-[800px]'>
            Monthly chart
        <MonthlyChart monthlyData={monthlyData}/>
        </div>
        <div className='w-[800px]'>
            Yearly chart
        <YearlyChart yearlyData={yearlyData}/>
        </div>

    </div>
  )
}

export default Chart