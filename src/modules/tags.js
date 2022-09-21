import tagsApi from '@/api/tags';

const state = {
    data: null,
    isLoading: false,
    errors: null,
};

export const mutationsTypes = {
    getTagsStart: '[tags] getTagsStart',
    getTagsSuccess: '[tags] getTagsSuccess',
    getTagsFailed: '[tags] getTagsFailed',
};

export const actionsTypes = {
    getTags: '[tags] getTags',
};

const mutations = {
    [mutationsTypes.getTagsStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationsTypes.getTagsSuccess](state, data) {
        state.isLoading = false;
        state.data = data;
    },
    [mutationsTypes.getTagsFailed](state, data) {
        state.isLoading = false;
        state.errors = data;
    },
};

const actions = {
    [actionsTypes.getTags](context) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.getTagsStart);

            tagsApi
                .getTags()
                .then((response) => {
                    context.commit(mutationsTypes.getTagsSuccess, response);
                    resolve(response);
                })
                .catch((errors) => {
                    context.commit(mutationsTypes.getTagsFailed, errors);
                });
        });
    },
};

export default {
    state,
    mutations,
    actions,
};
