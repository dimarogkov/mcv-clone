<template>
    <router-link class="back-page-btn" :to="href">
        <span></span>
    </router-link>
</template>

<script>
export default {
    name: 'mcv-back-page-btn',
    props: {
        href: {
            type: String,
            required: true,
        },
    },
};
</script>

<style>
.back-page-btn {
    position: absolute;
    z-index: 1;
    top: 90px;
    left: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 2px solid var(--color-black);
    background-color: var(--color-black);
    transition: all 0.4s;
}
.back-page-btn:hover {
    background-color: transparent;
}
.back-page-btn:active {
    transform: translateY(5px);
}
.back-page-btn span {
    position: relative;
    display: flex;
    align-items: center;
    width: 10px;
    height: 10px;
    border-left: 1px solid var(--color-white);
    border-bottom: 1px solid var(--color-white);
    margin-left: 4px;
    transform: rotate(45deg);
    transition: all 0.4s;
}
.back-page-btn:hover span {
    border-color: var(--color-black);
}
</style>
