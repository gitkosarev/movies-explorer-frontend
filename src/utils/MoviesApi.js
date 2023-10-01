import { moviesApiURL } from './Consts.js';

class MoviesApi {
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

    //#region GET

    getMovies() {
      return fetch(`${this._baseUrl}`, {
        method: "GET",
        headers: this._headers
      })
        .then(this._handleResponse);
    };

    //#endregion

  }

const mainApi = new MoviesApi(
  moviesApiURL,
  {
    "Content-Type": "application/json"
  }
);
export default mainApi;