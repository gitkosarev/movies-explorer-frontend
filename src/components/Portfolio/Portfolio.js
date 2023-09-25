import React from "react";

import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio" id="portfolioSection">
      <h2 className="portfolio__title">
        Портфолио
      </h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="link portfolio__link" href="https://github.com/gitkosarev/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт</a>
          <span className="portfolio__link-arrow">&#8599;</span>
        </li>
        <li className="portfolio__list-item">
          <a className="link portfolio__link" href="https://github.com/gitkosarev/russian-travel" target="_blank" rel="noreferrer">Адаптивный сайт</a>
          <span className="portfolio__link-arrow">&#8599;</span>
        </li>
        <li className="portfolio__list-item">
          <a className="link portfolio__link" href="https://github.com/gitkosarev/react-mesto-api-full-gha" target="_blank" rel="noreferrer">Одностраничное приложение</a>
          <span className="portfolio__link-arrow">&#8599;</span>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;