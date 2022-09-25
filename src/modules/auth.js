import authApi from '@/api/auth';
import {setItem} from '@/helpers/storage';

const state = {
    isSubmit: false,
    isLoading: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
};

export const mutationsTypes = {
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailed: '[auth] registerFailed',

    loginStart: '[auth] loginStart',
    loginSuccess: '[auth] loginSuccess',
    loginFailed: '[auth] loginFailed',

    getCurrentUserStart: '[auth] getCurrentUserStart',
    getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
    getCurrentUserFailed: '[auth] getCurrentUserFailed',

    logout: '[auth] logout',
    getDefaultState: '[auth] getDefaultState',
};

export const actionsTypes = {
    register: '[auth] register',
    login: '[auth] login',
    getCurrentUser: '[auth] getCurrentUser',
    logout: '[auth] logout',
    getDefault: '[auth] getDefault',
};

export const gettersTypes = {
    currentUser: '[auth] currentUser',
    isLoggedIn: '[auth] isLoggedIn',
    isAnonymous: '[auth] isAnonymous',
};

export const getters = {
    [gettersTypes.currentUser]: (state) => state.currentUser,
    [gettersTypes.isLoggedIn]: (state) => Boolean(state.isLoggedIn),
    [gettersTypes.isAnonymous]: (state) => state.isLoggedIn === false,
};

const mutations = {
    [mutationsTypes.registerStart](state) {
        state.isSubmit = true;
        state.validationErrors = null;
    },
    [mutationsTypes.registerSuccess](state, data) {
        state.isSubmit = false;
        state.currentUser = data;
        state.isLoggedIn = true;
    },
    [mutationsTypes.registerFailed](state, data) {
        state.isSubmit = false;
        state.validationErrors = data;
    },

    [mutationsTypes.loginStart](state) {
        state.isSubmit = true;
        state.validationErrors = null;
    },
    [mutationsTypes.loginSuccess](state, data) {
        state.isSubmit = false;
        state.currentUser = data;
        state.isLoggedIn = true;
    },
    [mutationsTypes.loginFailed](state, data) {
        state.isSubmit = false;
        state.validationErrors = data;
    },

    [mutationsTypes.getCurrentUserStart](state) {
        state.isLoading = true;
    },
    [mutationsTypes.getCurrentUserSuccess](state, data) {
        state.isLoading = false;
        state.currentUser = data;
        state.isLoggedIn = true;
    },
    [mutationsTypes.getCurrentUserFailed](state) {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.currentUser = null;
    },

    [mutationsTypes.logout](state) {
        state.currentUser = null;
        state.isLoggedIn = false;
    },

    [mutationsTypes.getDefaultState](state) {
        state.isSubmit = false;
        state.validationErrors = null;
    },
};

const actions = {
    [actionsTypes.register](context, data) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.registerStart);

            authApi
                .register(data)
                .then((response) => {
                    context.commit(mutationsTypes.registerSuccess, response.data.user);
                    setItem('userToken', response.data.user.token);
                    resolve(response.data.user);
                })
                .catch((error) => {
                    context.commit(mutationsTypes.registerFailed, error.response.data.errors);
                });
        });
    },

    [actionsTypes.login](context, data) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.loginStart);

            authApi
                .login(data)
                .then((response) => {
                    context.commit(mutationsTypes.loginSuccess, response.data.user);
                    setItem('userToken', response.data.user.token);
                    resolve(response.data.user);
                })
                .catch((error) => {
                    context.commit(mutationsTypes.loginFailed, error.response.data.errors);
                });
        });
    },

    [actionsTypes.getCurrentUser](context) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.getCurrentUserStart);

            authApi
                .getCurrentUser()
                .then((response) => {
                    context.commit(mutationsTypes.getCurrentUserSuccess, response.data.user);
                    resolve(response.data.user);
                })
                .catch(() => context.commit(mutationsTypes.getCurrentUserFailed));
        });
    },

    [actionsTypes.getDefault](context) {
        return context.commit(mutationsTypes.getDefaultState);
    },

    [actionsTypes.logout](context) {
        return new Promise((resolve) => {
            setItem('userToken', '');
            context.commit(mutationsTypes.logout);
            resolve();
        });
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
