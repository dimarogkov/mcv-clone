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
    <div class="header-margin"></div>
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
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    display: flex;
    align-content: center;
    justify-content: space-between;
    width: 100%;
    height: var(--header-height);
    padding: 0 0 0 60px;
    background-color: var(--color-white);
    border-bottom: 1px solid var(--color-black);
}
.header__logo {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 5px;
}
.header__menu {
    position: relative;
    display: flex;
    height: calc(100% + 1px);
}
.header__menu li {
    position: relative;
    display: flex;
}
.header__menu li a {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 20px;
    border-right: 1px solid var(--color-black);
    transition: all 0.4s;
}
.header__menu li:first-child a {
    border-left: 1px solid var(--color-black);
}
.header__menu li:last-child a {
    border-right: none;
}
.header__menu li a.active {
    color: var(--color-white);
    background-color: var(--color-black);
}
.header-margin {
    position: relative;
    width: 100%;
    height: var(--header-height);
}
</style>
