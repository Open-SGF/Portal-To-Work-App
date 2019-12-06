<template>
    <q-tabs
        inline-label
        class="bg-primary text-white shadow-2">
        <q-route-tab name="home" icon="home" to="/app/jobs" />
        <q-route-tab exact name="saved-jobs" icon="favorite" to="/app/saved-jobs"/>
        <q-route-tab exact name="events" icon="calendar_today" to="/app/events"/>
        <q-route-tab exact name="notifications" icon="notifications" to="/app/notifications"/>
        <q-route-tab exact name="settings" icon="settings" to="/app/settings/location"/>
    </q-tabs>
</template>

<script>
    export default {
        name: "Navigation"
    }
</script>

<style scoped>
</style>
