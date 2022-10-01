import axios from '@/api/axios';

const getComments = (slug) => axios.get(`/articles/${slug}/comments`);

const addComment = (slug, commentsArr) => axios.post(`/articles/${slug}/comments`, {comments: commentsArr});

const removeComment = (slug) => axios.delete(`/articles/${slug}/comments`);

export default {
    getComments,
    addComment,
    removeComment,
};
