import React from 'react';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards, onCardLike, loadMoreMovies, isSavedCardMode }) {
  function handleLoadMoreClick() {
    loadMoreMovies();
  };

  return (
    <section className="movies-list">
      <ul className="cards">
        {cards.map((item) => (
          <MoviesCard
            key={item.id}
            card={item}
            onCardLike={onCardLike}
            isSavedCardMode={isSavedCardMode}
          />
        ))}
      </ul>
      <button className="button movies-list__load" onClick={handleLoadMoreClick} type="button">Ещё</button>
    </section>
  )
}

export default MoviesCardList;