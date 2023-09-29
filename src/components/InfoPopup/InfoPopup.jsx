import React from "react";

import './InfoPopup.css';

/* import successImg from '../images/success.svg';
import unsuccessImg from '../images/unsuccess.svg'; */

function InfoPopup({ isOpen, messageData, onClose }) {

  return (
    <div className={`info-popup${isOpen ? " info-popup_opened" : ""}`} id="InfoPopup">
      <div className="info-popup__container">
        {/* <img className="info-popup__image info-popup__image_mode_signup" src={isSuccess ? successImg : unsuccessImg} alt={message} /> */}
        <p className={`info-popup__text${messageData.isError ? " info-popup__text_unsuccessful" : ""}`}>{messageData?.text}</p>
        <button className={`button button_color_blue info-popup__close-button${messageData.isError ? " info-popup__close-button_unsuccessful" : ""}`}
          type="button"
          onClick={onClose}
        >
          Понятно
        </button>
      </div>
    </div>
  );
};

export default InfoPopup;