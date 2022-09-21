<template>
    <div v-if="isLoading">Loading</div>

    <div v-if="errors">Some errors</div>

    <div v-if="feed" class="feed-block">
        <div
            class="feed-item"
            v-for="(article, index) in feed.articles"
            :key="index"
            style="border: 1px solid black; padding: 20px; margin-bottom: 20px"
        >
            <div class="feed-head">
                <div class="feed-user">
                    <router-link
                        :to="{name: 'userProfile', params: {slug: article.author.username}}"
                        class="feed-user-logo"
                    >
                        <img :src="article.author.image" :alt="article.author.username" />
                    </router-link>
                    <div class="feed-user-info">
                        <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}">
                            {{ article.author.username }}
                        </router-link>
                        <p>{{ article.createdAt }}</p>
                    </div>
                </div>

                <span>Add to Favourite</span>
            </div>

            <div class="feed-cont">
                <router-link :to="{name: 'article', params: {slug: article.slug}}">
                    <h2>{{ article.title }}</h2>
                </router-link>
                <p>{{ article.description }}</p>
            </div>

            <div class="feed-bottom">
                <span>Read More...</span>
                <div>Tag List</div>
            </div>
        </div>

        <mcv-pagination :total="totalArticles" :limit="limit" :currentPage="currentPage" :url="url" />
    </div>
</template>

<script>
import {mapState} from 'vuex';
import {actionsTypes} from '@/modules/feed';
import McvPagination from '@/components/Pagination';

export default {
    name: 'mcv-feed',
    components: {
        McvPagination,
    },
    props: {
        apiUrl: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            totalArticles: 3,
            limit: 1,
            currentPage: 2,
            url: '/tags/dragons',
        };
    },
    computed: {
        ...mapState({
            isLoading: (state) => state.feed.isLoading,
            feed: (state) => state.feed.data,
            errors: (state) => state.feed.errors,
        }),
    },
    mounted() {
        this.$store.dispatch(actionsTypes.getFeed, {apiUrl: this.apiUrl});
    },
};
</script>
