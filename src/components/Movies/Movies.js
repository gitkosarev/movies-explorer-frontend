import React from "react";

import './Movies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function Movies({ isLoggedIn, isLoading, handleSubmitSearch, cards, onCardLike, loadMoreMovies }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} isThemeGrey={false} />
      <main className="movies">
        <SearchForm handleSubmitSearch={handleSubmitSearch} />
        {
          isLoading && <Preloader isActive={isLoading} />
        }
        {
          !isLoading
          &&
          <MoviesCardList
            cards={cards}
            onCardLike={onCardLike}
            loadMoreMovies={loadMoreMovies}
            isSavedCardMode={false}
          />
        }
      </main>
      <Footer />
    </>
  );
}

export default Movies;