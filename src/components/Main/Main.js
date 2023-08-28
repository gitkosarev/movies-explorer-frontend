import React from "react";

import './Main.css';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';

function Main() {
  return (
    <main className="content">
      <Promo />
      <NavTab />
    </main>
  );
}

export default Main;