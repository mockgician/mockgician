class AuthApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }
  
  _checkJson(res) {
    if (res.ok) {
      return res.json();
    }
  
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
    
  signin(username, password) {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    return fetch(`${this._baseUrl}/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData.toString(),
    })
    .then(res => this._checkJson(res));
  }
}

const authApi = new AuthApi('http://localhost:8000');
export default authApi;