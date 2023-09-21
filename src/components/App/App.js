import React/* , { useEffect } */ from 'react';
import { Routes, Route/* , useNavigate */ } from 'react-router-dom';

import './App.css';

import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Profile from '../Profile/Profile';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import { cardArray, savedCardArray } from '../../utils/data';

function App() {
  /* const [isLoggedIn, setIsLoggedIn] = React.useState(false); */

  let currentUser = { name: "Vadim", email: "vadim@ya.ru" };

  function saveProfile(profile) {
    const name = profile?.name;
    const email = profile?.email;
    /* currentUser = {name, email}; */
    alert(`name: ${name}, email: ${email}`);
  };

  function singOut() {
    alert("Singed out now!");
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
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              component={Main}
              /* подставить isLoggedIn пропс */
              isLoggedIn={true}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              component={Profile}
              /* подставить isLoggedIn пропс */
              isLoggedIn={true}
              saveProfile={saveProfile}
              singOut={singOut}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute
              component={Movies}
              /* подставить isLoggedIn пропс */
              isLoggedIn={true}
              /* подставить isLoading пропс */
              isLoading={false}
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
                /* подставить isLoggedIn пропс */
                isLoggedIn={true}
                /* подставить isLoading пропс */
                isLoading={false}
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
    </>
  );
}

export default App;
