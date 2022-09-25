import settingsApi from '@/api/settings';

const state = {
    user: null,
    isSubmit: false,
    validationErrors: null,
};

export const mutationsTypes = {
    updateUserStart: '[settings] updateUserStart',
    updateUserSuccess: '[settings] updateUserSuccess',
    updateUserFailed: '[settings] updateUserFailed',
};

export const actionsTypes = {
    updateUser: '[settings] updateUser',
};

const mutations = {
    [mutationsTypes.updateUserStart](state) {
        state.isSubmit = true;
        state.user = null;
        state.validationErrors = null;
    },
    [mutationsTypes.updateUserSuccess](state, data) {
        state.isSubmit = false;
        state.user = data;
    },
    [mutationsTypes.updateUserFailed](state, data) {
        state.isSubmit = false;
        state.validationErrors = data;
    },
};

const actions = {
    [actionsTypes.updateUser](context, {userData}) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.updateUserStart);

            settingsApi
                .updateUser(userData)
                .then((response) => {
                    context.commit(mutationsTypes.updateUserSuccess, response.data.user);
                    resolve(response.data.user);
                })
                .catch((errors) => context.commit(mutationsTypes.updateUserFailed, errors.response.data.errors));
        });
    },
};

export default {
    state,
    mutations,
    actions,
};
