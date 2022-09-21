<template>
    <template v-if="isLoading">Loading</template>

    <template v-if="errors">
        <div>{{ errors }}</div>
    </template>

    <template v-if="tags">
        <div class="tags">
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
</template>

<script>
import {actionsTypes} from '@/modules/tags';
import {mapState} from 'vuex';

export default {
    name: 'mcv-tags',
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
