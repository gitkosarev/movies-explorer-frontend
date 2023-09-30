import React from "react";

import './InfoPopup.css';

function InfoPopup({ isOpen, messageData, onClose }) {

  return (
    <div className={`info-popup${isOpen ? " info-popup_opened" : ""}`} id="InfoPopup">
      <div className="info-popup__container">
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