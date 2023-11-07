import React from 'react'
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TransactionCard from './components/TransactionCard';


function Layout() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/navbar" element={<Navbar/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/transcard" element={<TransactionCard/>} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default Layout
