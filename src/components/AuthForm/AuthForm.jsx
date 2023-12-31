import React from 'react';
import { Link } from 'react-router-dom';

import './AuthForm.css';

import Logo from '../Logo/Logo';

function AuthForm({ children, handleSubmit, captions, isValid }) {
  function onSubmitClick(e) {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <main className="auth">
      <section className="auth__section">
        <Logo />
        <h1 className="auth__title">{captions?.title}</h1>
        <form className="auth__form"
          onSubmit={onSubmitClick}
          id="AuthForm"
          name="AuthForm"
          action="#"
          method="post"
          autoComplete="off"
        >
          <div className="auth__form-content">
            {children}
          </div>
          <button className={`button auth__submit${isValid ? "" : " auth__submit_disabled"}`}
            type="submit"
            disabled={!isValid}
          >{captions?.submit}</button>
        </form>
        <div className="auth__extra">
          <p className="auth__extra-text">{captions?.extraText}</p>
          <Link className="link auth__extra-link" to={captions?.extraLink}>{captions?.extraLinkText}</Link>
        </div>
      </section>
    </main>
  );
}

export default AuthForm;