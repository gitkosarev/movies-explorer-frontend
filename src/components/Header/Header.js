import React from "react";
import { Link } from 'react-router-dom';

import './Header.css';

function Header({ isLoggedIn }) {
  return (
    <header className="header">
      <div className="header__column header__column_nav">
        <Link to="/">
          <div className="header__logo"></div>
        </Link>
        <Link className="link header__link" to="/films">
          Фильмы
        </Link>
        <Link className="link header__link" to="/favourite">
          Сохранённые фильмы
        </Link>
      </div>
      <div className="header__column header__column_account">
        <Link className="link header__signup" to="/signup">
          Регистрация
        </Link>
        <Link to="/signin">
          <button className="button button_color_blue header__button" type="button">
            Войти
          </button>
        </Link>
        <Link to="/account">
          <div className="header__account-button"></div>
        </Link>
      </div>
    </header>
  );
}

export default Header;