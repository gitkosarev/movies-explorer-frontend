import React from "react";

import './SavedMovies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function SavedMovies({ isLoggedIn, isLoading, handleSubmitSearch, cards, onCardLike, loadMoreMovies }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} isThemeGrey={false} />
      <main className="saved-movies">
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
            isSavedCardMode={true}
          />
        }
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;