import commentsApi from '@/api/comments';

const state = {
    data: null,
    isSubmit: false,
    errors: null,
};

export const mutationsTypes = {
    getCommentsStart: '[comments] getCommentsStart',
    getCommentsSuccess: '[comments] getCommentsSuccess',
    getCommentsFailed: '[comments] getCommentsFailed',

    addCommentStart: '[comments] addCommentStart',
    addCommentSuccess: '[comments] addCommentSuccess',
    addCommentFailed: '[comments] addCommentFailed',

    removeCommentStart: '[comments] removeCommentStart',
    removeCommentSuccess: '[comments] removeCommentSuccess',
    removeCommentFailed: '[comments] removeCommentFailed',
};

export const actionsTypes = {
    getComments: '[comments] getComments',
    addComment: '[comments] addComment',
    removeComment: '[comments] removeComment',
};

const mutations = {
    [mutationsTypes.getCommentsStart](state) {
        state.isSubmit = true;
    },
    [mutationsTypes.getCommentsSuccess](state, data) {
        state.isSubmit = false;
        state.data = data;
    },
    [mutationsTypes.getCommentsFailed](state, data) {
        state.isSubmit = false;
        state.errors = data;
    },

    [mutationsTypes.addCommentStart](state) {
        state.isSubmit = true;
    },
    [mutationsTypes.addCommentSuccess](state, data) {
        state.isSubmit = false;
        state.data.unshift(data);
    },
    [mutationsTypes.addCommentFailed](state, data) {
        state.isSubmit = false;
        state.errors = data;
    },

    [mutationsTypes.removeCommentStart]() {},
    [mutationsTypes.removeCommentSuccess]() {},
    [mutationsTypes.removeCommentFailed]() {},
};

const actions = {
    [actionsTypes.getComments](context, {slug}) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.getCommentsStart);

            commentsApi
                .getComments(slug)
                .then((response) => {
                    context.commit(mutationsTypes.getCommentsSuccess, response.data.comments);
                    resolve(response.data.comments);
                })
                .catch((errors) => context.commit(mutationsTypes.getCommentsFailed, errors.response.data.errors));
        });
    },

    [actionsTypes.addComment](context, {slug, body}) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.addCommentStart);

            commentsApi
                .addComment(slug, body)
                .then((response) => {
                    context.commit(mutationsTypes.addCommentSuccess, response.data.comment);
                    resolve(response.data.comment);
                })
                .catch((errors) => context.commit(mutationsTypes.addCommentFailed, errors.response.data.errors));
        });
    },

    [actionsTypes.removeComment](context, {slug, id}) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.removeCommentStart);

            commentsApi
                .removeComment(slug, id)
                .then(() => {
                    context.commit(mutationsTypes.removeCommentSuccess);
                    resolve();
                })
                .catch(() => context.commit(mutationsTypes.removeCommentFailed));
        });
    },
};

export default {
    state,
    mutations,
    actions,
};
