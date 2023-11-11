import React, { useEffect } from 'react';
import { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const navigate=useNavigate()

  return (
    <div className="outside">
 

      <div className={showNav?"content-link active":"content-link"}>
        <div className="box" onClick={()=>navigate("/dashboard")}>DashBoard</div>
        <div className="box">Dues</div>
        <div className="box">Groups</div>
        <div className="box" onClick={()=>navigate("/saving")}>Savings</div>
        <div className="box" onClick={()=>navigate("/charts")}>Stocks</div>
        <div className="box" onClick={()=>navigate("/charts")}>Charts</div>

      </div>

   

    
      <div className="icons">
        <div className={showNav?'icon-menu activemenu':'icon-menu'} onClick={()=>setShowNav(!showNav)}>
          <FontAwesomeIcon icon={faBars} size="xl" />
        </div>

        <div className={showNav?'icon-crossX activeman':'icon-crossX'} onClick={() => setShowNav(!showNav)}>
          <FontAwesomeIcon icon={faTimes} size="xl"  />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
