import userProfileApi from '@/api/userProfile';

const state = {
    data: null,
    isLoading: false,
    errors: null,
};

export const mutationsTypes = {
    getUserProfileStart: '[getUserProfile] getUserProfileStart',
    getUserProfileSuccess: '[getUserProfile] getUserProfileSuccess',
    getUserProfileFailed: '[getUserProfile] getUserProfileFailed',
};

export const actionsTypes = {
    getUserProfile: '[getUserProfile] getUserProfile',
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
};

export default {
    state,
    mutations,
    actions,
};
