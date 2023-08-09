import React from "react";
import { Link } from 'react-router-dom';

import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__nav">
        <div className="header__left-column">
          <Link to="/">
            <div className="header__logo"></div>
          </Link>
        </div>
        <div className="header__right-column">

        </div>
      </div>
    </header>
  );
}

export default Header;