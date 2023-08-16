import React/* , { useEffect } */ from 'react';
import { Routes, Route/* , useNavigate */ } from 'react-router-dom';
import Header from '../Header/Header';

import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  /* const [isLoggedIn, setIsLoggedIn] = React.useState(false); */

  return (
    <>
      <Header isLoggedIn={false} isThemeGrey={false} />
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Main} isLoggedIn={true} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
