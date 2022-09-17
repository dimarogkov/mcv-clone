<template>
    <div>
        <mcv-header />

        <router-view />
    </div>
</template>

<script>
import McvHeader from '@/components/Header';
import {actionsTypes} from '@/modules/auth';

export default {
    name: 'mcv-app',
    components: {
        McvHeader,
    },
    mounted() {
        this.$store.dispatch(actionsTypes.getCurrentUser);
    },
};
</script>
