import {createStore} from 'vuex';
import auth from '@/modules/auth';
import feed from '@/modules/feed';
import tags from '@/modules/tags';

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        feed,
        tags,
    },
});
