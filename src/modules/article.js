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

    deleteArticleStart: '[article] deleteArticleStart',
    deleteArticleSuccess: '[article] deleteArticleSuccess',
    deleteArticleFailed: '[article] deleteArticleFailed',
};

export const actionsTypes = {
    getArticle: '[article] getArticle',
    deleteArticle: '[article] deleteArticle',
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
    [mutationsTypes.deleteArticleStart]() {},
    [mutationsTypes.deleteArticleSuccess]() {},
    [mutationsTypes.deleteArticleFailed]() {},
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

    [actionsTypes.deleteArticle](context, {slug}) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.deleteArticleStart);

            articleApi
                .getArticle(slug)
                .then(() => {
                    context.commit(mutationsTypes.deleteArticleSuccess);
                    resolve();
                })
                .catch(() => context.commit(mutationsTypes.deleteArticleFailed));
        });
    },
};

export default {
    state,
    mutations,
    actions,
};
