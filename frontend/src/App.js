
import React, { useState,useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Signup from './pages/Signup/Signup.jsx';
import Login from './pages/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import TransactionCard from './components/Cards/TransactionCard.jsx';
import Dues from "./pages/Dues/Dues"
import Vault from "./pages/Vault/Vault"
import Chart from './pages/Chart/Chart';
import Stocks from './pages/Stocks/Stocks';
import { Main } from './pages/Groups/Main';
import ToggleBtn from './components/Toggle/ToggleBtn.jsx';
import Savings2 from './pages/Savings/Savings2';
import SimplifyDebt from './pages/Groups/SimplifyDebt.jsx'
import Grouphome from './pages/Groups/Grouphome.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Inbox from './pages/Inbox/inbox.jsx';


function App() {

  const [user,setUser]=useState({})
  const [groupData,setgroupData]=useState([])

  console.log(user)

  const storedTheme = localStorage.getItem('theme');
  const [thememode, setThememode] = useState(storedTheme || 'light');

  //function to toggle between light and dark mode
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

  //function to get user data from local storage
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
          <Route path="/navbar" element={<Navbar user={user} thememode={thememode} toggle={toggle} setUser={setUser}/>} />
          <Route path="/dashboard" element={<Dashboard user={user}thememode={thememode} toggle={toggle} setUser={setUser}/>} />
          <Route path="/transcard" element={<TransactionCard thememode={thememode} toggle={toggle}/>} />
          <Route path="/dues" element={<Dues user={user}thememode={thememode} toggle={toggle}/>} />
          <Route path="/vault" element={<Vault user={user} thememode={thememode} toggle={toggle}/>} />
          <Route path="/savings" element={<Savings2 user={user} thememode={thememode} toggle={toggle} />} />
          <Route path="/charts" element={<Chart user={user} setUser={setUser} thememode={thememode} toggle={toggle} />} />
          <Route path="/stocks" element={<Stocks user={user} thememode={thememode} toggle={toggle}/>} />
          <Route path="/groups" element={<Main user={user} thememode={thememode} toggle={toggle} groupData={groupData} setgroupData={setgroupData} />} />
          <Route path="/billsplit/:id" element={<Grouphome user={user} thememode={thememode} toggle={toggle}/>}/>
          <Route path="/simplifydebt/:id" element={<SimplifyDebt user={user} thememode={thememode} toggle={toggle}/>}/>
          <Route path="/btn" element={<ToggleBtn thememode={thememode} toggle={toggle}/>}/>
          <Route path="/save" element={<Savings2 user={user} thememode={thememode} toggle={toggle} />} />
          <Route path='/simplify' element={<SimplifyDebt user={user} thememode={thememode} toggle={toggle}/>}></Route>
          <Route path="/profile" element={<Profile user={user} thememode={thememode} toggle={toggle} setUser={setUser}/>} />
          <Route path="/billsplit" element={<Grouphome user={user} thememode={thememode} toggle={toggle}/>}/>
          <Route path="/inbox" element={<Inbox user={user} setUser={setUser} thememode={thememode} toggle={toggle}/>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
