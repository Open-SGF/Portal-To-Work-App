<template>
    <q-page padding class="desktop-friendly">
        <q-form class="text-primary">
            <q-item>
                <q-item-section>
                    <q-item-label>Only Jobs Near Me</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                    <q-toggle
                        color="primary"
                        :value="nearby"
                        @input="updateNearby"/>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>
                    <q-item-label>Show Newest Jobs First</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                    <q-toggle
                        color="primary"
                        :value="sortByDate"
                        @input="updateSortByDate"/>
                </q-item-section>
            </q-item>
            <q-item>
                <q-input
                    class="form-item-width"
                    label="Radius"
                    :value="radius"
                    @input="updateRadius"
                    suffix="mi"
                />
            </q-item>
            <q-item>
                <q-select
                    class="form-item-width"
                    :options="educationLevelOptions"
                    :value="educationLevel"
                    @input="updateEducationLevel"
                    label="Education Level"
                    emit-value
                    map-options
                />
            </q-item>
            <q-item>
                <q-select
                    class="form-item-width"
                    :options="jobTypeOptions"
                    :value="jobType"
                    @input="updateJobType"
                    label="Job Type"
                    emit-value
                    map-options
                />
            </q-item>
        </q-form>
    </q-page>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';

    import jobTypes from '../common/job-types';
    import educationLevels from '../common/education-levels';

    export default {
        data: () => ({
            educationLevelOptions: educationLevels,
            jobTypeOptions: jobTypes,
        }),
        computed: {
            ...mapState(['nearby', 'sortByDate', 'radius', 'educationLevel', 'jobType']),
        },
        methods: {
            ...mapMutations([
                'updateNearby',
                'updateSortByDate',
                'updateRadius',
                'updateEducationLevel',
                'updateJobType',
            ]),
        },
    };
</script>

<style scoped lang="scss">
    .form-item-width {
        width: 100%;
        font-size: 1.25em;
        padding: 5px 0px 0px 0px;
        color: $primary;
    }
</style>
