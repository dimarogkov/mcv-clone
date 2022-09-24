<template>
    <mcv-loader v-if="isLoading" />
    <mcv-errors v-if="errors" :errors-message="errors" />

    <template v-if="article">
        <div class="section article-banner">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="article-banner__cont">
                            <div class="text article-banner__date">{{ article.createdAt }}</div>
                            <h1 class="h1 title">{{ article.title }}</h1>
                            <div class="article-banner__user">
                                <router-link
                                    :to="{name: 'userProfile', params: {slug: article.author.username}}"
                                    class="article-banner__logo"
                                >
                                    <img
                                        v-if="article.author.image"
                                        :src="article.author.image"
                                        :alt="article.author.username"
                                    />
                                </router-link>
                                <router-link
                                    :to="{name: 'userProfile', params: {slug: article.author.username}}"
                                    class="article-banner__name"
                                >
                                    {{ article.author.username }}
                                </router-link>
                            </div>
                            <div class="article-banner__buttons" v-if="isAuthor">
                                <router-link :to="{name: 'editArticle', params: {slug: article.slug}}" class="btn">
                                    Edit Article</router-link
                                >
                                <button class="btn" @click="deleteArticle">Delete Article</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section article">
            <div class="container">
                <div class="row">
                    <div class="col-xl-8 offset-xl-2 col-lt-10 offset-lt-1">
                        <div class="article__block">
                            <div class="text">{{ article.body }}</div>
                            <div>Tag List</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {actionsTypes} from '@/modules/article';
import {gettersTypes} from '@/modules/auth';
import McvLoader from '@/components/Loader';
import McvErrors from '@/components/Errors';

export default {
    name: 'mcv-article',
    components: {
        McvLoader,
        McvErrors,
    },
    computed: {
        ...mapState({
            isLoading: (state) => state.article.isLoading,
            article: (state) => state.article.data,
            errors: (state) => state.article.errors,
        }),
        ...mapGetters({
            currentUser: gettersTypes.currentUser,
        }),
        routeSlug() {
            return this.$route.params.slug;
        },
        isAuthor() {
            if (!this.currentUser || !this.article) {
                return false;
            }
            return this.currentUser.username === this.article.author.username;
        },
    },
    methods: {
        deleteArticle() {
            this.$store
                .dispatch(actionsTypes.deleteArticle, {slug: this.routeSlug})
                .then(() => this.$router.push({name: 'globalFeed'}));
        },
    },
    mounted() {
        this.$store.dispatch(actionsTypes.getArticle, {slug: this.routeSlug});
    },
};
</script>

<style>
.article-banner {
    position: relative;
    width: 100%;
    background-color: var(--color-grey);
    padding: 70px 0;
    margin-bottom: 30px;
}
.article-banner__cont {
    position: relative;
    width: 100%;
    text-align: center;
}
.article-banner__date {
    position: relative;
    width: 100%;
    text-align: center;
    margin-bottom: 15px;
}
.article-banner__cont .title {
    font-weight: 500;
    margin-bottom: 20px;
}
.article-banner__user {
    position: relative;
    display: flex;
    align-items: center;
    width: fit-content;
    margin: 0 auto;
}
.article-banner__logo {
    position: relative;
    display: flex;
    width: 40px;
    min-width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--color-black);
    margin-right: 20px;
    overflow: hidden;
}
.article-banner__logo img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: all 0.7s;
}
.article-banner__logo:hover img {
    transform: scale(1.05);
}
.article-banner__name {
    position: relative;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: var(--color-black);
}
.article-banner__name::before {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-black);
    transition: all 0.4s;
}
.article-banner__name:hover::before {
    left: auto;
    right: 0;
    width: 0;
}
.article-banner__buttons {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 30px;
}
.article-banner__buttons .btn {
    display: flex;
    align-items: center;
    width: auto;
    padding: 0 25px;
    margin-right: 20px;
}
.article-banner__buttons .btn:last-child {
    margin-right: 0;
}
.article,
.article__block {
    position: relative;
    display: block;
    width: 100%;
}
.article {
    margin-bottom: 40px;
}
.article__block .text {
    line-height: 1.5em;
    margin-bottom: 30px;
}
</style>
