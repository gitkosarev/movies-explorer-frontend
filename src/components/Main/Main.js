import React from "react";

import './Main.css';
import avatarImage from '../../images/avatar.png';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

function Main({ isLoggedIn }) {
  const githubLink = "https://github.com/gitkosarev";
  return (
    <>
      <Header isLoggedIn={isLoggedIn} isThemeGrey={true} />
      <main className="main">
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe avatar={avatarImage} githubLink={githubLink} />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main;