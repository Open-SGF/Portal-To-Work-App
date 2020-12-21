<template>
    <q-page
        q-py-md
        q-px-lg
        class="flex flex-center event-page card-container"
    >
        <div class="desktop-friendly">
            <event-card
                v-for="card in events"
                :id="card.id"
                :key="card.id"
                :title="card.title"
                :description="card.description"
                month="Nov"
                day="4"
            />
        </div>
    </q-page>
</template>

<script>
    import EventCard from '../components/EventCard';

    export default {
        data: () => ({
            events: [],
        }),
        components: { EventCard },
        created() {
            const events = JSON.parse(localStorage.getItem('events'));
            this.events = events.slice(0, 100);
        },
    };
</script>

<style scoped lang="scss">
    .card-container {
        width: 100%;
    }

    .event-page {
        background-color: lighten($primary, 50%);
    }
</style>
