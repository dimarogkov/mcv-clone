import axios from 'axios';
import {getItem} from '@/helpers/storage';

axios.defaults.baseURL = 'https://conduit.productionready.io/api';

axios.interceptors.request.use((config) => {
    const token = getItem('userToken');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

export default axios;
