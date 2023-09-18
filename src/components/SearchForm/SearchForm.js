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
        <label htmlFor="searchLine" className="search__icon"></label>
        <input
          value={value}
          onChange={handleSearchChange}
          id="searchLine"
          className="search__input search__input_el_search-line"
          type="search"
          name="search"
          required
          placeholder="Фильм"
          minLength="2"
          maxLength="100"
        />
        <button className="button search__submit" type="submit"></button>
      </form>
      <label htmlFor="isShortFilm" className="search__label search__label_el_extra-options">
        <input className="search__input search__input_el_extra-options"
          value={isShortFilm}
          onChange={handleIsShortFilmChange}
          id="isShortFilm"
          type="checkbox"
          name="isShortFilm"
        />
        <span className="search__pseudo-item search__pseudo-item_type_checkbox"></span>
        <span className="search__label-text">Короткометражки</span>
      </label>
    </section>
  )
}

export default SearchForm;