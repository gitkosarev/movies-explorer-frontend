import React from 'react';

import './MoviesCard.css';

import { imageServerURL } from '../../utils/Consts.js';
import { getFormattedDuration } from '../../utils/DurationCalculator.js';

function MoviesCard({ card, onCardLike, isSavedCardMode }) {
  // заменить на логику
  const isLiked = false;
  let likeButtonClass = `button card__like-button${isLiked ? " card__like-button_active" : ""}`;
  if (isSavedCardMode) {
    likeButtonClass = `button card__like-button card__like-button_mode_delete`;
  }

  function handleLikeClick() {
    onCardLike(card, !isLiked, isSavedCardMode);
  };

  return (
    <li>
      <a className="link card" href={card.trailerLink} target="_blank" rel="noreferrer">
        <img className="card__image" src={`${imageServerURL}${card.image.url}`} alt={`фото ${card.nameRU}`} />
        <div className="card__about">
          <h2 className="card__title">{card.nameRU}</h2>
          <button className={likeButtonClass} onClick={handleLikeClick} type="button"></button>
        </div>
        <p className="card__time">{getFormattedDuration(card.duration)}</p>
      </a>
    </li>
  )
}

export default MoviesCard;