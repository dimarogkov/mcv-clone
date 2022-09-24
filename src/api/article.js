import axios from '@/api/axios';

const getArticle = (articleSlug) => axios.get(`/articles/${articleSlug}`);

const deleteArticle = (articleSlug) => axios.delete(`/articles/${articleSlug}`);

export default {
    getArticle,
    deleteArticle,
};
