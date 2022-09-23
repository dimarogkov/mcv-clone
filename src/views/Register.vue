<template>
    <div class="section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="full-block">
                        <div class="full-wrapper">
                            <h1 class="h1 title">Register Page</h1>

                            <p>
                                <router-link :to="{name: 'login'}" class="link">Have an account?</router-link>
                            </p>

                            <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors" />

                            <form class="form" @submit.prevent="onSubmit">
                                <input type="text" name="username" placeholder="Username" v-model="username" />
                                <input type="text" name="email" placeholder="Email" v-model="email" />
                                <input type="password" name="password" placeholder="Password" v-model="password" />
                                <button class="btn" :disabled="isSubmit">Sign Up</button>
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
    name: 'mcv-register',
    components: {
        McvValidationErrors,
    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
        };
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
    methods: {
        onSubmit() {
            this.$store
                .dispatch(actionsTypes.register, {
                    username: this.username,
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
