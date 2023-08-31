import React from "react";

import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="aboutProjectSection">
      <h2 className="about-project__title">
        О проекте
      </h2>
      <div className="about-project__info">
        <div className="about-project__info-column">
          <h3 className="about-project__info-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__info-text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__info-column">
          <h3 className="about-project__info-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__info-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__">
        Timeline
      </div>
    </section>
  );
}

export default AboutProject;