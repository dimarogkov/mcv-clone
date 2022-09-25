import axios from '@/api/axios';

const updateUser = (userData) => axios.put('/user', {user: userData});

export default {
    updateUser,
};
