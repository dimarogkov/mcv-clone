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
    --color-grey: #ecf0f1;
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
h1,
.h1 {
    position: relative;
    font-size: 40px;
    line-height: 1em;
}
h2,
.h2 {
    position: relative;
    font-size: 34px;
    line-height: 1em;
}
h3,
.h3 {
    position: relative;
    font-size: 28px;
    line-height: 1em;
}
.link {
    position: relative;
    display: inline-block;
    font-size: 17px;
    font-weight: 500;
    color: var(--color-black);
}
.link::before {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-black);
    transition: all 0.3s;
}
.link:hover::before {
    left: auto;
    right: 0;
    width: 0;
}
.btn {
    position: relative;
    cursor: pointer;
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 15px;
    color: var(--color-white);
    text-transform: uppercase;
    border: 2px solid var(--color-black);
    background-color: var(--color-black);
    transition: all 0.4s;
}
.btn:hover {
    color: var(--color-black);
    background-color: transparent;
}
.btn:active {
    transform: translateY(5px);
}
.btn[disabled] {
    opacity: 0.7;
    pointer-events: none;
}
.full-block {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: calc(100vh - var(--header-height));
    padding: 100px 0;
}
.full-wrapper {
    position: relative;
    width: 100%;
    max-width: 500px;
    text-align: center;
    margin: 0 auto;
}
.full-wrapper .title,
.full-wrapper p {
    margin-bottom: 30px;
}
.form {
    position: relative;
    width: 100%;
}
.form input,
.form textarea {
    position: relative;
    width: 100%;
    height: 50px;
    font-size: 16px;
    color: var(--color-black);
    padding: 0 20px;
    border: 2px solid var(--color-black);
    margin-bottom: 15px;
}
.form input:last-child,
.form textarea:last-child {
    margin-bottom: 0;
}
.form textarea {
    padding: 10px 20px;
    height: 120px;
    resize: none;
}
@media (max-width: 767px) {
    :root {
        --header-height: 60px;
    }
}
</style>
