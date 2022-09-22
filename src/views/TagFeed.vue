<template>
    <mcv-banner />

    <div class="section">
        <div class="container">
            <div class="row">
                <div class="col-9">
                    <mcv-feed-toggle :tag-name="tagName" />
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
import McvFeedToggle from '@/components/FeedToggle';

export default {
    name: 'mcv-tag-feed',
    components: {
        McvBanner,
        McvFeed,
        McvTags,
        McvFeedToggle,
    },
    computed: {
        tagName() {
            return this.$route.params.slug;
        },
        apiUrl() {
            return `/articles?tag=${this.tagName}`;
        },
    },
};
</script>
