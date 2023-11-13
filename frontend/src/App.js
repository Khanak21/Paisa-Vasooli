
import React, { useState,useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TransactionCard from './components/TransactionCard';
import Dues from "./components/Dues"
import Vault from "./pages/Vault"
import Savings from './components/Savings';
function App() {
  const [user,setUser]=useState({})
  console.log(user)


  const storedTheme = localStorage.getItem('theme');
  const [thememode, setThememode] = useState(storedTheme || 'light');

  const toggle = () => {
    const newTheme = thememode === 'light' ? 'dark' : 'light';
    setThememode(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark');
    document.querySelector('html').classList.add(thememode);
  }, [thememode]);

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login user={user} setUser={setUser} thememode={thememode} toggle={toggle} />} />
          <Route path="/login" element={<Login user={user} setUser={setUser}thememode={thememode} toggle={toggle}/>} />
          <Route path="/signup" element={<Signup user={user} setUser={setUser}thememode={thememode} toggle={toggle}/>} />
          <Route path="/navbar" element={<Navbar thememode={thememode} toggle={toggle} />} />
          <Route path="/dashboard" element={<Dashboard user={user}thememode={thememode} toggle={toggle}/>} />
          <Route path="/transcard" element={<TransactionCard thememode={thememode} toggle={toggle}/>} />
          <Route path="/dues" element={<Dues user={user}thememode={thememode} toggle={toggle}/>} />
          <Route path="/vault" element={<Vault thememode={thememode} toggle={toggle}/>} />
          <Route path="/saving" element={<Savings user={user} thememode={thememode} toggle={toggle}/>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
