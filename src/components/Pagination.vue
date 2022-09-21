<template>
    <ul class="pagination">
        <li v-for="page in pages" :key="page" :class="{active: currentPage === page}">
            <router-link :to="{path: url, query: {page: page}}">
                {{ page }}
            </router-link>
        </li>
    </ul>
</template>

<script>
import {range} from '@/helpers/functions';

export default {
    name: 'mcv-pagination',
    props: {
        total: {
            type: Number,
            required: true,
        },
        limit: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    computed: {
        pages() {
            const pagesCount = Math.ceil(this.total / this.limit);
            return range(1, pagesCount);
        },
    },
};
</script>

<style>
.pagination {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 50px 0;
}
.pagination li {
    position: relative;
    display: flex;
}
.pagination li a {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    font-size: 17px;
    color: var(--color-black);
    border: 1px solid var(--color-black);
    border-right: none;
    transition: all 0.3s;
}
.pagination li a:hover {
    background-color: var(--color-grey);
}
.pagination li:last-child a {
    border-right: 1px solid var(--color-black);
}
.pagination li.active a {
    color: var(--color-white);
    background-color: var(--color-black);
}
</style>
