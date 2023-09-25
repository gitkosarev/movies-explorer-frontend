import React from 'react';

import './MoviesCard.css';

import picture from '../../images/cards/mountain.png';

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
    <li className="card">
      {/* заменить на логику подстановки картинки */}
      <img className="card__image" src={picture} alt={`фото ${card.name}`} /* onClick={handleClick} */ />
      <div className="card__about">
        <h2 className="card__title">{card.name}</h2>
        <button className={likeButtonClass} onClick={handleLikeClick} type="button"></button>
      </div>
      <p className="card__time">{card.time}</p>
    </li>
  )
}

export default MoviesCard;