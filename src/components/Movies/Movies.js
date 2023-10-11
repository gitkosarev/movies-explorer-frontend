import React, { useState, useEffect } from "react";

import './Movies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function Movies({ isLoggedIn, isLoading, handleSubmitSearch, cards, onCardLike, windowWidth, resetSearch }) {
  const [filteredCards, setFilteredCards] = useState([]);
  const [countInView, setCountInView] = useState(0);

  useEffect(() => {
    if (windowWidth >= 1280) {
      setCountInView(16);
    } else if (windowWidth < 1280 && windowWidth >= 768) {
      setCountInView(8);
    } else {
      setCountInView(5);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (cards.length > 0) {
      setFilteredCards(cards.slice(0, countInView));
    } else {
      setFilteredCards(cards);
    }
  }, [cards, countInView]);

  function loadMoreMovies() {
    if (windowWidth >= 1280) {
      setCountInView(countInView + 4);
    } else if (windowWidth < 1280 && windowWidth >= 768) {
      setCountInView(countInView + 2);
    } else {
      setCountInView(countInView + 2);
    }
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} isThemeGrey={false} />
      <main className="movies">
        <SearchForm
          isSavedCardMode={false}
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
            cards={filteredCards}
            onCardLike={onCardLike}
            loadMoreMovies={loadMoreMovies}
            isSavedCardMode={false}
            isLoadMoreVisible={cards.length > filteredCards.length}
          />
        }
      </main>
      <Footer />
    </>
  );
}

export default Movies;