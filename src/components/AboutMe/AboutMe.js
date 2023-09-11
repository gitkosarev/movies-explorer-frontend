import React from "react";

import './AboutMe.css';

function AboutMe({ photo }) {
  return (
    <section className="about" id="aboutSection">
      <h3 className="about__title">
        Студент
      </h3>
      <div className="about__content">
        <img className="about__content-column" alt="фото студента" src={photo} />
        <div className="about__content-column">
          <h4 className="about__name">
            Вадим
          </h4>
          <h4 className="about__position">
            Фронтенд-разработчик, 33 года
          </h4>
          <p className="about__bio">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className="about__link" href="https://github.com/gitkosarev" target="_blank" rel="noreferrer">
            Github
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;