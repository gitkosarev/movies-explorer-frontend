import React from "react";

import './Main.css';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';

function Main() {
  return (
    <main className="content">
      <Promo />
      <NavTab />
      <AboutProject />
    </main>
  );
}

export default Main;