import React from "react";

import './AboutMe.css';

function AboutMe({ avatar, githubLink }) {
  return (
    <section className="about" id="aboutSection">
      <h3 className="about__title">
        Студент
      </h3>
      <div className="about__content">
        <img className="about__content-image" alt="фото студента" src={avatar} />
        <div className="about__content-description">
          <h4 className="about__name">
            Вадим
          </h4>
          <h4 className="about__position">
            Фронтенд-разработчик, 33 года
          </h4>
          <p className="about__bio">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac tellus mauris. Nulla a nunc et elit molestie mattis eget ut eros.
             Aenean varius pretium erat, sit amet tristique dolor aliquet ac. Ut vitae magna non sapien pellentesque ornare.
              Nunc dictum blandit nunc non interdum. Aenean a aliquam nulla. In.
          </p>
          <a className="link about__link" href={githubLink} target="_blank" rel="noreferrer">
            Github
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;