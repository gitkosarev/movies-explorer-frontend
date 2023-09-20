import React from 'react';

import './MoviesCard.css';

import picture from '../../images/cards/mountain.png';

function MoviesCard({ card, onCardLike }) {
  // заменить на логику
  const isLiked = true;

  function handleLikeClick() {
    onCardLike(card, isLiked);
  };

  return (
    <article className="card">
      {/* заменить на логику подстановки картинки */}
      <img className="card__image" src={picture} alt={`фото ${card.name}`} /* onClick={handleClick} */ />
      <div className="card__about">
        <h2 className="card__title">{card.name}</h2>
        <button className={`button card__like-button${isLiked ? " card__like-button_active" : ""}`}
          onClick={handleLikeClick}
          type="button">
        </button>
      </div>
      <p className="card__time">{card.time}</p>
    </article>
  )
}

export default MoviesCard;