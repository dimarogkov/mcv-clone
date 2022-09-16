import authApi from '@/api/auth';
import {setItem} from '@/helpers/storage';

const state = {
    isSubmit: false,
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
};

export const actionsTypes = {
    register: '[auth] register',
    login: '[auth] login',
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
};

export default {
    state,
    mutations,
    actions,
    getters,
};
