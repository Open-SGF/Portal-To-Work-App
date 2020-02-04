<template>
    <q-page id="saved-jobs" class="desktop-friendly">
        <div class="card-container">
            <job-card
                v-for="job in favoriteJobs"
                :id="job.id"
                :key="job.id"
                :title="job.title"
                :sub-title="job.employer"
                :time="job.created_at"
                main-icon="favorite"
            />
        </div>
    </q-page>
</template>

<script>
    import JobCard from "../components/JobCard";
    import { mapState } from 'vuex';

    export default {
        name: 'SavedJobs',
        components: {
            JobCard,
        },
        computed: {
            ...mapState(['favoriteJobs']),
        },
    }
</script>

<style scoped lang="scss">
    #saved-jobs {
        text-align: center;

        h1 {
            font-size: 2em;
            margin: 20px;
        }
    }
    .card-container {
        padding: 0 8px;
    }
</style>
