import React from "react";

import './Techs.css';

function Techs() {
  return (
    <section className="techs" id="techsSection">
      <h3 className="techs__title">
        Технологии
      </h3>
      <div className="techs__content">
        <h4 className="techs__subtitle">
          7 технологий
        </h4>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className="techs__list">
          <li className="techs__list-item">HTML</li>
          <li className="techs__list-item">CSS</li>
          <li className="techs__list-item">JS</li>
          <li className="techs__list-item">React</li>
          <li className="techs__list-item">Git</li>
          <li className="techs__list-item">Express.js</li>
          <li className="techs__list-item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;