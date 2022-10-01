import axios from '@/api/axios';

const getComments = (slug) => axios.get(`/articles/${slug}/comments`);

const addComment = (slug, body) => axios.post(`/articles/${slug}/comments`, {comment: {body}});

const removeComment = (slug, id) => axios.delete(`/articles/${slug}/comments/${id}`);

export default {
    getComments,
    addComment,
    removeComment,
};
