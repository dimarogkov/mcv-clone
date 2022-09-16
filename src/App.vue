<template>
    <div>
        <mcv-header />

        <router-view />
    </div>
</template>

<script>
import McvHeader from '@/components/Header';

export default {
    name: 'mcv-app',
    components: {
        McvHeader,
    },
};
</script>
