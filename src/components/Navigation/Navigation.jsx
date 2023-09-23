import React, { useState } from "react";
import { Link } from 'react-router-dom';

import './Navigation.css';
import '../Header/Header.css';

function Navigation() {
  const [isBurger, setIsBurger] = useState(false);

  function onMenuClick() {
    setIsBurger(!isBurger);
  };
  return (
    <div className={`navigation${isBurger ? " navigation_mode_burger" : ""}`}>
    <Link className={`link header__main${isBurger ? " header__main_mode_burger" : ""}`} to="/">Главная</Link>
      <Link className={`link header__movies${isBurger ? " header__movies_mode_burger" : ""}`} to="/movies">Фильмы</Link>
      <Link className={`link header__saved-movies${isBurger ? " header__saved-movies_mode_burger" : ""}`} to="/saved-movies">Сохранённые&nbsp;фильмы</Link>
      <Link to="/profile">
        <div className={`header__account${isBurger ? " header__account_mode_burger" : ""}`}></div>
      </Link>
      <div className={`header__menu${isBurger ? " header__menu_mode_burger" : ""}`}
        onClick={onMenuClick}
      ></div>
    </div>
  );
}

export default Navigation;