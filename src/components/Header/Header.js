import React from "react";
import { Link } from 'react-router-dom';

import './Header.css';

function Header({ isLoggedIn, isThemeGrey }) {
  return (
    <header className={`header${isThemeGrey ? " header_theme_grey" : ""}`}>
      <div className="header__column header__column_nav">
        <Link to="/">
          <div className="header__logo"></div>
        </Link>
        <Link className="link header__link" to="/movies">
          Фильмы
        </Link>
        <Link className="link header__link" to="/saved-movies">
          Сохранённые фильмы
        </Link>
      </div>
      <div className="header__column header__column_account">
        {
          !isLoggedIn &&
          <>
            <Link className="link header__signup" to="/signup">
              Регистрация
            </Link>
            <Link to="/signin">
              <button className="button button_color_blue header__button" type="button">
                Войти
              </button>
            </Link>
          </>
        }
        {
          isLoggedIn &&
          <Link to="/profile">
            <div className="header__account"></div>
          </Link>
        }
        {
          isLoggedIn &&
          <div className="header__menu"></div>
        }
      </div>
    </header>
  );
}

export default Header;