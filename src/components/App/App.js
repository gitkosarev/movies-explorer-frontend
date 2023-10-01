import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import moviesApi from '../../utils/MoviesApi.js';
import mainApi from '../../utils/MainApi.js';
import { imageServerURL } from '../../utils/Consts.js';

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

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({ id: "", name: "", email: "" });
  const [isLoading, setIsLoading] = React.useState(false);
  const [movieList, setMovieList] = React.useState([]);
  const [savedMovieList, setSavedMovieList] = React.useState([]);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [infoPopupData, setInfoPopupData] = React.useState({ text: "Информационное окно", isError: false });

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      initData(jwt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initData(token) {
    Promise.all([mainApi.getUserInfo(token), mainApi.getSavedMovies(token)])
      .then(([user, savedMovies]) => {
        setCurrentUser({
          id: user._id,
          name: user.name,
          email: user.email
        });
        setSavedMovieList(savedMovies.map((item) => {
          item.id = item.movieId;
          item.imageURL = item.image;
          return item;
        }));

        setIsLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch(error => {
        localStorage.removeItem("jwt");
        console.error(error);
        openInfoPopup("Произошла ошибка при загрузке данных пользователя.", true);
      });
  };

  function onSignIn({ email, password }) {
    setIsLoading(true);
    mainApi.signin(email, password)
      .then((response) => {
        localStorage.setItem("jwt", response.token);
        initData(response.token);
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
      setMovieList([]);
      setSavedMovieList([]);
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

  function getMovieList() {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((response) => {
        setMovieList(response.map((item) => {
          item.imageURL = `${imageServerURL}${item?.image?.url}`;
          item.isLiked = savedMovieList.some((x => x.id === item.id));
          item.thumbnail = `${imageServerURL}${item?.image?.formats?.thumbnail?.url}`;
          return item;
        }));
      })
      .catch(error => {
        console.error(error);
        openInfoPopup("Произошла ошибка при загрузке списка фильмов. Попробуйте позднее еще раз.", true);
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

  function addMovieToSaved(movie) {
    const token = localStorage.getItem("jwt");
    mainApi.saveMovie(token, movie)
      .then((response) => {
        movie._id = response._id;
        setSavedMovieList([movie, ...savedMovieList]);
        setMovieList(movieList.map((item) => {
          if (item.id === movie.id) {
            item.isLiked = true;
          }
          return item;
        }));
      })
      .catch(error => {
        console.error(error);
        openInfoPopup("Произошла ошибка при сохранении фильма. Попробуйте позднее еще раз.", true);
      });
  };

  function removeMovieFromSaved(movie) {
    const token = localStorage.getItem("jwt");
    let movieId;
    if (movie._id) {
      movieId = movie._id;
    } else {
      const savedMovie = savedMovieList.find((x => x.id === movie.id));
      movieId = savedMovie._id;
    }
    mainApi.deleteMovie(token, movieId)
      .then((response) => {
        setSavedMovieList(savedMovieList.filter((item) => item._id !== movieId));
        setMovieList(movieList.map((item) => {
          if (item.id === movie.id) {
            item.isLiked = false;
          }
          return item;
        }));
      })
      .catch(error => {
        console.error(error);
        openInfoPopup("Произошла ошибка при удалении сохраненного фильма. Попробуйте позднее еще раз.", true);
      });
  };

  function handleCardLike(movie, isLiked, isSavedCardMode) {
    if (isSavedCardMode) {
      removeMovieFromSaved(movie);
    } else {
      if (isLiked) {
        addMovieToSaved(movie);
      } else {
        removeMovieFromSaved(movie);
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
              cards={movieList}
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
                cards={savedMovieList}
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
