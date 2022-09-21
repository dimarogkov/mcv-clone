<template>
    <mcv-banner />

    <div class="section">
        <div class="container">
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
import McvBanner from '@/components/Banner';
import McvFeed from '@/components/Feed';
import McvTags from '@/components/Tags';

export default {
    name: 'mcv-tag-feed',
    components: {
        McvBanner,
        McvFeed,
        McvTags,
    },
    computed: {
        apiUrl() {
            const tagName = this.$route.params.slug;
            return `/articles?tag=${tagName}`;
        },
    },
};
</script>
