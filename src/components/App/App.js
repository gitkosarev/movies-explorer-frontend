import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import auth from '../../utils/Auth.js';
import mainApi from '../../utils/MainApi.js';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Profile from '../Profile/Profile';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import { cardArray, savedCardArray } from '../../utils/data';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({ id: "", name: "", email: "" });
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setUserInfo(jwt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setUserInfo(token) {
    auth.getUserInfo(token)
      .then((response) => {
        onLoginSuccess(response);
      })
      .catch(error => {
        localStorage.removeItem("jwt");
        // todo: добавить модальное окно с ошибкой для пользователя
        alert(`status: ${error.status}. Error: ${error.statusText}`);
      });
  };

  function onLoginSuccess(user) {
    setIsLoggedIn(true);
    setCurrentUser({
      id: user._id,
      name: user.name,
      email: user.email
    });
    navigate("/movies", { replace: true });
  };

  function onSignIn({ email, password }) {
    auth.signin(email, password)
      .then((response) => {
        localStorage.setItem("jwt", response.token);
        setUserInfo(response.token);
      })
      .catch(error => {
        // todo: добавить модальное окно с ошибкой для пользователя
        alert(`status: ${error.status}. Error: ${error.statusText}`);
      });
  };

  function onSignUp({ name, email, password }) {
    auth.signup(name, email, password)
      .then(() => {
        navigate("/signin");
      })
      .catch(error => {
        // todo: добавить модальное окно с ошибкой для пользователя
        alert(`status: ${error.status}. Error: ${error.statusText}`);
      });
  };

  function onSignOut() {
    if (isLoggedIn) {
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      navigate("/", { replace: true });
    }
  };

  function onEditProfile(user) {
    const token = localStorage.getItem("jwt");
    mainApi.updateProfile(token, user.name, user.email)
      .then((response) => {
        setCurrentUser({
          ...currentUser,
          name: response.name,
          email: response.email
        });
        alert("Данные успешно обновлены!");
      })
      .catch(error => {
        // todo: добавить модальное окно с ошибкой для пользователя
        if (error.status === 401) {
          alert("При авторизации произошла ошибка. Токен не передан или передан не в том формате.");
        } else if (error.status === 409) {
          alert("Пользователь с таким email уже существует.");
        }
      });
  };

  function handleSubmitSearch(values) {
    alert(`search_value: ${values.search}, search_option: ${values.isShortFilm}`);
  };

  function handleCardLike(card, isLiked, isSavedCardMode) {
    if (isSavedCardMode) {
      alert("card DELETED");
    } else {
      if (isLiked) {
        alert("card LIKED!");
      } else {
        alert("card DISLIKED!");
      }
    }
  };

  function loadMoreMovies() {
    alert("load more movies clicked!");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path="/signup"
          element={
            <Register onSignUp={onSignUp} />
          }
        />
        <Route
          path="/signin"
          element={
            <Login onSignIn={onSignIn} />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              component={Profile}
              isLoggedIn={isLoggedIn}
              editProfile={onEditProfile}
              signOut={onSignOut}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute
              component={Movies}
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
              handleSubmitSearch={handleSubmitSearch}
              cards={cardArray}
              onCardLike={handleCardLike}
              loadMoreMovies={loadMoreMovies}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <ProtectedRoute
                component={SavedMovies}
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                handleSubmitSearch={handleSubmitSearch}
                cards={savedCardArray}
                onCardLike={handleCardLike}
                loadMoreMovies={loadMoreMovies}
              />
            </>
          }
        />
        <Route
          path="*"
          element={
            <PageNotFound />
          }
        />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
