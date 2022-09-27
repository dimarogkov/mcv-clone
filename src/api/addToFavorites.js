import axios from '@/api/axios';

const addToFavorites = (slug) => axios.post(`/articles/${slug}/favorite`);

const removeFromFavorites = (slug) => axios.delete(`/articles/${slug}/favorite`);

export default {
    addToFavorites,
    removeFromFavorites,
};
