import React/* , { useEffect } */ from 'react';
import { Routes, Route/* , useNavigate */ } from 'react-router-dom';
import Header from '../Header/Header';

import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import Avatar from '../../images/avatar.png';

function App() {
  /* const [isLoggedIn, setIsLoggedIn] = React.useState(false); */

  return (
    <>
      <Header isLoggedIn={false} isThemeGrey={true} />
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute component={Main} isLoggedIn={true} avatar={Avatar} githubLink={"https://github.com/gitkosarev"} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
