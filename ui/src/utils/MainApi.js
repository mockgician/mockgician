class MainApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
      }

    _checkJson(res) {
        if (res.ok) {
          return res.json();
        }
      
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getCards(page, pageSize) {
        const access_token = localStorage.getItem("access_token");
        return fetch(`${this._baseUrl}/services/?page=${page}&page_size=${pageSize}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${access_token}`,
            },
            credentials: 'include',
        }).then(res => this._checkJson(res));
    }

    createCard(data) {
        const access_token = localStorage.getItem("access_token");
        return fetch(`${this._baseUrl}/services/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify({
                type: data.type,
                name: data.name,
                description: data.description,
                address: data.address,
                method: data.method,
                headers: data.headers,
                response_code: data.response_code,
                response_format: data.response_format,
                response_body: data.response_body
            }),
        }).then(res => this._checkJson(res));
    }

    updateCard(data) {
        const access_token = localStorage.getItem("access_token");
        return fetch(`${this._baseUrl}/services/`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify({
                id: data.id,
                type: data.type,
                name: data.name,
                description: data.description,
                address: data.address,
                method: data.method,
                headers: data.headers,
                response_code: data.response_code,
                response_format: data.response_format,
                response_body: data.response_body
            }),
        }).then(res => this._checkJson(res));
    }

    deleteCard(services_ids) {
        const access_token = localStorage.getItem("access_token");
        return fetch(`${this._baseUrl}/services/`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify({ services_ids }),
        }).then(res => this._checkJson(res));
    }

    getServiceTypes() {
        const access_token = localStorage.getItem("access_token");
        return fetch(`${this._baseUrl}/service_types/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${access_token}`,
            },
        }).then(res => this._checkJson(res));
    }

    getHttpMethods() {
        const access_token = localStorage.getItem("access_token");
        return fetch(`${this._baseUrl}/http_methods/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${access_token}`,
            },
        }).then(res => this._checkJson(res));
    }

    getStatuses() {
        const access_token = localStorage.getItem("access_token");
        return fetch(`${this._baseUrl}/http_statuses/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${access_token}`,
            },
        }).then(res => this._checkJson(res));
    }

    searchCards(page, pageSize, input_name) {
        const access_token = localStorage.getItem("access_token");
        return fetch(`${this._baseUrl}/services/?page=${page}&page_size=${pageSize}&name=${input_name}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${access_token}`,
            },
            credentials: 'include',
        }).then(res => this._checkJson(res));
    }
}

const mainApi = new MainApi('http://localhost:8000');
export default mainApi;