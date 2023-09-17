import React from "react";

import './Movies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function Movies({ isLoggedIn, isLoading, handleSubmitSearch }) {
  return (
    <main className="movies">
      <Header isLoggedIn={isLoggedIn} isThemeGrey={false} />
      <SearchForm handleSubmitSearch={handleSubmitSearch} />
      <Preloader isActive={isLoading} />
      <Footer />
    </main>
  );
}

export default Movies;