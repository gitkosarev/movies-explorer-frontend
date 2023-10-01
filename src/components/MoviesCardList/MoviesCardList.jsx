import React from 'react';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards, onCardLike, loadMoreMovies, isSavedCardMode }) {
  function handleLoadMoreClick() {
    loadMoreMovies();
  };

  return (
    <section className="movies-list">
      {
        cards.length > 0
          ?
          <>
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
            {
              !isSavedCardMode
              &&
              <button className="button movies-list__load" onClick={handleLoadMoreClick} type="button">Ещё</button>
            }
          </>
          :
          <>
            <p className="movies-list__info">Ничего не найдено.</p>
          </>
      }
    </section>
  )
}

export default MoviesCardList;