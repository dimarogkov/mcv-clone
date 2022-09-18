import feedApi from '@/api/feed';

const state = {
    data: null,
    isLoading: false,
    errors: null,
};

export const mutationsTypes = {
    getFeedStart: '[feed] getFeedStart',
    getFeedSuccess: '[feed] getFeedSuccess',
    getFeedFailed: '[feed] getFeedFailed',
};

export const actionsTypes = {
    getFeed: '[feed] getFeed',
};

const mutations = {
    [mutationsTypes.getFeedStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationsTypes.getFeedSuccess](state, data) {
        state.isLoading = false;
        state.data = data;
    },
    [mutationsTypes.getFeedFailed](state) {
        state.isLoading = false;
    },
};

const actions = {
    [actionsTypes.getFeed](context, {apiUrl}) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.getFeedStart);

            feedApi
                .getFeed(apiUrl)
                .then((response) => {
                    context.commit(mutationsTypes.getFeedSuccess, response.data);
                    resolve(response.data);
                })
                .catch(() => {
                    context.commit(mutationsTypes.getFeedFailed);
                });
        });
    },
};

export default {
    state,
    mutations,
    actions,
};
