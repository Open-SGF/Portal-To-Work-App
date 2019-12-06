<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
    export default {
        name: 'SimpleLayout',
        computed: {
            title() {
                return this.$route.meta.title;
            },
            back() {
                return this.$route.meta.back;
            },
        },
    }
</script>
