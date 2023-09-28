import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import './Header.css';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header({ isLoggedIn, isThemeGrey }) {
  const [isBurger, setIsBurger] = useState(false);
  const navigate = useNavigate();

  function onSignInClick() {
    navigate("/signin");
  };

  function onMenuClick() {
    setIsBurger(!isBurger);
  };

  return (
    <header className={`header${isThemeGrey ? " header_theme_grey" : ""}`}>
      {
        isLoggedIn
          ?
          <nav className={`header__nav header__nav_mode_authorized${isBurger ? " overlay" : ""}`}>
            <Logo />
            <Navigation isBurger={isBurger} onMenuClick={onMenuClick} />
          </nav>
          :
          <nav className="header__nav">
            <Logo />
            <Link className="link header__signup" to="/signup">Регистрация</Link>
            <button className="button button_color_blue header__signin" onClick={onSignInClick} type="button">Войти</button>
          </nav>
      }
    </header>
  );
}

export default Header;