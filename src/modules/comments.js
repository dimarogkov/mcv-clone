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
};

export const actionsTypes = {
    getComments: '[comments] getComments',
    addComment: '[comments] addComment',
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
        state.data.push(data);
    },
    [mutationsTypes.addCommentFailed](state, data) {
        state.isSubmit = false;
        state.errors = data;
    },
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
                .catch((errors) => context.commit(mutationsTypes.getCommentsFailed, errors));
        });
    },

    [actionsTypes.addComment](context, {slug, body}) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.addCommentStart);

            commentsApi
                .getComments(slug, body)
                .then((response) => {
                    context.commit(mutationsTypes.addCommentSuccess, response.data.comment);
                    resolve(response.data.comment);
                    console.log(response.data);
                })
                .catch((errors) => context.commit(mutationsTypes.addCommentFailed, errors));
        });
    },
};

export default {
    state,
    mutations,
    actions,
};
