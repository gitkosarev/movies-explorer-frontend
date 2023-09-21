import React from "react";

import './SavedMovies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function SavedMovies({ isLoggedIn, isLoading, handleSubmitSearch, cards, onCardLike, loadMoreMovies }) {
  return (
    <main className="saved-movies">
      <Header isLoggedIn={isLoggedIn} isThemeGrey={false} />
      <SearchForm handleSubmitSearch={handleSubmitSearch} />
      <MoviesCardList
        cards={cards}
        onCardLike={onCardLike}
        loadMoreMovies={loadMoreMovies}
        isSavedCardMode={true}
      />
      <Preloader isActive={isLoading} />
      <Footer />
    </main>
  );
}

export default SavedMovies;