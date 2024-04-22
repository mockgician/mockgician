from requests import post


def get_headers(func):
    """ get headers decorator """
    def wrapper(*args, **kwargs):
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {get_token()}'
        }
        kwargs['headers'] = headers
        return func(*args, **kwargs)
    return wrapper


def get_token() -> str:
    """ get token from KeyCloak"""
    url = 'http://alfaformapp-int/auth/realms/verification-email-api/protocol/openid-connect/token'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    payload = {
        'grant_type': 'client_credentials',
        'client_id': 'emailVerificationAdmin',
        'client_secret': 'YW7cmQtorgibuL8GpRQb9G1N2LokrWAG'
    }
    data = post(url, data=payload, headers=headers).json()
    return data['access_token']
