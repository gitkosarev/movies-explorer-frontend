import React from "react";

import './Main.css';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function Main({ avatar, githubLink }) {
  return (
    <main className="content">
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe avatar={avatar} githubLink={githubLink} />
    </main>
  );
}

export default Main;