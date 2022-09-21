import axios from 'axios';
import {getItem} from '@/helpers/storage';

axios.defaults.baseURL = 'http://localhost:3000/api';

axios.interceptors.request.use((config) => {
    const token = getItem('userToken');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

export default axios;
