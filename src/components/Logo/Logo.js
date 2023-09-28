import React from "react";
import { Link } from 'react-router-dom';

import './Logo.css';

function Logo() {
  return (
    <Link to="/">
      <div className="link logo"></div>
    </Link>
  );
}

export default Logo;