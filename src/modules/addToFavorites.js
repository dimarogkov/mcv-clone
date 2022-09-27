import addToFavoritesApi from '@/api/addToFavorites';

export const mutationsTypes = {
    addToFavoritesStart: '[addToFavorites] addToFavoritesStart',
    addToFavoritesSuccess: '[addToFavorites] addToFavoritesSuccess',
    addToFavoritesFailed: '[addToFavorites] addToFavoritesFailed',
};

export const actionsTypes = {
    addToFavorites: '[addToFavorites] addToFavorites',
};

const mutations = {
    [mutationsTypes.addToFavoritesStart]() {},
    [mutationsTypes.addToFavoritesSuccess]() {},
    [mutationsTypes.addToFavoritesFailed]() {},
};

const actions = {
    [actionsTypes.addToFavorites](context, {slug, isFavorited}) {
        return new Promise((resolve) => {
            context.commit(mutationsTypes.addToFavoritesStart);
            const promise = isFavorited
                ? addToFavoritesApi.addToFavorites(slug)
                : addToFavoritesApi.removeFromFavorites(slug);

            promise
                .then(() => {
                    context.commit(mutationsTypes.addToFavoritesSuccess);
                    resolve();
                })
                .catch(() => context.commit(mutationsTypes.addToFavoritesFailed));
        });
    },
};

export default {
    mutations,
    actions,
};
