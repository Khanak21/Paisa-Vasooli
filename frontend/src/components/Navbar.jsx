import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'
import 'tailwindcss/base.css'; // Import Tailwind CSS base styles
import 'tailwindcss/components.css'; // Import Tailwind CSS components styles
import 'tailwindcss/utilities.css'; // Import Tailwind CSS utilities styles
import './Navbar.css'
<<<<<<< Updated upstream
import { useNavigate } from 'react-router-dom';
=======
import ToggleBtn from './ToggleBtn';
>>>>>>> Stashed changes

function Navbar({thememode,toggle}) {
  const [showNav, setShowNav] = useState(false);
  // const [isLoggedin,setIsloggedIn]=useState(true)
  console.log(thememode)
  const navigate=useNavigate()

  return (
    <div className="flex gap-30 justify-between items-center bg-green-800 " style={{backgroundColor:thememode==="dark"?"black":"green"}}>
        <div className='text-2xl italic text-white font-extrabold'>
            Paisa Vasooli
         
        </div>
          

      <div className={showNav?" flex justify-between gap-12 p-4 text-white content-link active":"flex justify-evenly gap-12 p-4 text-white content-link"} style={{backgroundColor:thememode==="dark"?"black":"green"}}>

  
        <div className="font-bold text-white hover:cursor-pointer relative" onClick={()=>{navigate("/dashboard")}}>
        DashBoard
        </div>

<<<<<<< Updated upstream
        <div className="font-bold text-white hover:cursor-pointer" onClick={()=>{navigate("/dues")}}>Dues</div>
        <div className="font-bold text-white hover:cursor-pointer " onClick={()=>{navigate("/groups")}}>Groups</div>
        <div className="font-bold text-white hover:cursor-pointer " onClick={()=>{navigate("/savings")}}>Savings</div>
        <div className="font-bold text-white hover:cursor-pointer " onClick={()=>{navigate("/charts")}}>Charts</div>
        <div className="font-bold text-white hover:cursor-pointer " onClick={()=>{navigate("/stocks")}}>Stocks</div>
        <div className="font-bold text-white hover:cursor-pointer " onClick={()=>{navigate("/vault")}}>Vault</div>

        <div className="inside font-bold text-white hover:cursor-pointer " onClick={()=>{navigate("/login")}}>Logout</div>
        <div className="inside2 font-bold text-white hover:cursor-pointer " onClick={toggle} >Theme Toggle</div>
=======
        <div className="font-bold text-white hover:cursor-pointer"> <Link to='/dues' className='no-underline text-white'>Dues</Link></div>
        <div className="font-bold text-white hover:cursor-pointer ">Groups</div>
        <div className="font-bold text-white hover:cursor-pointer "><Link to='/saving' className='no-underline text-white' >Savings</Link></div>
        <div className="font-bold text-white hover:cursor-pointer "><Link to='/stocks'className='no-underline text-white' >Stocks</Link></div>
        <div className="inside font-bold text-white hover:cursor-pointer "><Link to='/login' className='no-underline text-white' >Logout</Link></div>
        <div className="inside2 font-bold text-white hover:cursor-pointer no-underline " onClick={toggle}  >Theme Toggle</div>
>>>>>>> Stashed changes
      </div>
      <div className="logout absolute border border-white rounded-md p-2 right-1 font-bold text-white hover:cursor-pointer hover:border-gray-300 hover:shadow-xl">
  <Link to='/login'>Logout</Link>
</div>
        <div className="toggle-nav flex flex-col justify-center items-center hover:cursor-pointer ">
       
         <ToggleBtn  thememode={thememode} toggle={toggle} /> 

        </div>


      <div className="icons" style={{color:thememode==="dark"?"white":"black",border:thememode==="dark"?"1px solid white":"1px solid black"}}>
        <div
          className={showNav ? 'icon-menu activemenu' : 'icon-menu'}
          onClick={() => setShowNav(!showNav)}
          
        >
          <FontAwesomeIcon icon={faBars} size="xl" />
        </div>

        <div
          className={showNav ? 'icon-crossX activeman' : 'icon-crossX'}
          onClick={() => setShowNav(!showNav)}
        >
          <FontAwesomeIcon icon={faTimes} size="xl" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
