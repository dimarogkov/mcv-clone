<template>
    <form class="form" @submit.prevent="onSubmit">
        <input type="text" name="title" placeholder="Title" v-model="title" />
        <input type="text" name="desk" placeholder="Description" v-model="description" />
        <textarea name="body" placeholder="What is this article about?" v-model="body" />
        <input type="text" name="tags" placeholder="Enter tags" v-model="tagList" />
        <button class="btn" :disabled="isSubmit">Create</button>
    </form>
</template>

<script>
export default {
    name: 'mcv-create-article-form',
    props: {
        initialValues: {
            type: Object,
            required: true,
        },
        validationErrors: {
            type: Object,
            required: false,
        },
        isSubmit: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            title: this.initialValues.title,
            description: this.initialValues.description,
            body: this.initialValues.body,
            tagList: this.initialValues.tagList.join(' '),
        };
    },
    methods: {
        onSubmit() {
            const form = {
                title: this.title,
                description: this.description,
                body: this.body,
                tagList: this.tagList.split(' '),
            };
            this.$emit('articleSubmit', form);
        },
    },
};
</script>
