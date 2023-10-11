import React, { memo, useState, useEffect, useRef } from 'react';

import './SearchForm.css';

function SearchForm({ isSavedCardMode, handleSubmitSearch, onReset }) {
  const [search, setSearch] = useState("");
  const [isShortFilm, setIsShortFilm] = useState(false);

  const isShortInputElement = useRef();

  useEffect(() => {
    if (isSavedCardMode) { return; }
    const searchValues = JSON.parse(localStorage.getItem("searchResults"))?.values;
    if (searchValues) {
      if (searchValues.search !== "") { setSearch(searchValues.search); }
      if (searchValues.isShortFilm) {
        setIsShortFilm(true);
        isShortInputElement.current.checked = true;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearchChange(e) {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setIsShortFilm(false);
      e.target.closest("form").reset();
      onReset(isSavedCardMode);
    }
  };

  function handleIsShortFilmChange(e) {
    setIsShortFilm(e.target.checked);
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleSubmitSearch({
      isSavedCardMode,
      search,
      isShortFilm
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
            value={search}
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
              ref={isShortInputElement}
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

export default memo(SearchForm);