import articleApi from '@/api/article';

const state = {
    isLoading: false,
    data: null,
    errors: null,
};

export const mutationsTypes = {
    getArticleStart: '[article] getArticleStart',
    getArticleSuccess: '[article] getArticleSuccess',
    getArticleFailed: '[article] getArticleFailed',
};

export const actionsTypes = {
    getArticle: '[article] getArticle',
};

const mutations = {
    [mutationsTypes.getArticleStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationsTypes.getArticleSuccess](state, data) {
        state.isLoading = false;
        state.data = data;
    },
    [mutationsTypes.getArticleFailed](state, data) {
        state.isLoading = false;
        state.errors = data;
    },
};

const actions = {
    [actionsTypes.getArticle](context, {slug}) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.getArticleStart);

            articleApi
                .getArticle(slug)
                .then((response) => {
                    context.commit(mutationsTypes.getArticleSuccess, response.data.article);
                    resolve(response.data.article);
                })
                .catch((errors) => {
                    context.commit(mutationsTypes.getArticleFailed, errors);
                });
        });
    },
};

export default {
    state,
    mutations,
    actions,
};
