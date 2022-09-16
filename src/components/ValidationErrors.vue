<template>
    <ul>
        <li v-for="errorMessage in errorMessages" :key="errorMessage">
            {{ errorMessage }}
        </li>
    </ul>
</template>

<script>
export default {
    name: 'mcv-validation-errors',
    props: {
        validationErrors: {
            type: Object,
            required: true,
        },
    },
    computed: {
        errorMessages() {
            return Object.keys(this.validationErrors).map((item) => {
                const message = this.validationErrors[item].join(', ');
                return `${item} ${message}`;
            });
        },
    },
};
</script>
