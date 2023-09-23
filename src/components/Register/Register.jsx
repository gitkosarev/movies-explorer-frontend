import React, { useState } from 'react';

import './Register.css';

import AuthForm from '../AuthForm/AuthForm';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const captions = {
    title: "Добро пожаловать!",
    submit: "Зарегистрироваться",
    extraText: "Уже зарегистрированы?",
    extraLinkText: "Войти",
    extraLink: "/signin",
  };

  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };

  function handleSubmit() {
    alert("Регистрация прошла успешно!");
  };

  return (
    <AuthForm captions={captions} handleSubmit={handleSubmit}>
      <label htmlFor="nameInput" className="auth__form-label">Имя</label>
      <input className="auth__form-input"
        value={name}
        onChange={handleNameChange}
        id="nameInput"
        type="text"
        name="name"
        required
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
      />
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
      <input className="auth__form-input auth__form-input_not-valid"
        value={password}
        onChange={handlePasswordChange}
        id="passwordInput"
        type="password"
        name="password"
        required
        placeholder="Введите пароль"
        minLength="2"
        maxLength="40"
      />
      <span className="auth__form-input-error auth__form-input-error_active">Что-то пошло не так...</span>
    </AuthForm>
  );
}

export default Register;