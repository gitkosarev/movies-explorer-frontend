import React/* , { useEffect } */ from 'react';
import { Routes, Route/* , useNavigate */ } from 'react-router-dom';

import './App.css';

import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';

function App() {
  /* const [isLoggedIn, setIsLoggedIn] = React.useState(false); */

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute component={Main} isLoggedIn={true} />}
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
