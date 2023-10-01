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



  //#endregion








  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers
    })
      .then(this._handleResponse);
  };

  saveCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._handleResponse);
  };

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._handleResponse);
  };

  toggleLike(cardId, isLiked) {
    if (isLiked) { return this.deleteLike(cardId); }
    else { return this.putLike(cardId) }
  };

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers
    })
      .then(this._handleResponse);
  };

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._handleResponse);
  };

  updateAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._handleResponse);
  };

}

const mainApi = new MainApi(
  mainApiURL,
  {
    "Content-Type": "application/json"
  }
);
export default mainApi;