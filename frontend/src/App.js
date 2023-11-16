import React, { useState,useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import TransactionCard from './components/TransactionCard';
import Dues from './pages/Dues/Dues'
import Vault from "./pages/Vault/Vault"
import Savings from './pages/Savings/Savings';
import Chart from './pages/Chart/Chart';
import Stocks from './pages/Stocks/Stocks';
import { Main } from './pages/Groups/Main';
import ToggleBtn from './components/ToggleBtn';
import Savings2 from './pages/Savings/Savings2';

function App() {
  const [user,setUser]=useState({})
  console.log(user)


  const storedTheme = localStorage.getItem('theme');
  const [thememode, setThememode] = useState(storedTheme || 'light');
  console.log(thememode)

  const toggle = () => {
    const newTheme = thememode === 'light' ? 'dark' : 'light';
    setThememode(newTheme);
    console.log(newTheme)
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark');
    document.querySelector('html').classList.add(thememode);
  }, [thememode]);

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

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login user={user} setUser={setUser} thememode={thememode} toggle={toggle} />} />
          <Route path="/login" element={<Login user={user} setUser={setUser}thememode={thememode} toggle={toggle}/>} />
          <Route path="/signup" element={<Signup user={user} setUser={setUser}thememode={thememode} toggle={toggle}/>} />
          <Route path="/navbar" element={<Navbar thememode={thememode} toggle={toggle} setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user}thememode={thememode} toggle={toggle} setUser={setUser}/>} />
          <Route path="/transcard" element={<TransactionCard thememode={thememode} toggle={toggle}/>} />
          <Route path="/dues" element={<Dues user={user}thememode={thememode} toggle={toggle} setUser={setUser}/>} />
          <Route path="/vault" element={<Vault thememode={thememode} toggle={toggle} user={user}/>} />
          <Route path="/savings" element={<Savings user={user} thememode={thememode} toggle={toggle} setUser={setUser}/>} />
          <Route path="/charts" element={<Chart user={user} thememode={thememode} toggle={toggle} />} />
          <Route path="/stocks" element={<Stocks user={user} thememode={thememode} toggle={toggle}/>} />
          <Route path="/groups" element={<Main user={user} thememode={thememode} toggle={toggle} setUser={setUser} />} />
          <Route path="/btn" element={<ToggleBtn thememode={thememode} toggle={toggle}/>}/>
          <Route path="/save" element={<Savings2 user={user} thememode={thememode} toggle={toggle} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
