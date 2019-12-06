<template>
    <q-tabs
        inline-label
        class="fixed-nav bg-primary text-white shadow-2">
        <q-route-tab name="home" icon="home" to="/jobs" />
        <q-route-tab exact name="saved-jobs" icon="favorite" to="/saved-jobs"/>
        <q-route-tab exact name="events" icon="calendar_today" to="/events"/>
        <q-route-tab exact name="notifications" icon="notifications" to="/notifications"/>
        <q-route-tab exact name="settings" icon="settings" to="/settings/location"/>
    </q-tabs>
</template>

<script>
    export default {
        name: "Navigation"
    }
</script>

<style scoped>
    .fixed-nav {
        position: fixed;
        bottom: 0;
        width: 100%;
        overflow: hidden;
    }
</style>
