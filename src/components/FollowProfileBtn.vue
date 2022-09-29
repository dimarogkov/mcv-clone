<template>
    <button class="btn" @click="followProfile" :disabled="isSubmit">
        <template v-if="followingStatus">Unfollow</template>
        <template v-else>Follow</template>
        {{ username }}
    </button>
</template>

<script>
import {actionsTypes} from '@/modules/userProfile';
import {mapState} from 'vuex';

export default {
    name: 'mcv-follow-profile-btn',
    props: {
        followingStatus: {
            type: Boolean,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        userSlug: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState({
            isSubmit: (state) => state.userProfile.isSubmit,
        }),
    },
    methods: {
        followProfile() {
            this.$store.dispatch(actionsTypes.followProfile, {
                slug: this.userSlug,
                followStatus: this.followingStatus,
            });
        },
    },
};
</script>
