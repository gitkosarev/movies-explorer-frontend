import React from "react";

import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__info">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__columns">
        <p className="footer__column">&copy; {new Date().getFullYear()}</p>
        <nav className="footer__column">
          <ul className="footer__links">
            <li className="footer__link">
              <a className="link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__link">
              <a className="link" href="https://github.com/gitkosarev/" target="_blank" rel="noreferrer">
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;