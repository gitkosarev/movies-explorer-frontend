import React from "react";

import './NavTab.css';

function NavTab() {
  return (
    <section className="nav-tab" id="navTabSection">
      <a className="link nav-tab__link" href="#aboutProjectSection">
        О проекте
      </a>
      <a className="link nav-tab__link" href="#techsSection">
        Технологии
      </a>
      <a className="link nav-tab__link" href="#aboutSection">
        Студент
      </a>
    </section>
  );
}

export default NavTab;