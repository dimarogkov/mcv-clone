<template>
    <div>
        <mcv-header />

        <router-view />
    </div>
</template>

<script>
import McvHeader from '@/components/Header';
import {actionsTypes} from '@/modules/auth';

export default {
    name: 'mcv-app',
    components: {
        McvHeader,
    },
    mounted() {
        this.$store.dispatch(actionsTypes.getCurrentUser);
    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');

:root {
    --color-white: #fff;
    --color-black: #282828;
    --header-height: 70px;
}
* {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    -webkit-text-size-adjust: none;
    box-sizing: border-box;
}
html::-webkit-scrollbar,
html *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
html::-webkit-scrollbar-track,
html *::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
}
html::-webkit-scrollbar-thumb,
html *::-webkit-scrollbar-thumb {
    background: var(--color-black);
}
:focus,
:active,
:visited {
    outline: none;
}
body {
    width: 100%;
    font-family: 'Fira Code', monospace;
    color: var(--color-black);
    margin: 0;
    padding: 0;
}
.section {
    position: relative;
    width: 100%;
}
a {
    color: var(--color-black);
    text-decoration: none;
}
ol,
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
@media (max-width: 767px) {
    :root {
        --header-height: 60px;
    }
}
</style>
