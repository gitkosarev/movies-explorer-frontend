import React from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

import './Login.css';

import AuthForm from '../AuthForm/AuthForm';

function Login({ onSignIn }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const captions = {
    title: "Рады видеть!",
    submit: "Войти",
    extraText: "Ещё не зарегистрированы?",
    extraLinkText: "Регистрация",
    extraLink: "/signup",
  };

  function handleSubmit() {
    const { email, password } = values;
    onSignIn({ email, password });
  };

  return (
    <AuthForm captions={captions} handleSubmit={handleSubmit} isValid={isValid} >
      <label htmlFor="emailInput" className="auth__form-label">E-mail</label>
      <input className={`auth__form-input${errors.email ? " auth__form-input_not-valid" : ""}`}
        value={values.email ? values.email : ""}
        onChange={handleChange}
        id="emailInput"
        type="email"
        name="email"
        placeholder="Введите e-mail"
        required
        minLength="2"
        pattern="^[\w\.\%\+\-]+@[\w\.\-]+\.[a-zA-Z]{2,}$"
      />
      <span id="emailError" className={`auth__form-input-error${errors.email ? " auth__form-input-error_active" : ""}`}>{errors.email}</span>

      <label htmlFor="passwordInput" className="auth__form-label">Пароль</label>
      <input className={`auth__form-input${errors.password ? " auth__form-input_not-valid" : ""}`}
        value={values.password ? values.password : ""}
        onChange={handleChange}
        id="passwordInput"
        type="password"
        name="password"
        placeholder="Введите пароль"
        required
        minLength="6"
        maxLength="30"
      />
      <span id="passwordError" className={`auth__form-input-error${errors.password ? " auth__form-input-error_active" : ""}`}>{errors.password}</span>
    </AuthForm>
  );
}

export default Login;