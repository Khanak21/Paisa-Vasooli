import React, { useEffect,useState } from 'react'
import WeeklyChart from '../../components/Charts/WeeklyChart'
import MonthlyChart from '../../components/Charts/MonthlyChart'
import YearlyChart from '../../components/Charts/YearlyChart'
import axios from 'axios'
import Navbar from '../../components/Navbar'
import CategoryChart from '../../components/Charts/CategoryChart'
const Chart = ({user,setUser,thememode,toggle}) => {
    const [weeklyData,setWeeklyData]=useState([])
    const [monthlyData,setMonthlyData]=useState([])
    const [yearlyData,setYearlyData]=useState([])
    const [allCategories,setAllCategories]=useState([])
    const [incomeArray,setIncomeArray]=useState([])
    const [expenseArray,setExpenseArray]=useState([])
    const [categoryData,setCategoryData]=useState([])

    useEffect(()=>{

        //local storage
        const check=async()=>{
            try{
              const loggedInUser = localStorage.getItem("user");
              if (loggedInUser) {
                console.log(loggedInUser);
                const foundUser = JSON.parse(loggedInUser);
                console.log("found user",foundUser)
                await setUser(foundUser);
              }
            }catch(err){
              console.log(err)
            }
          }
          check()
       
      //fetching previous week's transaction data
       const getWeeklyData = async()=>{
        try{
            const res = await axios.get(`http://localhost:3001/api/transactions/getWeeklyTransaction/${user._id}`)
            console.log(res.data.weeklyData)
            setWeeklyData(res.data.weeklyData)

        }catch(err){
            console.log(err)
        }
       } 

       //fetching monthly transaction data
       const getMonthlyData = async()=>{
        try{
            const res = await axios.get(`http://localhost:3001/api/transactions/getMonthlyTransaction/${user._id}`)
            console.log("monthly data",res.data.monthlyData)
            setMonthlyData(res.data.monthlyData)

        }catch(err){
            console.log(err)
        }
       } 

       //fetching yearly transaction data
       const getYearlyData = async()=>{
        try{
            const res = await axios.get(`http://localhost:3001/api/transactions/getYearlyTransaction/${user._id}`)
            setYearlyData(res.data.yearlyData)

        }catch(err){
            console.log(err)
        }
       } 

       //fetching category-wise transactions
       const getCategory = async()=>{
        try{
          const res= await axios.get(`http://localhost:3001/api/transactions/getCategoryWiseTransaction/${user._id}`)
          const result = res.data
          setCategoryData(res.data)
          // Array of all categories
          const allCategories = result.map(item => item._id);
          setAllCategories(allCategories)
          console.log(allCategories)

          // Array of expenses for all categories
          const expenseArray = result.map(item => item.totalExpense);
          setExpenseArray(expenseArray)

          // Array of income for all categories
          const incomeArray = result.map(item => item.totalIncome);
          setIncomeArray(incomeArray)
        }catch(err){
          console.log(err)
        }
       }
       getWeeklyData()
       getMonthlyData()
       getYearlyData()
       getCategory()
    },[user._id])
    console.log(allCategories)

    

  return (
    <div style={{backgroundColor:thememode==="dark"?"#181818":"#f0f0f0"}} className='min-h-screen overflow-x-hidden'>
         {/* ------------ Navbar ------------------------ */}
        <Navbar thememode={thememode} toggle={toggle}/>

        {/* ----------------------- title --------------------------------  */}
        <div className='h-screen'>
      <div className='font-extrabold text-2xl mx-4 mt-4 dark:text-[#f0f0f0]'>Visualise your Transactions</div>
      <div className='mx-4 mb-4 text-gray-600 dark:text-gray-400'>Analyze how much you spent or earned on a weekly, monthly, yearly or category-wise basis</div>
      <div className='flex justify-around p-4'>
      <div className='grid grid-rows-2 grid-cols-2 gap-4'>
        <div className=''>
        <WeeklyChart weeklyData={weeklyData} thememode={thememode} toggle={toggle}/>
        </div>

         {/* ------------------------- Monthly Chart -------------------------  */}
        <div className=''>
        <MonthlyChart monthlyData={monthlyData} thememode={thememode}/>
        </div>
        <div className=''>
        <YearlyChart yearlyData={yearlyData} thememode={thememode}/>
        </div>
    </div>


   
        {/* ---------------------------------------------------------Category chart---------------------------------------------------------- */}
        <div className='flex align-middle'>
          <CategoryChart categoryData={categoryData} allCategories={allCategories} thememode={thememode} toggle={toggle}/>
        </div>
        
       </div>
       </div>
     </div>
  )
}

export default Chart