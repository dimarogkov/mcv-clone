import axios from '@/api/axios';

const register = (data) => axios.post('/users', {user: data});

const login = (data) => axios.post('/users/login', {user: data});

export default {
    register,
    login,
};
