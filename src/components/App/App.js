import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useSaveSearch } from '../../hooks/useSaveSearch';
import { useTokenStorage } from '../../hooks/useTokenStorage';

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
  const [token, saveToken, removeToken] = useTokenStorage("jwt");
  const [isLoggedIn, setIsLoggedIn] = useState(token !== null);
  const [currentUser, setCurrentUser] = useState({ id: "", name: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [filteredMovieList, setFilteredMovieList] = useState([]);
  const [savedMovieList, setSavedMovieList] = useState([]);
  const [filteredSavedMovieList, setFilteredSavedMovieList] = useState([]);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [infoPopupData, setInfoPopupData] = useState({ text: "Информационное окно", isError: false });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isResizeTimeout, setIsResizeTimeout] = useState(false);

  const [storedSearch, saveSearch, removeSavedSearch] = useSaveSearch("searchResults");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      initData(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onResize = (event) => {
    if (isResizeTimeout) { return; }
    setIsResizeTimeout(true);
    setWindowWidth(event.target.window.innerWidth);
    setTimeout(() => {
      setIsResizeTimeout(false);
    }, 400);
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (movieList.length === 0) { return; }
    if (storedSearch) {
      filterMovieList(storedSearch.values);
    } else {
      setFilteredMovieList(movieList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieList]);


  function initData(token) {
    Promise.all([mainApi.getUserInfo(token), mainApi.getSavedMovies(token)])
      .then(([user, savedMovies]) => {
        setCurrentUser({
          id: user._id,
          name: user.name,
          email: user.email
        });
        setIsLoggedIn(true);
        handleSavedMovies(savedMovies);
        restoreSearchResults();
        redirectAfterInit();
      })
      .catch(error => {
        signOut();
        console.error(error);
        openInfoPopup("Произошла ошибка при загрузке данных пользователя.", true);
      });
  };

  function handleSavedMovies(savedMovies) {
    const processedSavedMovies = savedMovies.map((item) => {
      item.id = item.movieId;
      item.imageURL = item.image;
      return item;
    });
    setSavedMovieList(processedSavedMovies);
    setFilteredSavedMovieList(processedSavedMovies);
  };

  function redirectAfterInit() {
    const currentPath = location.pathname;
    if (currentPath === "/signin" || currentPath === "/signup") {
      navigate("/movies", { replace: true });
    }
  };

  function restoreSearchResults() {
    if (storedSearch && storedSearch.movies.length > 0) {
      setFilteredMovieList(storedSearch.movies);
    }
  };

  function signIn({ email, password }) {
    setIsLoading(true);
    mainApi.signin(email, password)
      .then((response) => {
        saveToken(response.token);
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

  function signUp({ name, email, password }) {
    setIsLoading(true);
    mainApi.signup(name, email, password)
      .then(() => {
        signIn({ email, password });
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

  function signOut() {
    removeToken();
    removeSavedSearch();
    setIsLoggedIn(false);
    setMovieList([]);
    setFilteredMovieList([]);
    setSavedMovieList([]);
    setFilteredSavedMovieList([]);
    navigate("/", { replace: true });
  };

  function onEditProfile(user) {
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

  function loadMovieList() {
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

  function filterSavedMovieList(values) {
    let filteredArray = savedMovieList;
    if (values.search !== "") {
      filteredArray = filterMoviesByName(filteredArray, values.search);
    }
    if (values.isShortFilm) {
      filteredArray = filterMoviesByShortFilms(filteredArray);
    }
    setFilteredSavedMovieList(filteredArray);
  };

  function filterMovieList(values) {
    let filteredArray = filterMoviesByName(movieList, values.search);
    if (values.isShortFilm) {
      filteredArray = filterMoviesByShortFilms(filteredArray);
    }
    saveSearch({
      values: values,
      movies: filteredArray
    });
    setFilteredMovieList(filteredArray);
  };

  function filterMoviesByName(array, value) {
    return array.filter((item) => {
      return item.nameRU.toLowerCase().includes(value.toLowerCase())
        || item.nameEN.toLowerCase().includes(value.toLowerCase());
    });
  };

  function filterMoviesByShortFilms(array) {
    return array.filter((item) => item.duration <= 40);
  };

  function searchMovies(values) {
    if (!values.search || values.search === "") {
      openInfoPopup("Нужно ввести ключевое слово.", true);
    } else {
      if (values.isSavedCardMode) {
        filterSavedMovieList(values);
      } else {
        const searchResults = {
          values,
          movies: []
        };
        saveSearch(searchResults);
        loadMovieList();
      }
    }
  };

  function handleIsShortClicked(values) {
    if (values.isSavedCardMode) {
      filterSavedMovieList(values);
    } else {
      if (!values.search || values.search === "") { return; }
      if (movieList.length === 0) {
        const searchResults = {
          values,
          movies: []
        };
        saveSearch(searchResults);
        loadMovieList();
      } else {
        filterMovieList(values);
      }
    }
  };

  function resetSearch(isSavedCardMode) {
    if (isSavedCardMode) {
      setFilteredSavedMovieList(savedMovieList);
    } else {
      removeSavedSearch();
      setFilteredMovieList([]);
    }
  };

  function addMovieToSaved(movie) {
    mainApi.saveMovie(token, movie)
      .then((response) => {
        movie._id = response._id;
        const processedSavedMovieList = [movie, ...savedMovieList];
        setSavedMovieList(processedSavedMovieList);
        setFilteredSavedMovieList(processedSavedMovieList);
        const updatedList = filteredMovieList.map((item) => {
          if (item.id === movie.id) {
            item.isLiked = true;
          }
          return item;
        });
        setFilteredMovieList(updatedList);
        saveSearch({
          ...storedSearch,
          movies: updatedList
        });
      })
      .catch(error => {
        console.error(error);
        openInfoPopup("Произошла ошибка при сохранении фильма. Попробуйте позднее еще раз.", true);
      });
  };

  function removeMovieFromSaved(movie) {
    let toBeRemovedMovieId;
    if (movie._id) {
      toBeRemovedMovieId = movie._id;
    } else {
      const savedMovie = filteredSavedMovieList.find((x => x.id === movie.id));
      toBeRemovedMovieId = savedMovie._id;
    }
    mainApi.deleteMovie(token, toBeRemovedMovieId)
      .then((response) => {
        setSavedMovieList(savedMovieList.filter((item) => item._id !== toBeRemovedMovieId));
        setFilteredSavedMovieList(filteredSavedMovieList.filter((item) => item._id !== toBeRemovedMovieId));
        const updatedList = filteredMovieList.map((item) => {
          if (item.id === movie.id) {
            item.isLiked = false;
          }
          return item;
        });
        setFilteredMovieList(updatedList);
        saveSearch({
          ...storedSearch,
          movies: updatedList
        });
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
            <Main isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path="/signup"
          element={
            <Register onSignUp={signUp} />
          }
        />
        <Route
          path="/signin"
          element={
            <Login onSignIn={signIn} />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              component={Profile}
              isLoggedIn={isLoggedIn}
              editProfile={onEditProfile}
              onSignOut={signOut}
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
              handleSubmitSearch={searchMovies}
              onIsShortClicked={handleIsShortClicked}
              cards={filteredMovieList}
              onCardLike={handleCardLike}
              windowWidth={windowWidth}
              onSearchReset={resetSearch}
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
                handleSubmitSearch={searchMovies}
                onIsShortClicked={handleIsShortClicked}
                cards={filteredSavedMovieList}
                onCardLike={handleCardLike}
                onSearchReset={resetSearch}
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
