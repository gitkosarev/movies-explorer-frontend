import React, { useState } from 'react';

import './Login.css';

import AuthForm from '../AuthForm/AuthForm';

function Login({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const captions = {
    title: "Рады видеть!",
    submit: "Войти",
    extraText: "Ещё не зарегистрированы?",
    extraLinkText: "Регистрация",
    extraLink: "/signup",
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };

  function handleSubmit() {
    onSignIn({ email, password });
  };

  return (
    <AuthForm captions={captions} handleSubmit={handleSubmit}>
      <label htmlFor="emailInput" className="auth__form-label">E-mail</label>
      <input className="auth__form-input"
        value={email}
        onChange={handleEmailChange}
        id="emailInput"
        type="email"
        name="email"
        required
        placeholder="Введите e-mail"
        minLength="2"
        maxLength="60"
      />
      <label htmlFor="passwordInput" className="auth__form-label">Пароль</label>
      <input className="auth__form-input"
        value={password}
        onChange={handlePasswordChange}
        id="passwordInput"
        type="password"
        name="password"
        required
        placeholder="Введите пароль"
        minLength="6"
        maxLength="40"
      />
    </AuthForm>
  );
}

export default Login;