import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

import './Profile.css';

import Header from '../Header/Header';

function Profile({ isLoggedIn, editProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setDefaultValues, errors, isValid } = useFormWithValidation();
  const [isEdittingMode, setIsEdittingMode] = useState(false);

  useEffect(() => {
    const { name, email } = currentUser;
    setDefaultValues({
      ...values,
      name,
      email
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setIsEdittingMode(false);
    const { name, email } = values;
    editProfile({ name, email });
  };

  function handleSignOut() {
    onSignOut();
  };

  function getIsReallyValid() {
    return isValid && (currentUser.name !== values.name || currentUser.email !== values.email);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} isThemeGrey={false} />
      <main className="profile">
        <section className="profile__section">
          <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
          <form className="profile__form"
            onSubmit={handleSubmit}
            id="ProfileForm"
            name="ProfileForm"
            action="#"
            method="post"
            autoComplete="off"
          >
            <div className="profile__form-row">
              <label htmlFor="nameInput" className="profile__label">
                Имя
              </label>
              <input className="profile__input"
                value={values.name ? values.name : currentUser.name}
                onChange={handleChange}
                id="nameInput"
                type="text"
                name="name"
                required
                readOnly={!isEdittingMode}
                placeholder="Имя"
                minLength="2"
                maxLength="30"
                pattern="^[a-zA-Zа-яА-Я\s\-]+$"
              />
            </div>
            <span className={`profile__form-input-error${errors.name ? " profile__form-input-error_active" : ""}`}>{errors?.name}</span>
            <div className="profile__form-row">
              <label htmlFor="emailInput" className="profile__label">
                E-mail
              </label>
              <input className="profile__input"
                value={values.email ? values.email : currentUser.email}
                onChange={handleChange}
                id="emailInput"
                type="email"
                name="email"
                placeholder="E-mail"
                required
                readOnly={!isEdittingMode}
                minLength="2"
                pattern="^[\w\.\%\+\-]+@[\w\.\-]+\.[a-zA-Z]{2,}$"
              />
            </div>
            <span className={`profile__form-input-error${errors.email ? " profile__form-input-error_active" : ""}`}>{errors?.email}</span>
            {
              isEdittingMode
              &&
              <button className={`button button_color_blue profile__submit${getIsReallyValid() ? "" : " profile__submit_disabled"}`}
                type="submit"
                disabled={!getIsReallyValid()}
              >Сохранить</button>
            }
          </form>
          {
            !isEdittingMode
            &&
            <>
              <button className="button profile__edit"
                type="button"
                onClick={() => setIsEdittingMode(true)}
              >Редактировать</button>
              <button className="button profile__sign-out"
                type="button"
                onClick={handleSignOut}
              >Выйти из аккаунта</button></>
          }
        </section>
      </main>
    </>
  );
}

export default Profile;