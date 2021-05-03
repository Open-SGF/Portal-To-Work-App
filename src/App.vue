<template>
    <div id="q-app">
        <router-view/>
    </div>
</template>

<script>
    import { mapMutations, mapActions } from 'vuex';
    import { setup } from './common/onesignal';
    import { jobsApi } from './common/http';

    export default {
        name: 'App',
        created() {
            this.initialiseStore();

            setup().then((userId) => {
                this.updateUserId(userId);
                this.registerDevice();
            });

            this.downloadAllEvents();

        },
        methods: {
            ...mapMutations(['initialiseStore', 'updateUserId']),
            ...mapActions(['registerDevice']),
            async downloadAllEvents() {
                let events = []
                try {
                    const res = await jobsApi.get('/event');
                    events = res.data.data;
                } catch (e) {}

                localStorage.setItem('events', JSON.stringify(events));
            },
        },
    };
</script>
