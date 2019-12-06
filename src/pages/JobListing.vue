<template>
    <q-page-container>
        <q-page id="listing-page">
            <div class="listing-page-container">
                <ais-instant-search
                    :search-client="searchClient"
                    :index-name="sortByDate ? 'Jobs_date' : 'jobs'"
                    class="full-width"
                >
                    <ais-configure v-bind="searchParameters" />
                    <ais-search-box>
                        <div slot-scope="{ currentRefinement, isSearchStalled, refine }">
                            <div class="search-and-button q-pl-sm">
                                <q-input
                                    square
                                    outlined
                                    :value="currentRefinement"
                                    @input="refine($event)"
                                    placeholder="Search"
                                    class="search-bar"
                                >
                                    <q-btn flat class="search-button" icon="search"></q-btn>
                                </q-input>
                                <q-btn
                                    round
                                    color="primary"
                                    icon="settings"
                                    class="q-mx-sm"
                                    to="/jobs/filter"
                                />
                            </div>
                        </div>
                    </ais-search-box>
                    <ais-hits>
                        <template slot-scope="{ items }">
                            <q-tabs
                                :value="currentTab"
                                @input="updateCurrentTab"
                                active-color="primary"
                                indicator-color="primary"
                                align="justify"
                                class="text-primary"
                            >
                                <q-tab name="list" label="List" />
                                <q-tab name="map" label="Map" />
                            </q-tabs>
                            <q-tab-panels :value="currentTab" @input="updateCurrentTab" animated>
                                <q-tab-panel name="list">
                                    <job-card
                                        v-for="item in items"
                                        :key="item.objectID"
                                        :id="item.objectID"
                                        :title="item.title"
                                        :sub-title="item.employer.name"
                                        :time="item.created_at"
                                        main-icon="favorite"
                                    />
                                </q-tab-panel>
                                <q-tab-panel name="map" class="q-pa-none">
                                    <google-map :pins="mapPins(items)" @select="onMapSelect" class="map"/>
                                </q-tab-panel>
                            </q-tab-panels>
                        </template>
                    </ais-hits>
                </ais-instant-search>
            </div>
        </q-page>
    </q-page-container>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    import { AisInstantSearch, AisSearchBox, AisHits, AisConfigure } from 'vue-instantsearch';
    import algoliasearch from 'algoliasearch/lite';
    import JobCard from '../components/JobCard';
    import GoogleMap from '../components/GoogleMap';

    export default {
        components: {
            JobCard,
            AisInstantSearch,
            AisSearchBox,
            AisHits,
            AisConfigure,
            GoogleMap,
        },
        data: () => ({
            searchClient: algoliasearch(
                process.env.ALGOLIA_APP_ID,
                process.env.ALGOLIA_SEARCH_KEY,
            ),
        }),
        computed: {
            ...mapState([
                'coordinates',
                'currentTab',
                'nearby',
                'sortByDate',
                'radius',
                'educationLevel',
                'jobType',
            ]),
            searchParameters() {
                const parameters = {};

                if(this.nearby) {
                    parameters.aroundLatLng = `${this.coordinates.latitude}, ${this.coordinates.longitude}`;

                    if(this.radius) {
                        parameters.aroundRadius = Math.round(this.milesToKilometers(this.radius) * 100);
                    }
                }

                if(this.educationLevel !== 'all') {
                    parameters.filters = `req_education:${this.educationLevel}`;
                }

                if(this.jobType !== 'all') {
                    let prefix = '';

                    if(parameters.filters) {
                        prefix = `${parameters.filters} AND `;
                    }

                    parameters.filters = `${prefix}job_type:${this.jobType}`;
                }

                return parameters;
            },
        },
        methods: {
            ...mapMutations(['updateCurrentTab']),
            mapPins(items) {
                return items
                    .map((item, index) => item.locations.data
                        .map(location => ({
                            label: index + 1,
                            value: item.objectID,
                            lat: location.lat,
                            lng: location.lng
                        })))
                    .reduce((finalArr, locationArr) => [...finalArr, ...locationArr], [])
                    .filter(location => location.lat && location.lng);
            },
            onMapSelect(value) {
                this.$router.push(`/jobs/${value}`);
            },
            milesToKilometers(miles) {
                return miles * 1.60934;
            }
        },
    };
</script>

<style scoped lang="scss">
    #listing-page {
        text-align: center;

        h1 {
            font-size: 2em;
            margin: 20px;
        }
    }

    .listing-page-container {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        max-width: 600px;
        width: 100%;
    }

    .search-and-button {
        width: 100%;
        display: flex;
        align-items: center;
    }

    .search-bar {
        flex-grow: 2;
    }

    .map {
        width: 100vw;
        height: calc(100vh - 216px);
        margin: 0 0 -68px 0;
    }
</style>
