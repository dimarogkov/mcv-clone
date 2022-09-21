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
                <div class="col-3">
                    <mcv-tags />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import McvFeed from '@/components/Feed';
import McvTags from '@/components/Tags';

export default {
    name: 'mcv-global-feed',
    components: {
        McvFeed,
        McvTags,
    },
    data() {
        return {
            apiUrl: '/articles',
        };
    },
};
</script>
