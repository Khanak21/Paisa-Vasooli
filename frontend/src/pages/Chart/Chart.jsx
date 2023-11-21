import React, { useEffect,useState } from 'react'
import WeeklyChart from '../../components/WeeklyChart'
import MonthlyChart from '../../components/MonthlyChart'
import YearlyChart from '../../components/YearlyChart'
import axios from 'axios'
import Navbar from '../../components/Navbar'
import CategoryChart from '../../components/CategoryChart'
const Chart = ({user,setUser,thememode,toggle}) => {
    const [weeklyData,setWeeklyData]=useState([])
    const [monthlyData,setMonthlyData]=useState([])
    const [yearlyData,setYearlyData]=useState([])
    const [allCategories,setAllCategories]=useState([])
    const [incomeArray,setIncomeArray]=useState([])
    const [expenseArray,setExpenseArray]=useState([])
    const [categoryData,setCategoryData]=useState([])




    // useEffect(()=>{
    //     const check=async()=>{
    //       try{
    //         const loggedInUser = localStorage.getItem("user");
    //         if (loggedInUser) {
    //           console.log(loggedInUser);
    //           const foundUser = JSON.parse(loggedInUser);
    //           console.log("found user",foundUser  )
    //           await setUser(foundUser);
    //         }
    //       }catch(err){
    //         console.log(err)
    //       }
    //     }
    //     check()
    //   },[user._id])
    useEffect(()=>{
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
            console.log(res.data.monthlyData)
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
    <div className='min-h-screen w-screen flex flex-col items-start'  style={{backgroundColor:thememode==="dark"?"rgb(85, 98, 106)":"white"}} >
        <Navbar thememode={thememode} toggle={toggle}/>
    <div className='flex flex-col justify-center items-center w-full p-2 gap-3'  style={{backgroundColor:thememode==="dark"?"#181818":"white",color: thememode=="dark"?"white":"black"}}>
      <div className='w-full flex justify-evenly items-center'>
          <div className='font-bold text-5xl  flex justify-center items-center' style={{fontFamily:'Sofia Sans Condensed, sans-serif',fontStyle:"italic",color:thememode=="dark"?"white":"darkblue"}}>Weekly Chart</div>
        <div className='w-[800px]'>
        <WeeklyChart weeklyData={weeklyData} thememode={thememode} toggle={toggle}/>
        </div>

    </div>

    <div className='w-full flex justify-evenly items-center'>
        <div className='w-[800px]'>
        <MonthlyChart monthlyData={monthlyData} thememode={thememode}/>
        </div>
    <div className='font-bold text-5xl flex justify-center items-center'  style={{fontFamily:'Sofia Sans Condensed, sans-serif',fontStyle:"italic",color:thememode=="dark"?"white":"darkblue"}}>Monthly Chart</div>

    </div>

    <div className='w-full flex justify-evenly items-center'>
    <div className='font-bold text-5xl flex justify-center items-center'  style={{fontFamily:'Sofia Sans Condensed, sans-serif',fontStyle:"italic",color:thememode=="dark"?"white":"darkblue"}}>Yearly Chart</div>
        <div className='w-[800px]'>
           
        <YearlyChart yearlyData={yearlyData} thememode={thememode}/>
        </div>
    </div>

   

      <div className='w-full flex justify-evenly items-center'>
        <div className='w-[800px] h-[600px]'>
          <CategoryChart categoryData={categoryData} allCategories={allCategories} thememode={thememode} toggle={toggle}/>
        </div>
        <div className='font-bold text-5xl flex justify-center items-center'  style={{fontFamily:'Sofia Sans Condensed, sans-serif',fontStyle:"italic",color:thememode=="dark"?"white":"darkblue"}}>
          Category-wise Expenses
        </div>
       </div>

      </div>
    </div>
  )
}

export default Chart