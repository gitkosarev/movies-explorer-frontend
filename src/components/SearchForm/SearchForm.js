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
        noValidate
      >
        <div className="search-line">
          <label htmlFor="searchLineInput" className="search-line__icon"></label>
          <input className="search-line__input"
            value={value}
            onChange={handleSearchChange}
            id="searchLineInput"
            type="search"
            name="search"
            required
            placeholder="Фильм"
          />
          <button className="button search__submit" type="submit"></button>
        </div>
        <div className="search-extra">
          <label htmlFor="isShortFilm" className="search-extra__label">
            <input className="search-extra__input search-extra__input_el_checkbox"
              value={isShortFilm}
              onChange={handleIsShortFilmChange}
              id="isShortFilm"
              type="checkbox"
              name="isShortFilm"
            />
            <span className="search-extra__pseudo-checkbox"></span>
            <span className="search-extra__label-text">Короткометражки</span>
          </label>
        </div>
      </form>
    </section>
  )
}

export default SearchForm;