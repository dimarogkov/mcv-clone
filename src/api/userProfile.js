import axios from '@/api/axios';

const getUserProfile = (slug) => axios.get(`/profiles/${slug}`);

const followProfile = (slug) => axios.post(`/profiles/${slug}/follow`);

const unfollowProfile = (slug) => axios.delete(`/profiles/${slug}/follow`);

export default {
    getUserProfile,
    followProfile,
    unfollowProfile,
};
