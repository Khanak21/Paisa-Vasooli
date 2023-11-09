import React, { useEffect } from 'react';
import { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';


function Navbar() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="outside">
 

      <div className={showNav?"content-link active":"content-link"}>
        <div className="box">DashBoard</div>
        <div className="box">Dues</div>
        <div className="box">Groups</div>
        <div className="box">Savings</div>
        <div className="box">Stocks</div>
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
