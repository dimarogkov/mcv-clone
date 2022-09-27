import axios from '@/api/axios';

const getUserProfile = (slug) => axios.get(`/profiles/${slug}`);

export default {
    getUserProfile,
};
