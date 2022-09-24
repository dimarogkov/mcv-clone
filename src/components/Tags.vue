<template>
    <mcv-loader v-if="isLoading" />
    <mcv-errors v-if="errors" :errors-message="errors" />

    <div v-if="tags" class="tags">
        <h3 class="h3 title">Popular Tags</h3>
        <ul class="tags__list">
            <li v-for="tag in tags" :key="tag">
                <router-link :to="{name: 'tag', params: {slug: tag}}">
                    {{ tag }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import McvLoader from '@/components/Loader';
import McvErrors from '@/components/Errors';
import {actionsTypes} from '@/modules/tags';
import {mapState} from 'vuex';

export default {
    name: 'mcv-tags',
    components: {
        McvLoader,
        McvErrors,
    },
    computed: {
        ...mapState({
            isLoading: (state) => state.tags.isLoading,
            tags: (state) => state.tags.data,
            errors: (state) => state.tags.errors,
        }),
    },
    mounted() {
        this.$store.dispatch(actionsTypes.getTags);
    },
};
</script>

<style>
.tags {
    position: relative;
    width: 100%;
}
.tags .title {
    margin-bottom: 20px;
}
.tags__list {
    position: relative;
    display: flex;
    width: 100%;
}
.tags__list li {
    position: relative;
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
}
.tags__list li a,
.tags__list li span {
    position: relative;
    display: flex;
    align-items: center;
    width: fit-content;
    height: 30px;
    font-size: 14px;
    color: var(--color-black);
    text-transform: uppercase;
    padding: 0 10px;
    background-color: var(--color-grey);
    transition: all 0.3s;
}
.tags__list li a:hover {
    color: var(--color-white);
    background-color: var(--color-black);
}
</style>
