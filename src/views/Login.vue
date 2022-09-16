<template>
    <div class="section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>Login Page</h1>

                    <p>
                        <router-link :to="{name: 'register'}">Need at account?</router-link>
                    </p>

                    <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors" />

                    <form @submit.prevent="onSubmit">
                        <fieldset>
                            <input type="text" name="email" placeholder="Email" v-model="email" />
                        </fieldset>

                        <fieldset>
                            <input type="text" name="password" placeholder="Password" v-model="password" />
                        </fieldset>

                        <button :disabled="isSubmit">Sign In</button>
                    </form>
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
                .then(() => this.$router.push({name: 'home'}));
        },
    },
};
</script>
