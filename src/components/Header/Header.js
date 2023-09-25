import React from "react";
import { Link, useNavigate } from 'react-router-dom';

import './Header.css';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header({ isLoggedIn, isThemeGrey }) {
  const navigate = useNavigate();

  function onSignInClick() {
    navigate("/signin");
  };

  return (
    <header className={`header${isThemeGrey ? " header_theme_grey" : ""}`}>
      {
        isLoggedIn
          ?
          <div className="header__nav header__nav_mode_authorized">
            <Logo />
            <Navigation />
          </div>
          :
          <div className="header__nav">
            <Logo />
            <Link className="link header__signup" to="/signup">Регистрация</Link>
            <button className="button button_color_blue header__signin" onClick={onSignInClick} type="button">Войти</button>
          </div>
      }
    </header>
  );
}

export default Header;