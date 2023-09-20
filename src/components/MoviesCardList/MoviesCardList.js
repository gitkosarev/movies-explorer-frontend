import React from 'react';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards, onCardLike, loadMoreMovies }) {
  function handleLoadMoreClick() {
    loadMoreMovies();
  };

  return (
    <section className="movies-card-list">
      <div className="cards">
        {cards.map((item) => (
          <MoviesCard
            key={item.id}
            card={item}
            onCardLike={onCardLike}
          />
        ))}
      </div>
      <button className="button cards__load"
        onClick={handleLoadMoreClick}
        type="button"
      >
        Ещё
      </button>
    </section>
  )
}

export default MoviesCardList;