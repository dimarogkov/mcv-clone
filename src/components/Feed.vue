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

        <mcv-pagination :total="feed.articlesCount" :limit="limit" :currentPage="currentPage" :url="baseUrl" />
    </div>
</template>

<script>
import {mapState} from 'vuex';
import {actionsTypes} from '@/modules/feed';
import {limit} from '@/helpers/vars';
import McvPagination from '@/components/Pagination';
import {stringify, parseUrl} from 'query-string';

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
            limit: limit,
        };
    },
    computed: {
        ...mapState({
            isLoading: (state) => state.feed.isLoading,
            feed: (state) => state.feed.data,
            errors: (state) => state.feed.errors,
        }),
        currentPage() {
            return Number(this.$route.query.page || '1');
        },
        baseUrl() {
            return this.$route.path;
        },
        offset() {
            return this.currentPage * limit - limit;
        },
    },
    watch: {
        currentPage() {
            this.loadFeed();
        },
    },
    mounted() {
        this.loadFeed();
    },
    methods: {
        loadFeed() {
            const parsedUrl = parseUrl(this.apiUrl);
            const stringifyParams = stringify({
                limit: limit,
                offset: this.offset,
                ...parsedUrl.query,
            });
            const apiUrlWithParams = `${parsedUrl.url}?${stringifyParams}`;
            this.$store.dispatch(actionsTypes.getFeed, {apiUrl: apiUrlWithParams});
        },
    },
};
</script>
