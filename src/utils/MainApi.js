export default class MainApi {
    constructor(settings) {
        this._url = settings.url
        this._headers = settings.headers
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getMovies() {
        return fetch(`${this._url}movies`, {
            method: 'GET',
            headers: this._headers,
          })
          .then(this._checkResponse)
    }

    auth() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
            },
          })
          .then(this._checkResponse)
    }
}