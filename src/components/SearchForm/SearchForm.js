import React, { useState } from 'react';

import './SearchForm.css';

function SearchForm({ handleSubmitSearch }) {
  const [value, setValue] = useState("");
  const [isShortFilm, setIsShortFilm] = useState(false);

  function handleSearchChange(e) {
    setValue(e.target.value);
  };

  function handleIsShortFilmChange(e) {
    setIsShortFilm(e.target.checked);
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleSubmitSearch({
      search: value,
      isShortFilm: isShortFilm
    });
  };

  return (
    <section className="search">
      <form className="search__form"
        onSubmit={handleSubmit}
        id="SearchForm"
        name="SearchForm"
        action="#"
        method="post"
        autoComplete="off"
      >
        <label htmlFor="searchInput" className="search__icon"></label>
        <input
          value={value}
          onChange={handleSearchChange}
          id="searchInput"
          className="search__input"
          type="search"
          name="search"
          required
          placeholder="Фильм"
          minLength="2"
          maxLength="100"
        />
        <button className="button search__submit" type="submit">
          {/* <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="34" height="34" rx="17" fill="#3456F3" />
            <path fillRule="evenodd" clipRule="evenodd" d="M18.7927 18.2638C17.3608 19.6957 15.0391 19.6957 13.6072 18.2638C12.1753 16.8319 12.1753 14.5103 13.6072 13.0783C15.0391 11.6464 17.3608 11.6464 18.7927 13.0783C20.2246 14.5103 20.2246 16.8319 18.7927 18.2638ZM19.2331 19.6468C17.2728 21.1462 14.4572 20.9994 12.6644 19.2066C10.7118 17.254 10.7118 14.0882 12.6644 12.1355C14.617 10.1829 17.7829 10.1829 19.7355 12.1355C21.5282 13.9283 21.675 16.7437 20.1758 18.7039L23.7425 22.2706L22.7997 23.2134L19.2331 19.6468Z" fill="white" />
          </svg> */}
        </button>
        <input
          value={isShortFilm}
          onChange={handleIsShortFilmChange}
          id="isShortFilm"
          className="search__checkbox"
          type="checkbox"
          name="isShortFilm"
        />
        <label htmlFor="isShortFilm" className="search__input-label">Короткометражки</label>
      </form>
    </section>
  )
}

export default SearchForm;