<template>
    <mcv-loader v-if="isLoading" />
    <mcv-validation-errors v-if="errors" :validation-errors="errors" />

    <mcv-back-page-btn v-if="href" :href="href" />

    <template v-if="userProfile">
        <div class="section user-profile">
            <div class="container">
                <div class="row">
                    <div class="col-xl-8 offset-xl-2 col-lt-10 offset-lt-1">
                        <div class="user-profile__block">
                            <div class="user-profile__logo">
                                <img v-if="userProfile.image" :src="userProfile.image" :alt="userProfile.username" />
                            </div>

                            <div class="user-profile__cont">
                                <h3 class="h3 title">{{ userProfile.username }}</h3>
                                <div v-if="userProfile.bio" class="text">{{ userProfile.bio }}</div>
                            </div>

                            <div class="user-profile__buttons" v-if="isUserProfile">
                                <router-link :to="{name: 'settings'}" class="btn">Edit the Profile</router-link>
                                <router-link :to="{name: 'createArticle'}" class="btn">Create Article</router-link>
                            </div>

                            <template v-else>
                                <div class="user-profile__buttons" v-if="isLoggedIn">
                                    <mcv-follow-profile-btn
                                        :followingStatus="userProfile.following"
                                        :username="userProfile.username"
                                        :userSlug="userSlug"
                                    />
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="container">
                <div class="row">
                    <div class="col-xl-8 offset-xl-2 col-lt-10 offset-lt-1">
                        <ul class="feed-toggle">
                            <li :class="{active: routeName === 'userProfile'}">
                                <router-link :to="{name: 'userProfile', params: {slug: userProfile.username}}">
                                    My Posts
                                </router-link>
                            </li>
                            <li :class="{active: routeName === 'userProfileFavorites'}">
                                <router-link :to="{name: 'userProfileFavorites', params: {slug: userProfile.username}}">
                                    Favorites Posts
                                </router-link>
                            </li>
                        </ul>

                        <mcv-feed :api-url="apiUrl" />
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import McvLoader from '@/components/Loader';
import McvValidationErrors from '@/components/ValidationErrors';
import McvFeed from '@/components/Feed';
import McvBackPageBtn from '@/components/BackPageBtn';
import McvFollowProfileBtn from '@/components/FollowProfileBtn';
import {actionsTypes} from '@/modules/userProfile';
import {gettersTypes} from '@/modules/auth';

export default {
    name: 'mcv-user-profile',
    components: {
        McvLoader,
        McvValidationErrors,
        McvFeed,
        McvBackPageBtn,
        McvFollowProfileBtn,
    },
    data() {
        return {
            href: '/',
        };
    },
    computed: {
        ...mapState({
            userProfile: (state) => state.userProfile.data,
            isLoading: (state) => state.userProfile.isLoading,
            errors: (state) => state.userProfile.errors,
        }),
        ...mapGetters({
            currentUser: gettersTypes.currentUser,
            isLoggedIn: gettersTypes.isLoggedIn,
        }),
        userSlug() {
            return this.$route.params.slug;
        },
        isUserProfile() {
            if (!this.currentUser || !this.userProfile) {
                return false;
            }

            return this.currentUser.username === this.userProfile.username;
        },
        apiUrl() {
            const isApiUrl = this.$route.path.includes('favorites');
            return isApiUrl ? `/articles?favorited=${this.userSlug}` : `/articles?author=${this.userSlug}`;
        },
        routeName() {
            return this.$route.name;
        },
    },
    watch: {
        userSlug() {
            this.getUserProfile();
        },
    },
    mounted() {
        this.getUserProfile();
    },
    methods: {
        getUserProfile() {
            this.$store.dispatch(actionsTypes.getUserProfile, {slug: this.userSlug});
        },
    },
};
</script>

<style>
.user-profile {
    position: relative;
    width: 100%;
    padding: 70px 0;
    background-color: var(--color-grey);
    margin-bottom: 30px;
}
.user-profile__block,
.user-profile__cont,
.user-profile__buttons {
    position: relative;
    width: 100%;
    text-align: center;
}
.user-profile__logo {
    position: relative;
    width: 120px;
    min-width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: var(--color-black);
    overflow: hidden;
    margin: 0 auto 20px auto;
}
.user-profile__logo img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}
.user-profile__cont {
    margin-bottom: 20px;
}
.user-profile__cont:last-child {
    margin-bottom: 0;
}
.user-profile__cont * {
    margin-bottom: 15px;
}
.user-profile__cont *:last-child {
    margin-bottom: 0;
}
.user-profile__buttons {
    display: flex;
    width: fit-content;
    margin: 0 auto;
}
.user-profile__buttons .btn {
    display: flex;
    align-items: center;
    width: fit-content;
    padding: 0 25px;
    margin-right: 10px;
}
.user-profile__buttons .btn:last-child {
    margin-right: 0;
}
</style>
