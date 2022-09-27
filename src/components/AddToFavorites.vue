<template>
    <button @click="addToFavorites" class="like" :class="{active: localIsFavorited}">
        Liked {{ localFavoritesCount }}
    </button>
</template>

<script>
import {actionsTypes} from '@/modules/addToFavorites';

export default {
    name: 'mcv-add-to-favorite',
    props: {
        articleSlug: {
            type: String,
            required: true,
        },
        isFavorited: {
            type: Boolean,
            required: true,
        },
        favoritesCount: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            localIsFavorited: this.isFavorited,
            localFavoritesCount: this.favoritesCount,
        };
    },
    methods: {
        addToFavorites() {
            this.localIsFavorited ? this.localFavoritesCount-- : this.localFavoritesCount++;
            this.localIsFavorited = !this.localIsFavorited;

            this.$store.dispatch(actionsTypes.addToFavorites, {
                slug: this.articleSlug,
                isFavorited: this.localIsFavorited,
            });
        },
    },
};
</script>

<style>
.like {
    position: relative;
    display: flex;
    align-items: center;
    width: fit-content;
    height: 36px;
    font-size: 15px;
    color: var(--color-black);
    text-transform: uppercase;
    padding: 0 15px;
    cursor: pointer;
    background-color: transparent;
    border: 2px solid var(--color-black);
    transition: all 0.3s;
}
.like.active {
    color: var(--color-white);
    background-color: var(--color-black);
}
</style>
