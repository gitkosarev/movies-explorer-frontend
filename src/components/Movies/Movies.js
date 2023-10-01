import React from "react";

import './Movies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function Movies({ isLoggedIn, isLoading, handleSubmitSearch, movieList, cards, onCardLike, loadMoreMovies }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} isThemeGrey={false} />
      <main className="movies">
        <SearchForm handleSubmitSearch={handleSubmitSearch} />
        <MoviesCardList
          cards={cards}
          onCardLike={onCardLike}
          loadMoreMovies={loadMoreMovies}
          isSavedCardMode={false}
        />
        <Preloader isActive={isLoading} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;