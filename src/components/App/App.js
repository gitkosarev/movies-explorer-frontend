import React/* , { useEffect } */ from 'react';
import { Routes, Route/* , useNavigate */ } from 'react-router-dom';

import './App.css';

import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';

function App() {
  /* const [isLoggedIn, setIsLoggedIn] = React.useState(false); */

  function handleSubmitSearch(values) {
    alert(`search_value: ${values.search}, search_option: ${values.isShortFilm}`);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute
            component={Main}
            /* подставить isLoggedIn пропс */
            isLoggedIn={true}
          />}
        />
        <Route
          path="/movies"
          element={<ProtectedRoute
            component={Movies}
            /* подставить isLoggedIn пропс */
            isLoggedIn={true}
            /* подставить isLoading пропс */
            isLoading={false}
            handleSubmitSearch={handleSubmitSearch}
          />}
        />
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </>
  );
}

export default App;
