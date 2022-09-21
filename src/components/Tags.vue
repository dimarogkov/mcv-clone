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
