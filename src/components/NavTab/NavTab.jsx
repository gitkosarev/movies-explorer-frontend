import React from "react";

import './NavTab.css';

function NavTab() {
  return (
    <section className="nav-tab" id="navTabSection">
      <nav>
        <ul className="nav-tab_menu">
          <li>
            <a className="link nav-tab__link" href="#aboutProjectSection">О проекте</a>
          </li>
          <li>
            <a className="link nav-tab__link" href="#techsSection">Технологии</a>
          </li>
          <li>
            <a className="link nav-tab__link" href="#aboutSection">Студент</a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default NavTab;