import React from "react";

import './Promo.css';

function Promo() {
  return (
    <section className="promo" id="promoSection">
      <div className="promo__logo"></div>
      <p className="promo__text">
        Учебный проект студента&#10;факультета Веб-разработки.
      </p>
    </section>
  );
}

export default Promo;