<template>
    <div v-if="tags" class="tags">
        <ul class="tags__list">
            <li v-for="tag in tags" :key="tag">
                <span>{{ tag }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'mcv-article-tags',
    props: {
        tags: {
            type: Array,
            required: false,
        },
    },
};
</script>
