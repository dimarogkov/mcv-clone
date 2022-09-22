<template>
    <ul class="feed-toggle">
        <li v-if="isLoggedIn" :class="{active: routeName === 'yourFeed'}">
            <router-link :to="{name: 'yourFeed'}">Your Feed</router-link>
        </li>
        <li :class="{active: routeName === 'globalFeed'}">
            <router-link :to="{name: 'globalFeed'}">Global Feed</router-link>
        </li>
        <li v-if="tagName" :class="{active: routeName === 'tag'}">
            <router-link :to="{name: 'tag'}"># {{ tagName }}</router-link>
        </li>
    </ul>
</template>

<script>
import {mapGetters} from 'vuex';
import {gettersTypes} from '@/modules/auth';

export default {
    name: 'mcv-feed-toggle',
    props: {
        tagName: {
            type: String,
            required: false,
        },
    },
    computed: {
        ...mapGetters({
            isLoggedIn: gettersTypes.isLoggedIn,
        }),
        routeName() {
            return this.$route.name;
        },
    },
};
</script>

<style>
.feed-toggle {
    position: relative;
    display: flex;
    width: 100%;
    border-bottom: 2px solid rgba(40, 40, 40, 0.4);
    margin-bottom: 20px;
}
.feed-toggle li {
    position: relative;
    display: flex;
}
.feed-toggle li a {
    position: relative;
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 17px;
    color: rgba(40, 40, 40, 0.4);
    text-transform: capitalize;
    padding: 0 20px;
    transition: all 0.4s;
}
.feed-toggle li a:hover {
    color: var(--color-black);
}
.feed-toggle li a::before {
    position: absolute;
    content: '';
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-black);
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s;
}
.feed-toggle li.active a {
    color: var(--color-black);
}
.feed-toggle li.active a::before {
    opacity: 1;
    visibility: visible;
}
</style>
