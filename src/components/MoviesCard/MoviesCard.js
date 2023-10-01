import React from 'react';

import './MoviesCard.css';

import { getFormattedDuration } from '../../utils/DurationCalculator.js';

function MoviesCard({ card, onCardLike, isSavedCardMode }) {
  const [isLiked, setIsLiked] = React.useState(card.isLiked);
  let likeButtonClass = `button card__like-button${isLiked ? " card__like-button_active" : ""}`;
  if (isSavedCardMode) {
    likeButtonClass = `button card__like-button card__like-button_mode_delete`;
  }

  function handleLikeClick() {
    onCardLike(card, !isLiked, isSavedCardMode);
    setIsLiked(!isLiked);
  };

  return (
    <li className="card">
      <a className="link" href={card.trailerLink} target="_blank" rel="noreferrer">
        <img className="card__image" src={card.imageURL} alt={`фото ${card.nameRU}`} />
      </a>
      <div className="card__about">
        <h2 className="card__title">{card.nameRU}</h2>
        <button className={likeButtonClass} onClick={handleLikeClick} type="button"></button>
      </div>
      <p className="card__time">{getFormattedDuration(card.duration)}</p>
    </li>
  )
}

export default MoviesCard;