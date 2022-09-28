<template>
    <div>
        <mcv-loader v-if="isLoading" />

        <mcv-back-page-btn v-if="href" :href="href" />

        <div class="section" v-if="article">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="full-block">
                            <div class="full-wrapper">
                                <h1 class="h1 title">Edit Article</h1>

                                <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors" />

                                <mcv-create-article-form
                                    :initialValues="initialValues"
                                    :isSubmit="isSubmit"
                                    @articleSubmit="onSubmit"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import {actionsTypes} from '@/modules/article';
import McvLoader from '@/components/Loader';
import McvCreateArticleForm from '@/components/CreateArticleForm';
import McvValidationErrors from '@/components/ValidationErrors';
import McvBackPageBtn from '@/components/BackPageBtn';

export default {
    name: 'mcv-edit-article',
    components: {
        McvLoader,
        McvCreateArticleForm,
        McvValidationErrors,
        McvBackPageBtn,
    },
    computed: {
        ...mapState({
            validationErrors: (state) => state.article.validationErrors,
            isLoading: (state) => state.article.isLoading,
            isSubmit: (state) => state.article.isSubmit,
            article: (state) => state.article.data,
        }),
        initialValues() {
            return {
                title: this.article.title,
                description: this.article.description,
                body: this.article.body,
                tagList: this.article.tagList,
            };
        },
        routeSlug() {
            return this.$route.params.slug;
        },
        href() {
            return `/articles/${this.routeSlug}`;
        },
    },
    mounted() {
        this.$store.dispatch(actionsTypes.getArticle, {slug: this.routeSlug});
    },
    methods: {
        onSubmit(articleData) {
            const slug = this.$route.params.slug;
            this.$store.dispatch(actionsTypes.updateArticle, {slug, articleData}).then((article) => {
                this.$router.push({name: 'article', params: {slug: article.slug}});
            });
        },
    },
    unmounted() {
        this.$store.dispatch(actionsTypes.getDefault);
    },
};
</script>
