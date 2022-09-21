<template>
    <div class="header">
        <router-link :to="{name: 'globalFeed'}" class="header__logo">McvClone</router-link>
        <ul class="header__menu">
            <li>
                <router-link :to="{name: 'globalFeed'}" exact active-class="active">Home</router-link>
            </li>

            <template v-if="isLoggedIn">
                <li>
                    <router-link :to="{name: 'createArticle'}" active-class="active">Create Article</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'settings'}" active-class="active">Settings</router-link>
                </li>
                <li>
                    <router-link
                        :to="{name: 'userProfile', params: {slug: currentUser.username}}"
                        active-class="active"
                    >
                        <img :src="currentUser.image" alt />
                        {{ currentUser.username }}
                    </router-link>
                </li>
            </template>

            <template v-if="isAnonymous">
                <li>
                    <router-link :to="{name: 'login'}" active-class="active">Sign In</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'register'}" active-class="active">Sing Up</router-link>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {gettersTypes} from '@/modules/auth';

export default {
    name: 'mcv-header',
    computed: {
        ...mapGetters({
            currentUser: gettersTypes.currentUser,
            isLoggedIn: gettersTypes.isLoggedIn,
            isAnonymous: gettersTypes.isAnonymous,
        }),
    },
};
</script>

<style>
.header {
}
</style>
