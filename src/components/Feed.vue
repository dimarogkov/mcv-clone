<template>
    <mcv-loader v-if="isLoading" />
    <mcv-errors v-if="errors" :errors-message="errors" />

    <div v-if="feed" class="feed__block">
        <div class="feed__block-item" v-for="(article, index) in feed.articles" :key="index">
            <div class="feed__block-head">
                <div class="feed__user">
                    <router-link
                        :to="{name: 'userProfile', params: {slug: article.author.username}}"
                        class="feed__user-logo"
                    >
                        <img v-if="article.author.image" :src="article.author.image" :alt="article.author.username" />
                    </router-link>
                    <div class="feed__user-info">
                        <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}">
                            {{ article.author.username }}
                        </router-link>
                        <p>{{ article.createdAt }}</p>
                    </div>
                </div>

                <span>Add to Favourite</span>
            </div>

            <div class="feed__block-cont">
                <router-link :to="{name: 'article', params: {slug: article.slug}}">
                    <h2 class="h2 title">{{ article.title }}</h2>
                </router-link>
                <div class="text">{{ article.description }}</div>
            </div>

            <div class="feed__block-bottom">
                <span>Read More...</span>
                <mcv-article-tags :tags="article.tagList" />
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
import McvLoader from '@/components/Loader';
import McvErrors from '@/components/Errors';
import McvArticleTags from '@/components/ArticleTags';
import {stringify, parseUrl} from 'query-string';

export default {
    name: 'mcv-feed',
    components: {
        McvPagination,
        McvLoader,
        McvErrors,
        McvArticleTags,
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

<style>
.feed__block {
    position: relative;
    display: block;
    width: 100%;
}
.feed__block-item {
    position: relative;
    display: block;
    width: 100%;
    padding: 20px 0;
    border-bottom: 2px solid var(--color-black);
    margin-bottom: 20px;
}
.feed__block-item:last-child {
    margin-bottom: 0;
}
.feed__block-head {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 30px;
}
.feed__user {
    position: relative;
    display: flex;
    align-items: center;
}
.feed__user-logo {
    position: relative;
    width: 50px;
    min-width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--color-black);
    overflow: hidden;
    margin-right: 15px;
}
.feed__user-logo img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: all 0.7s;
}
.feed__user-logo:hover img {
    transform: scale(1.05);
}
.feed__user-info {
    position: relative;
    display: inline-block;
}
.feed__user-info a {
    position: relative;
    display: inline-block;
    font-size: 17px;
    font-weight: 500;
    text-transform: capitalize;
    margin-bottom: 5px;
}
.feed__user-info a::before {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-black);
    transition: all 0.3s;
}
.feed__user-info a:hover::before {
    left: auto;
    right: 0;
    width: 0;
}
.feed__block-cont {
    position: relative;
    display: block;
    width: 100%;
    margin-bottom: 30px;
}
.feed__block-cont .title {
    display: flex;
    width: fit-content;
    padding-bottom: 2px;
    margin-bottom: 10px;
}
.feed__block-cont .title::before {
    position: absolute;
    content: '';
    right: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background-color: var(--color-black);
    transition: all 0.3s;
}
.feed__block-cont .title:hover::before {
    right: auto;
    left: 0;
    width: 100%;
}
.feed__block-bottom {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
.feed__block-bottom .tags {
    width: auto;
}
</style>
