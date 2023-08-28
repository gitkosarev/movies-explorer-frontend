import React from "react";

import './NavTab.css';

function NavTab() {
  return (
    <section className="nav-tab" id="navTabSection">
      {/* !!!! href */}
      <a className="link nav-tab__link" href="#promoSection">
        О проекте
      </a>
      <a className="link nav-tab__link" href="#promoSection">
        Технологии
      </a>
      <a className="link nav-tab__link" href="#promoSection">
        Студент
      </a>
    </section>
  );
}

export default NavTab;