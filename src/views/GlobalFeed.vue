<template>
    <div class="section">
        <div class="container">
            <div class="row">
                <div class="col-12">Banner</div>
            </div>
            <div class="row">
                <div class="col-9">
                    <mcv-feed :api-url="apiUrl" />
                </div>
                <div class="col-3">Popular Tags</div>
            </div>
        </div>
    </div>
</template>

<script>
import McvFeed from '@/components/Feed';

export default {
    name: 'mcv-global-feed',
    components: {
        McvFeed,
    },
    data() {
        return {
            apiUrl: '/articles',
        };
    },
};
</script>
