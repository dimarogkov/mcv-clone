<template>
    <div class="section comments" v-if="comments">
        <div class="container">
            <div class="row">
                <div class="col-xl-8 offset-xl-2 col-lt-10 offset-lt-1">
                    <mcv-validation-errors v-if="errors" :validation-errors="errors" />

                    <form class="comments__form" @submit.prevent="onSubmit" v-if="isLoggedIn">
                        <textarea placeholder="Write a comment..." v-model="commentBody"></textarea>
                        <div class="comments__bottom">
                            <div class="comments__user">
                                <router-link
                                    class="comments__logo"
                                    :to="{name: 'userProfile', params: {slug: currentUser.username}}"
                                >
                                    <img :src="currentUser.image" :alt="currentUser.username" />
                                </router-link>

                                <router-link
                                    class="link"
                                    :to="{name: 'userProfile', params: {slug: currentUser.username}}"
                                >
                                    {{ currentUser.username }}
                                </router-link>
                            </div>
                            <button class="btn" :disabled="isSubmit">Post Comment</button>
                        </div>
                    </form>

                    <div class="comments__items">
                        <div class="comments__item" v-for="(comment, index) in comments" :key="index">
                            <div class="text">
                                {{ comment.body }}
                            </div>
                            <div class="comments__bottom">
                                <div class="comments__user">
                                    <router-link
                                        class="comments__logo"
                                        :to="{name: 'userProfile', params: {slug: comment.author.username}}"
                                    >
                                        <img :src="comment.author.image" :alt="comment.author.username" />
                                    </router-link>

                                    <router-link
                                        class="link"
                                        :to="{name: 'userProfile', params: {slug: comment.author.username}}"
                                    >
                                        {{ comment.author.username }}
                                    </router-link>

                                    <span>{{ moment(comment.createdAt).format('DD.MM.YYYY') }}</span>
                                </div>
                                <button
                                    class="link"
                                    v-if="currentUser && currentUser.username === comment.author.username"
                                    @click="removeComment(comment.id)"
                                >
                                    Remove Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import {mapGetters, mapState} from 'vuex';
import {actionsTypes} from '@/modules/comments';
import {gettersTypes} from '@/modules/auth';
import McvValidationErrors from '@/components/ValidationErrors';

export default {
    name: 'mcv-comments',
    components: {
        McvValidationErrors,
    },
    data() {
        return {
            moment,
            commentBody: '',
        };
    },
    computed: {
        ...mapState({
            comments: (state) => state.comments.data,
            isSubmit: (state) => state.comments.isSubmit,
            errors: (state) => state.comments.errors,
        }),
        ...mapGetters({
            currentUser: gettersTypes.currentUser,
            isLoggedIn: gettersTypes.isLoggedIn,
        }),
        routeSlug() {
            return this.$route.params.slug;
        },
    },
    methods: {
        getComments() {
            this.$store.dispatch(actionsTypes.getComments, {slug: this.routeSlug});
        },
        onSubmit() {
            this.$store.dispatch(actionsTypes.addComment, {
                slug: this.routeSlug,
                body: this.commentBody,
            });
            this.commentBody = '';
        },
        removeComment(id) {
            this.$store
                .dispatch(actionsTypes.removeComment, {slug: this.routeSlug, id: id})
                .then(() => this.getComments());
        },
    },
    mounted() {
        this.getComments();
    },
};
</script>

<style>
.comments {
    position: relative;
    display: block;
    width: 100%;
    margin-bottom: 50px;
}
.comments__form {
    position: relative;
    width: 100%;
    border: 2px solid var(--color-black);
    margin-bottom: 20px;
}
.comments__form textarea {
    position: relative;
    width: 100%;
    height: 120px;
    padding: 20px;
    resize: none;
}
.comments__bottom {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: var(--color-grey);
}
.comments__bottom .btn {
    width: fit-content;
    padding: 0 25px;
}
.comments__bottom button {
    cursor: pointer;
}
.comments__items,
.comments__item {
    position: relative;
    display: block;
    width: 100%;
}
.comments__item {
    border: 2px solid var(--color-black);
    margin-bottom: 20px;
}
.comments__item:last-child {
    margin-bottom: 0;
}
.comments__item .text {
    padding: 20px;
}
.comments__user {
    position: relative;
    display: flex;
    align-items: center;
}
.comments__user span {
    margin-left: 15px;
}
.comments__logo {
    position: relative;
    width: 40px;
    min-width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--color-black);
    overflow: hidden;
    margin-right: 15px;
}
.comments__logo img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    backface-visibility: hidden;
    will-change: transform;
    transition: all 0.7s;
}
.comments__logo:hover img {
    transform: scale(1.05);
}
</style>
