<template>
    <q-card flat square id="event-card" class="q-ma-md">
        <q-item clickable class="q-pt-sm" @click="navigateToEDetail">
            <q-item-section class="card-text">
                <q-item-label class="q-pt-sm card-title">{{ title }}</q-item-label>
                <q-item-label caption class="card-description">{{ description }}</q-item-label>
            </q-item-section>
            <q-item-section class="calendar">
                <p class="text-h6 text-weight-medium">{{ month }}</p>
                <p>{{ day }}</p>
            </q-item-section>
        </q-item>
    </q-card>
</template>

<script>
    export default {
        props: {
            id: Number,
            title: String,
            description: String,
            month: String,
            day: String
        },
        methods: {
            navigateToEDetail() {
                this.$router.push(`/events/${this.id}`);
            }
        },
    }
</script>

<style scoped lang="scss">

    .card-text {
        flex-grow: 3;
    }

    .card-title {
        color: $primary;
        font-size: 1.3em;
    }

    .card-description {
        color: $primary;
    }

    .calendar {
        border: 1px solid $primary;
        text-align: center;
        flex-grow: 1;
        height: 75px;
        max-width: 75px;

        p {
            margin: 0 10px 0 10px;
        }
    }
</style>
