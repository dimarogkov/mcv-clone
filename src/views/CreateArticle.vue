<template>
    <div class="section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="full-block">
                        <div class="full-wrapper">
                            <h1 class="h1 title">Create Article</h1>

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
</template>

<script>
import {mapState} from 'vuex';
import {actionsTypes} from '@/modules/article';
import McvCreateArticleForm from '@/components/CreateArticleForm';
import McvValidationErrors from '@/components/ValidationErrors';

export default {
    name: 'mcv-create-article',
    components: {
        McvCreateArticleForm,
        McvValidationErrors,
    },
    computed: {
        ...mapState({
            validationErrors: (state) => state.article.validationErrors,
            isSubmit: (state) => state.article.isSubmit,
        }),
        initialValues() {
            return {
                title: '',
                desk: '',
                body: '',
                tagList: [],
            };
        },
    },
    methods: {
        onSubmit(articleData) {
            this.$store
                .dispatch(actionsTypes.createArticle, {articleData})
                .then((article) => this.$router.push({name: 'article', param: {slug: article.slug}}));
        },
    },
};
</script>
