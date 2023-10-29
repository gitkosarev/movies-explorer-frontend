import { mainApiURL } from './Consts.js';

class MainApi {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  };

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  };

  //#region AUTH

  signup(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then(this._handleResponse);
  };

  signin(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email
      })
    })
      .then(this._handleResponse);
  };

  //#endregion

  //#region GET

  getUserInfo(token) {
    this._headers["Authorization"] = `Bearer ${token}`;
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers
    })
      .then(this._handleResponse);
  };

  getSavedMovies(token) {
    this._headers["Authorization"] = `Bearer ${token}`;
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._headers
    })
      .then(this._handleResponse);
  };

  //#endregion

  //#region PATCH

  updateProfile(token, name, email) {
    this._headers["Authorization"] = `Bearer ${token}`;
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email
      })
    })
      .then(this._handleResponse);
  };

  //#endregion

  //#region POST

  saveMovie(token, movie) {
    this._headers["Authorization"] = `Bearer ${token}`;
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.imageURL,
        trailerLink: movie.trailerLink,
        thumbnail: movie.thumbnail,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
      })
    })
      .then(this._handleResponse);
  };

  //#endregion

  //#region DELETE

  deleteMovie(token, movieId) {
    this._headers["Authorization"] = `Bearer ${token}`;
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._handleResponse);
  };

  //#endregion
}

const mainApi = new MainApi(
  mainApiURL,
  {
    "Content-Type": "application/json"
  }
);
export default mainApi;