import React from "react";
import { Link } from 'react-router-dom';

import './Header.css';

import Logo from '../Logo/Logo';

function Header({ isLoggedIn, isThemeGrey }) {
  return (
    <header className={`header${isThemeGrey ? " header_theme_grey" : ""}`}>
      <div className="header__column header__column_nav">
        <Logo />
        <Link className="link header__link header__link_position_first" to="/movies">
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