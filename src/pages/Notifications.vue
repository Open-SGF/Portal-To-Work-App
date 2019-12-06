<template>
    <q-page id="notifications">
        <div class="notifications-page-container">
            <q-tabs
                v-model="tab"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                class="text-primary"
            >
                <q-tab name="jobs" label="Jobs" />
                <q-tab name="events" label="Events" />
            </q-tabs>

            <q-separator />

            <q-tab-panels style="width: 100%" v-model="tab" animated>
                <q-tab-panel name="jobs">
                    <div class="card-container">
                        <job-card
                            title="Delivery Driver"
                            sub-title="Gold Mechanical"
                            main-icon="favorite"
                            walking-distance="5 min"
                            busing-distance="10 min"
                        />
                        <div class="card-container">
                            <job-card
                                title="Delivery Driver"
                                sub-title="Gold Mechanical"
                                main-icon="favorite"
                                walking-distance="5 min"
                                busing-distance="10 min"
                            />
                        </div>
                        <div class="card-container">
                            <job-card
                                title="Delivery Driver"
                                sub-title="Gold Mechanical"
                                main-icon="favorite"
                                walking-distance="5 min"
                                busing-distance="10 min"
                            />
                        </div>
                    </div>
                </q-tab-panel>

                <q-tab-panel name="events">
                    <div class="card-container">
                        <event-card
                            title="Pizza Social"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            month="Nov"
                            day="4"
                        />
                        <event-card
                            title="Pizza Social"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            month="Nov"
                            day="4"
                        />
                        <event-card
                            title="Pizza Social"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            month="Nov"
                            day="4"
                        />
                    </div>
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </q-page>
</template>

<script>
    import JobCard from '../components/JobCard';
    import EventCard from '../components/EventCard';

    export default {
        name: 'SavedJobs',
        components: {JobCard, EventCard},
        data () {
            return {
                tab: 'jobs'
            }
        }
    }
</script>

<style lang="scss">

    .notifications-page-container {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .card-container {
        width: 100%;
    }
</style>
