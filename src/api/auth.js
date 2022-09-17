import axios from '@/api/axios';

const register = (data) => axios.post('/users', {user: data});

const login = (data) => axios.post('/users/login', {user: data});

const getCurrentUser = () => axios.get('/user');

export default {
    register,
    login,
    getCurrentUser,
};
