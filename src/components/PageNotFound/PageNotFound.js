import React from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {
  return (
    <section className="not-found">
      <h2 className="not-found__title">
        404
      </h2>
      <p className="not-found__text">
        Страница не найдена
      </p>
      <Link className="link not-found__link" to="/">
        Назад
      </Link>
    </section>
  )
}

export default PageNotFound;