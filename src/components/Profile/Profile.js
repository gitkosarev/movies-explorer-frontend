import React, { useState, useEffect } from 'react';

import './Profile.css';

import Header from '../Header/Header';

function Profile({ isLoggedIn, saveProfile, signOut, currentUser }) {
  // добавить контекст пользователя
  /* const currentUser = useContext(CurrentUserContext); */

  const [name, setName] = useState("Vadim");
  const [email, setEmail] = useState("vadim@ya.ru");

  useEffect(() => {
    setName(currentUser?.name);
    setEmail(currentUser?.email);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    saveProfile({ name, email });
  };

  function handleSignOut() {
    signOut();
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} isThemeGrey={false} />
      <main className="profile">
        <section className="profile__section">
          <h2 className="profile__title">{`Привет, ${currentUser?.name}!`}</h2>
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
                value={name}
                onChange={handleNameChange}
                id="nameInput"
                type="text"
                name="name"
                required
                placeholder="Имя"
                minLength="2"
                maxLength="40"
              />
            </div>
            <div className="profile__form-row">
              <label htmlFor="emailInput" className="profile__label">
                E-mail
              </label>
              <input className="profile__input"
                value={email}
                onChange={handleEmailChange}
                id="emailInput"
                type="email"
                name="email"
                required
                placeholder="E-mail"
                minLength="2"
                maxLength="60"
              />
            </div>
            <button className="button profile__submit" type="submit">
              Редактировать
            </button>
          </form>
          <button className="button profile__sign-out" onClick={handleSignOut} type="button">
            Выйти из аккаунта
          </button>
        </section>
      </main>
    </>
  );
}

export default Profile;