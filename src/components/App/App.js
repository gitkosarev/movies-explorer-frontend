import React/* , { useEffect } */ from 'react';
import { Routes, Route/* , useNavigate */ } from 'react-router-dom';
import Header from '../Header/Header';

import './App.css';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  /* const [isLoggedIn, setIsLoggedIn] = React.useState(false); */

  return (
    <div>
      <Header isLoggedIn={false} isThemeGrey={false} />
      <Routes>
        <Route exact path="/" component={Main} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
