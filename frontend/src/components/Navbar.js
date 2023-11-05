import React from 'react';
import { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
// import logoImage from './images/Grow.jpeg';

function Navbar() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="outside">
      <div className="logo-image">
        <img src="" alt="" className="logoFinance" />
      </div>

      <div className={showNav?"content-link active":"content-link"}>
        <div className="box">Element1</div>
        <div className="box">Element2</div>
        <div className="box">Element3</div>
        <div className="box">Element4</div>
        <div className="box">Element5</div>
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
