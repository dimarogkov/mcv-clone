import {createStore} from 'vuex';
import auth from '@/modules/auth';
import feed from '@/modules/feed';
import tags from '@/modules/tags';
import article from '@/modules/article';
import settings from '@/modules/settings';
import addToFavorites from '@/modules/addToFavorites';
import userProfile from '@/modules/userProfile';

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        feed,
        tags,
        article,
        settings,
        addToFavorites,
        userProfile,
    },
});
