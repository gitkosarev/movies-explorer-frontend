import React, { useEffect } from "react";

import './SavedMovies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function SavedMovies({ isLoggedIn, isLoading, handleSubmitSearch, cards, onCardLike, resetSearch }) {
  useEffect(() => {
    return resetSearch(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} isThemeGrey={false} />
      <main className="saved-movies">
        <SearchForm
          isSavedCardMode={true}
          handleSubmitSearch={handleSubmitSearch}
          onReset={resetSearch}
        />
        {
          isLoading && <Preloader isActive={isLoading} />
        }
        {
          !isLoading
          &&
          <MoviesCardList
            cards={cards}
            onCardLike={onCardLike}
            isSavedCardMode={true}
            isLoadMoreVisible={false}
          />
        }
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;