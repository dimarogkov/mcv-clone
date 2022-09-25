<template>
    <div class="section" v-if="currentUser">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="full-block">
                        <div class="full-wrapper">
                            <h1 class="h1 title">Settings</h1>

                            <mcv-validation-errors v-if="errors" :validation-errors="errors" />

                            <form class="form settings-form" @submit.prevent="onSubmit">
                                <input
                                    type="text"
                                    name="image"
                                    placeholder="URL of profile picture"
                                    v-model="form.image"
                                />
                                <input type="text" name="name" placeholder="Username" v-model="form.username" />
                                <input type="email" name="email" placeholder="Email" v-model="form.email" />
                                <textarea name="bio" placeholder="Short bio about you" v-model="form.bio" />
                                <button class="btn" :disabled="isSubmit">Update Settings</button>
                            </form>

                            <button class="btn" @click="logout">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import McvValidationErrors from '@/components/ValidationErrors';
import {gettersTypes} from '@/modules/auth';
import {actionsTypes as settingsActionsTypes} from '@/modules/settings';
import {actionsTypes as authActionsTypes} from '@/modules/auth';

export default {
    name: 'mcv-settings',
    components: {
        McvValidationErrors,
    },
    computed: {
        ...mapState({
            user: (state) => state.settings.user,
            isSubmit: (state) => state.settings.isSubmit,
            errors: (state) => state.settings.validationErrors,
        }),
        ...mapGetters({
            currentUser: gettersTypes.currentUser,
        }),
        form() {
            return {
                username: this.currentUser.username,
                bio: this.currentUser.bio,
                image: this.currentUser.image,
                email: this.currentUser.email,
            };
        },
    },
    methods: {
        onSubmit() {
            this.$store
                .dispatch(settingsActionsTypes.updateUser, {userData: this.form})
                .then(() => this.$store.dispatch(authActionsTypes.getCurrentUser));
        },
        logout() {
            this.$store.dispatch(authActionsTypes.logout).then(() => this.$router.push({name: 'globalFeed'}));
        },
    },
};
</script>

<style>
.settings-form {
    margin-bottom: 15px;
}
</style>
