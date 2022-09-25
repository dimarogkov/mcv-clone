import articleApi from '@/api/article';

const state = {
    isLoading: false,
    data: null,
    errors: null,
    isSubmit: false,
    validationErrors: null,
};

export const mutationsTypes = {
    getArticleStart: '[article] getArticleStart',
    getArticleSuccess: '[article] getArticleSuccess',
    getArticleFailed: '[article] getArticleFailed',

    deleteArticleStart: '[article] deleteArticleStart',
    deleteArticleSuccess: '[article] deleteArticleSuccess',
    deleteArticleFailed: '[article] deleteArticleFailed',

    createArticleStart: '[article] createArticleStart',
    createArticleSuccess: '[article] createArticleSuccess',
    createArticleFailed: '[article] createArticleFailed',

    updateArticleStart: '[article] updateArticleStart',
    updateArticleSuccess: '[article] updateArticleSuccess',
    updateArticleFailed: '[article] updateArticleFailed',

    getDefaultState: '[article] getDefaultState',
};

export const actionsTypes = {
    getArticle: '[article] getArticle',
    deleteArticle: '[article] deleteArticle',
    createArticle: '[article] createArticle',
    updateArticle: '[article] updateArticle',
    getDefault: '[article] getDefault',
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

    [mutationsTypes.createArticleStart](state) {
        state.isSubmit = true;
    },
    [mutationsTypes.createArticleSuccess](state) {
        state.isSubmit = false;
    },
    [mutationsTypes.createArticleFailed](state, data) {
        state.isSubmit = false;
        state.validationErrors = data;
    },

    [mutationsTypes.updateArticleStart](state) {
        state.isSubmit = true;
    },
    [mutationsTypes.updateArticleSuccess](state) {
        state.isSubmit = false;
    },
    [mutationsTypes.updateArticleFailed](state, data) {
        state.isSubmit = false;
        state.validationErrors = data;
    },

    [mutationsTypes.getDefaultState](state) {
        state.isSubmit = false;
        state.validationErrors = null;
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

    [actionsTypes.deleteArticle](context, {slug}) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.deleteArticleStart);

            articleApi
                .deleteArticle(slug)
                .then(() => {
                    context.commit(mutationsTypes.deleteArticleSuccess);
                    resolve();
                })
                .catch(() => context.commit(mutationsTypes.deleteArticleFailed));
        });
    },

    [actionsTypes.createArticle](context, {articleData}) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.createArticleStart);
            articleApi
                .createArticle(articleData)
                .then((response) => {
                    context.commit(mutationsTypes.createArticleSuccess);
                    resolve(response.data.article);
                })
                .catch((errors) => context.commit(mutationsTypes.createArticleFailed, errors.response.data.errors));
        });
    },

    [actionsTypes.updateArticle](context, {slug, articleData}) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.updateArticleStart);
            articleApi
                .updateArticle(slug, articleData)
                .then((response) => {
                    context.commit(mutationsTypes.updateArticleSuccess);
                    resolve(response.data.article);
                })
                .catch((errors) => context.commit(mutationsTypes.updateArticleFailed, errors.response.data.errors));
        });
    },

    [actionsTypes.getDefault](context) {
        return context.commit(mutationsTypes.getDefaultState);
    },
};

export default {
    state,
    mutations,
    actions,
};
