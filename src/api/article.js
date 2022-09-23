import axios from '@/api/axios';

const getArticle = (articleSlug) => axios.get(`/articles/${articleSlug}`);

export default {
    getArticle,
};
