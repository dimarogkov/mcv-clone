import axios from '@/api/axios';

const getTags = () => axios.get('/tags').then((response) => response.data.tags);

export default {
    getTags,
};
