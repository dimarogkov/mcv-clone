<template>
    <div class="section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="full-block">
                        <div class="full-wrapper">
                            <h1 class="h1 title">Login Page</h1>

                            <p>
                                <router-link :to="{name: 'register'}" class="link">Need at account?</router-link>
                            </p>

                            <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors" />

                            <form class="form" @submit.prevent="onSubmit">
                                <input type="text" name="email" placeholder="Email" v-model="email" />
                                <input type="password" name="password" placeholder="Password" v-model="password" />
                                <button class="btn" :disabled="isSubmit">Sign In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import McvValidationErrors from '@/components/ValidationErrors';
import {actionsTypes} from '@/modules/auth';

export default {
    name: 'mcv-login',
    components: {
        McvValidationErrors,
    },
    computed: {
        ...mapState({
            isSubmit: (state) => state.auth.isSubmit,
            validationErrors: (state) => state.auth.validationErrors,
        }),
        currentRoute() {
            console.log(this.$route.path);
            return this.$route.path;
        },
    },
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        onSubmit() {
            this.$store
                .dispatch(actionsTypes.login, {
                    email: this.email,
                    password: this.password,
                })
                .then(() => this.$router.push({name: 'globalFeed'}));
        },
    },
    unmounted() {
        this.$store.dispatch(actionsTypes.getDefault);
    },
};
</script>
