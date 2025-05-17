import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});


api.interceptors.request.use(config => {
    try {
        const raw = window.localStorage.getItem('persist:root');
        if (raw != null) {
            const persisted = JSON.parse(raw);
            const auth = JSON.parse(persisted.auth);
            const token = auth.token as string | null;
            if (token) config.headers!['Authorization'] = `Bearer ${token}`;
        }
    } catch (error) {
        console.error(error);
    }
    return config;
});
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            console.error("caiu no 401",error);
            localStorage.clear()
        }
        return Promise.reject(error);
    }
);

export default api;
