import React from 'react'
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function Layout() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/navbar" element={<Navbar/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default Layout
