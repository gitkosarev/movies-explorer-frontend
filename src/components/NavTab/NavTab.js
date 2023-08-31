import React from "react";

import './NavTab.css';

function NavTab() {
  return (
    <section className="nav-tab" id="navTabSection">
      <a className="link nav-tab__link" href="#aboutProjectSection">
        О проекте
      </a>
      {/* !!!! href */}
      <a className="link nav-tab__link" href="#promoSection">
        Технологии
      </a>
      {/* !!!! href */}
      <a className="link nav-tab__link" href="#promoSection">
        Студент
      </a>
    </section>
  );
}

export default NavTab;