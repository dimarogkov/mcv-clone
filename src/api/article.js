import axios from '@/api/axios';

const getArticle = (articleSlug) => axios.get(`/articles/${articleSlug}`);

const deleteArticle = (articleSlug) => axios.delete(`/articles/${articleSlug}`);

const createArticle = (articleData) => axios.post('/articles', {article: articleData});

const updateArticle = (slug, articleData) => axios.put(`/articles/${slug}`, {article: articleData});

export default {
    getArticle,
    deleteArticle,
    createArticle,
    updateArticle,
};
