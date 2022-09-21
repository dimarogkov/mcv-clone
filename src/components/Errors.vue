<template>
    <ul class="errors">
        <li>{{ errorsMessage }}</li>
    </ul>
</template>

<script>
export default {
    name: 'mcv-errors',
    props: {
        errorsMessage: {
            type: String,
            required: false,
            default: 'Something went wrong',
        },
    },
};
</script>
