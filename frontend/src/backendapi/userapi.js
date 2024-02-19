class AuthService {
    async register(data) {
        return fetch('http://localhost:8000/api/v1/users/create-user',{
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: data
        }).then(res => res.json());
    }
    async login(username, password) {
        return fetch('http://localhost:8000/api/v1/users/authenticate',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => res.json());
    }

    async logout() {
        return fetch('http://localhost:8000/api/v1/users/logout',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json());
    }

    async loggedInUserAvatar() {
        return fetch('http://localhost:8000/api/v1/users/logged-in-user-avatar',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json());
    }

    async getTokens(refreshToken) {
        return fetch('http://localhost:8000/api/v1/users/refreshed-tokens',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            }
        }).then(res => res.json());
    }

    async userProfile() {
        return fetch('http://localhost:8000/api/v1/users/user-profile',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json());
    }
}

const authService = new AuthService();

export default authService;
