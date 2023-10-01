import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import moviesApi from '../../utils/MoviesApi.js';
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
import InfoPopup from '../InfoPopup/InfoPopup';

import { cardArray, savedCardArray } from '../../utils/data';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({ id: "", name: "", email: "" });
  const [isLoading, setIsLoading] = React.useState(false);
  const [movieList, setMovieList] = React.useState([]);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [infoPopupData, setInfoPopupData] = React.useState({ text: "Информационное окно", isError: false });

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setUserInfo(jwt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getMovieList() {
    moviesApi.getMovies()
      .then((response) => {
        debugger
        setMovieList(response);
      })
      .catch(error => {
        console.error(error);
        openInfoPopup("Произошла ошибка при загрузке списка фильмов. Попробуйте позднее еще раз.", true);
      });
  };

  function setUserInfo(token) {
    mainApi.getUserInfo(token)
      .then((response) => {
        onLoginSuccess(response);
      })
      .catch(error => {
        localStorage.removeItem("jwt");
        console.error(error);
        openInfoPopup("Произошла ошибка при загрузке профиля.", true);
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
    setIsLoading(true);
    mainApi.signin(email, password)
      .then((response) => {
        localStorage.setItem("jwt", response.token);
        setUserInfo(response.token);
      })
      .catch(error => {
        console.error(error);
        if (error.status === 401) {
          openInfoPopup("Вы ввели неправильный логин или пароль.", true);
        } else if (error.status === 400) {
          openInfoPopup("Введенные данные некорректны.", true);
        } else {
          openInfoPopup("500 На сервере произошла ошибка.", true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function onSignUp({ name, email, password }) {
    setIsLoading(true);
    mainApi.signup(name, email, password)
      .then(() => {
        navigate("/signin");
      })
      .catch(error => {
        console.error(error);
        if (error.status === 409) {
          openInfoPopup("Пользователь с таким email уже существует.", true);
        } else {
          openInfoPopup("При регистрации пользователя произошла ошибка.", true);
        }
      })
      .finally(() => {
        setIsLoading(false);
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
    setIsLoading(true);
    mainApi.updateProfile(token, user.name, user.email)
      .then((response) => {
        setCurrentUser({
          ...currentUser,
          name: response.name,
          email: response.email
        });
        openInfoPopup("Данные успешно обновлены!", false);
      })
      .catch(error => {
        if (error.status === 401) {
          openInfoPopup("При авторизации произошла ошибка. Токен не передан или передан не в том формате.", true);
        } else if (error.status === 409) {
          openInfoPopup("Пользователь с таким email уже существует.", true);
        } else {
          openInfoPopup("При сохранении профиля произошла ошибка.", true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleSubmitSearch(values) {
    if (!values.search || values.search === "") {
      openInfoPopup("Нужно ввести ключевое слово.", true);
    } else {
      getMovieList();
    }
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

  function openInfoPopup(text, isError) {
    setInfoPopupData({ text, isError });
    setIsInfoPopupOpen(true);
  };

  function closeInfoPopup() {
    setIsInfoPopupOpen(false);
    setInfoPopupData({ text: "", isError: false });
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
              movieList={movieList}
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
      <InfoPopup isOpen={isInfoPopupOpen} messageData={infoPopupData} onClose={closeInfoPopup} />
    </CurrentUserContext.Provider>
  );
}

export default App;
