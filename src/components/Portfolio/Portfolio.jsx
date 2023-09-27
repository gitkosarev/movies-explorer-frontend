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
          <a className="link portfolio__link" href="https://github.com/gitkosarev/how-to-learn" target="_blank" rel="noreferrer">
            <span className="portfolio__link-text">Статичный сайт</span>
            <span className="portfolio__link-arrow">&#8599;</span>
          </a>

        </li>
        <li className="portfolio__list-item">
          <a className="link portfolio__link" href="https://github.com/gitkosarev/russian-travel" target="_blank" rel="noreferrer">
            <span className="portfolio__link-text">Адаптивный сайт</span>
            <span className="portfolio__link-arrow">&#8599;</span>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="link portfolio__link" href="https://github.com/gitkosarev/react-mesto-api-full-gha" target="_blank" rel="noreferrer">
            <span className="portfolio__link-text">Одностраничное приложение</span>
            <span className="portfolio__link-arrow">&#8599;</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;