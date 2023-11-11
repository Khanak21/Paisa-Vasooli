import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import TransactionCard from './components/TransactionCard';
import Dues from "./pages/Dues/Dues"
import Vault from "./pages/Vault"
import Savings from './pages/Savings/Savings';
import Chart from './pages/Chart/Chart';
function App() {
  const [user,setUser]=useState({})
  console.log(user)
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login user={user} setUser={setUser}/>} />
          <Route path="/login" element={<Login user={user} setUser={setUser}/>} />
          <Route path="/signup" element={<Signup user={user} setUser={setUser}/>} />
          <Route path="/navbar" element={<Navbar/>} />
          <Route path="/dashboard" element={<Dashboard user={user}/>} />
          <Route path="/transcard" element={<TransactionCard/>} />
          <Route path="/dues" element={<Dues/>} />
          <Route path="/vault" element={<Vault/>} />
          <Route path="/saving" element={<Savings user={user}/>} />
          <Route path="/charts" element={<Chart user={user}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
