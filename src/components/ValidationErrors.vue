<template>
    <ul class="errors">
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

<style>
.errors {
    position: relative;
    width: 100%;
    margin-bottom: 30px;
}
.errors li {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    font-size: 16px;
    text-transform: capitalize;
    padding: 0 20px;
    background-color: var(--color-grey);
    margin-bottom: 10px;
}
.errors li:last-child {
    margin-bottom: 0;
}
</style>
