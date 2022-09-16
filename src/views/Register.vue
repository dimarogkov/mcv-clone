<template>
    <div class="section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>Register Page</h1>

                    <p>
                        <router-link :to="{name: 'login'}">Have an account?</router-link>
                    </p>

                    <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors" />

                    <form @submit.prevent="onSubmit">
                        <fieldset>
                            <input type="text" name="username" placeholder="Username" v-model="username" />
                        </fieldset>

                        <fieldset>
                            <input type="text" name="email" placeholder="Email" v-model="email" />
                        </fieldset>

                        <fieldset>
                            <input type="text" name="password" placeholder="Password" v-model="password" />
                        </fieldset>

                        <button :disabled="isSubmit">Sign Up</button>
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
    },
    methods: {
        onSubmit() {
            this.$store
                .dispatch(actionsTypes.register, {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                })
                .then(() => this.$router.push({name: 'home'}));
        },
    },
};
</script>
