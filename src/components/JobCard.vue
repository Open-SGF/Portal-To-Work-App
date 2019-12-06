<template>
    <q-card flat square class="listing-card q-py-sm">
        <q-item clickable @click="navigateToDetail">
            <q-item-section avatar v-if="mainIcon">
                <q-icon :name="mainIcon" size="lg" class="icon"></q-icon>
            </q-item-section>
            <q-item-section class="text-left">
                <q-item-label class="card-title">{{ title }}</q-item-label>
                <q-item-label caption class="card-subtitle">{{ subTitle }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
                <p class="q-ma-none">{{ timeAgo }}</p>
            </q-item-section>
        </q-item>
    </q-card>
</template>

<script>
    import { format } from 'timeago.js';

    export default {
        props: {
            id: [Number, String],
            mainIcon: String,
            title: String,
            subTitle: String,
            walkingTime: String,
            busTime: String,
            walkingDistance: String,
            bikingDistance: String,
            busingDistance: String,
            drivingDistance: String,
            time: String,
        },
        methods: {
            navigateToDetail() {
                this.$router.push(`/jobs/${this.id}`);
            },
        },
        computed: {
            timeAgo() {
                return format(this.time);
            },
        },
    };
</script>

<style scoped lang="scss">
    .listing-card {
        margin: 15px 0;
        background-color: lighten($primary, 50%);
    }

    .card-title {
        color: $primary;
        font-size: 1.3em;
    }

    .card-subtitle {
        color: $primary;
        font-size: 1.2em;
    }


    .icon {
        color: $primary;

        p {
            margin: 0;
        }
    }
</style>
