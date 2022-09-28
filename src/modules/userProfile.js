import userProfileApi from '@/api/userProfile';

const state = {
    data: null,
    isLoading: false,
    isSubmit: false,
    errors: null,
};

export const mutationsTypes = {
    getUserProfileStart: '[userProfile] getUserProfileStart',
    getUserProfileSuccess: '[userProfile] getUserProfileSuccess',
    getUserProfileFailed: '[userProfile] getUserProfileFailed',

    followProfileStart: '[userProfile] followProfileStart',
    followProfileSuccess: '[userProfile] followProfileSuccess',
    followProfileFailed: '[userProfile] followProfileFailed',
};

export const actionsTypes = {
    getUserProfile: '[userProfile] getUserProfile',
    followProfile: '[userProfile] followProfile',
};

const mutations = {
    [mutationsTypes.getUserProfileStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationsTypes.getUserProfileSuccess](state, data) {
        state.isLoading = false;
        state.data = data;
    },
    [mutationsTypes.getUserProfileFailed](state, data) {
        state.isLoading = false;
        state.errors = data;
    },

    [mutationsTypes.followProfileStart](state) {
        state.isSubmit = true;
    },
    [mutationsTypes.followProfileSuccess](state, data) {
        state.data = data;
        state.isSubmit = false;
    },
    [mutationsTypes.followProfileFailed](state, data) {
        state.isSubmit = false;
        state.errors = data;
    },
};

const actions = {
    [actionsTypes.getUserProfile](context, {slug}) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.getUserProfileStart);

            userProfileApi
                .getUserProfile(slug)
                .then((response) => {
                    context.commit(mutationsTypes.getUserProfileSuccess, response.data.profile);
                    resolve(response.data.profile);
                })
                .catch((errors) => {
                    context.commit(mutationsTypes.getUserProfileFailed, errors);
                });
        });
    },

    [actionsTypes.followProfile](context, {slug, followStatus}) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.followProfileStart);

            const promise = followStatus ? userProfileApi.unfollowProfile(slug) : userProfileApi.followProfile(slug);
            promise
                .then((response) => {
                    context.commit(mutationsTypes.followProfileSuccess, response.data.profile);
                    resolve(response.data.profile);
                })
                .catch((errors) => context.commit(mutationsTypes.followProfileFailed, errors));
        });
    },
};

export default {
    state,
    mutations,
    actions,
};
