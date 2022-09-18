<template>
    <div>Feed {{ apiUrl }}</div>
</template>

<script>
import {actionsTypes} from '@/modules/feed';

export default {
    name: 'mcv-feed',
    props: {
        apiUrl: {
            type: String,
            required: true,
        },
    },
    mounted() {
        this.$store.dispatch(actionsTypes.getFeed, {apiUrl: this.apiUrl});
    },
};
</script>
