<template>
    <q-page class="q-px-sm q-pt-lg desktop-friendly">
        <div v-if="isLoading" class="flex column display-block q-gutter-md items-center">
            <q-skeleton type="text" width="100%"/>
            <q-skeleton type="text" width="100%"/>
            <q-skeleton height="200px" width="100%" square/>
            <q-skeleton height="30px" width="80%" type="rect"/>
            <q-skeleton height="200px" width="100%" square/>
            <q-skeleton height="30px" width="50%" type="rect"/>
        </div>
        <div v-if="job">
            <p class="text-h5 text-weight-medium">{{ job.title }}</p>
            <div class="row">
                <p class="text-subtitle1">{{ job.employer.name }}</p>
                <q-space />
                <q-btn
                    round
                    flat
                    @click="toggleFavorite"
                    class="text-primary q-pb-md"
                    :icon="isFavorited ? 'favorite' : 'favorite_border'" />
            </div>

            <q-list bordered class="rounded-borders text-primary">
                <q-expansion-item
                    expand-separator
                    label="Job Description"
                >
                    <q-card>
                        <q-card-section>
                            <div v-html="job.description"></div>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>

                <q-item>
                    <q-item-label>Salary</q-item-label>
                    <q-space/>
                    <q-item-label>{{ job.pay_rate }}</q-item-label>
                </q-item>

                <q-item v-if="job.job_type">
                    <q-item-label>Job Type</q-item-label>
                    <q-space/>
                    <q-item-label>{{ jobType }}</q-item-label>
                </q-item>

                <q-item v-if="job.req_education">
                    <q-item-label>Requirements</q-item-label>
                    <q-space/>
                    <q-item-label>{{ educationRequirements }}</q-item-label>
                </q-item>
            </q-list>
            <q-btn
                unelevated
                rounded
                size="lg"
                color="primary"
                class="my-btn-center"
                label="APPLY NOW"
                type="a"
                target="_blank"
                :href="job.url"
            />

            <google-map v-if="locations.length > 0" :pins="locations" class="map" />

            <div class="row q-py-md">
                <div v-if="walkingTime" class="col icon-set">
                    <q-icon
                        name="directions_walk"
                        color="primary"
                        size="26px"
                    />
                    <p>{{ walkingTime }}</p>
                </div>
                <div v-if="bikingTime" class="col icon-set">
                    <q-icon
                        name="directions_bike"
                        color="primary"
                        size="26px"
                    />
                    <p>{{ bikingTime }}</p>
                </div>
                <div v-if="transitTime" class="col icon-set">
                    <q-icon
                        name="directions_bus"
                        color="primary"
                        size="26px"
                    />
                    <p>{{ transitTime }}</p>
                </div>
                <div v-if="drivingTime" class="col icon-set">
                    <q-icon
                        name="directions_car"
                        color="primary"
                        size="26px"
                    />
                    <p>{{ drivingTime }}</p>
                </div>
            </div>

            <q-card flat class="address-section text-primary">
                <q-card-section>
                    <q-btn
                        unelevated
                        rounded
                        class="q-px-xl q-py-sm"
                        size="lg"
                        color="primary"
                        label="Map"
                        type="a"
                        :href="directionsURL"
                        target="_blank"
                    />
                </q-card-section>
                <q-card-section
                    v-if="allLocations.length == 1"
                    class="q-py-none"
                >
                    <q-item-label>{{ job.locations.data[0].street }}</q-item-label>
                    <q-item-label caption>{{ job.locations.data[0].city }}, {{ job.locations.data[0].state }} {{
                        job.locations.data[0].zipcode }}
                    </q-item-label>
                </q-card-section>
                <q-card-section v-if="allLocations.length > 1" class="q-py-none">
                    <q-select
                        :options="options"
                        v-model="selectedLocation"
                        @input="getDirections"
                        emit-value
                    >
                    </q-select>
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>

<script>

    import { jobsApi } from '../common/http';
    import GoogleMap from '../components/GoogleMap';
    import { mapState, mapMutations } from 'vuex';
    import { getGoogleMaps } from '../common/google-maps';
    import jobTypes from '../common/job-types';
    import educationLevels from '../common/education-levels';

    export default {
        components: {
            GoogleMap,
        },
        data: () => ({
            isLoading: true,
            job: null,
            drivingTime: null,
            walkingTime: null,
            transitTime: null,
            bikingTime: null,
            options: [],
            selectedLocation: '',
            directionsURL: '',
        }),
        computed: {
            ...mapState(['coordinates', 'favoriteJobs']),
            educationRequirements() {
                return educationLevels
                    .filter(level => level.value === this.job.req_education)
                    .map(level => level.label)[0];
            },
            jobType() {
                return jobTypes
                    .filter(type => type.value === this.job.job_type)
                    .map(type => type.label)[0];
            },
            locations() {
                if (this.job == null) return [];

                return this.job.locations.data
                    .map(location => ({
                        lat: parseFloat(location.lat),
                        lng: parseFloat(location.lng),
                    }))
                    .filter(location => location.lng && location.lat);
            },
            allLocations() {
                if (this.job == null) return [];

                let locationList = this.job.locations.data
                    .map(location => ({
                        label: location.street,
                        value: location.street,
                        allData: location,
                    }))

                this.options = locationList;
                return locationList;
            },
            getDirections() {
                this.options.forEach(selected => {
                    if (this.selectedLocation == selected.label) {
                        let base = 'https://www.google.com/maps/dir/?api=1&destination=';
                        let next = '';

                        if (selected.allData.lat !== null && selected.allData.lng !== null) {
                            next = encodeURIComponent(selected.allData.lat) + ',' +
                                encodeURIComponent(' ' + selected.allData.lng);
                        } else {
                            next = encodeURIComponent(selected.allData.street + ' ') +
                                encodeURIComponent(selected.allData.city) + ',' +
                                encodeURIComponent(' ' + selected.allData.state + ' ') +
                                encodeURIComponent(selected.allData.zipcode);
                        }
                        this.directionsURL = base + next;
                    }
                });
            },
            isFavorited() {
                const ids = this.favoriteJobs.map(job => job.id);
                return ids.includes(this.job.id);
            },
        },
        methods: {
            ...mapMutations([
                'addFavoriteJob',
                'removeFavoriteJob',
            ]),

            toggleFavorite() {

                if (this.isFavorited) {
                    this.removeFavoriteJob(this.job.id);
                    return;
                }

                this.addFavoriteJob({
                    id: this.job.id,
                    title: this.job.title,
                    employer: this.job.employer.name,
                    created_at: this.job.created_at,
                });

            },

            async getTravelTimeFor(mode, dataName) {
                if (!this.locations) return;

                try {
                    const google = await getGoogleMaps();
    
                    let directionsService = new google.maps.DirectionsService();
                    let request = {
                        origin: new google.maps.LatLng(
                            parseFloat(this.coordinates.latitude),
                            parseFloat(this.coordinates.longitude),
                        ),
                        destination: new google.maps.LatLng(
                            this.locations[0].lat,
                            this.locations[0].lng,
                        ),
                        travelMode: mode,
                    };
                    directionsService.route(request, (result, status) => {
                        this[dataName] = result.routes[0].legs[0].duration.text;
                    });
                } catch (e) {}
            },
        },
        created() {
            const { id } = this.$route.params;

            if (!id) {
                this.$router.push('/404');
                return;
            }

            jobsApi.get(`/job/${id}`).then(res => {
                this.job = res.data.data;
                this.getTravelTimeFor('DRIVING', 'drivingTime');
                this.getTravelTimeFor('BICYCLING', 'bikingTime');
                this.getTravelTimeFor('TRANSIT', 'transitTime');
                this.getTravelTimeFor('WALKING', 'walkingTime');
                this.isLoading = false;

                // Create default directionsURL and selection
                let base = 'https://www.google.com/maps/dir/?api=1&destination=';
                let next = '';

                if (this.job.locations.data[0].lat !== null && this.job.locations.data[0].lng !== null) {
                    next = encodeURIComponent(this.job.locations.data[0].lat) + ',' +
                        encodeURIComponent(' ' + this.job.locations.data[0].lng);
                } else {
                    next = encodeURIComponent(this.job.locations.data[0].street + ' ') +
                        encodeURIComponent(this.job.locations.data[0].city) + ',' +
                        encodeURIComponent(' ' + this.job.locations.data[0].state + ' ') +
                        encodeURIComponent(this.job.locations.data[0].zipcode);
                }
                this.directionsURL = base + next;
                this.selectedLocation = this.job.locations.data[0].street;

            }).catch((err) => {
                this.$q.loading.hide();

                this.$q.notify('There was an error loading that job');
                this.$router.replace('/404');
                return;
            });
        },
    };
</script>

<style scoped lang="scss">
    .my-btn-center {
        display: block;
        margin: 20px auto;
    }

    .address-section {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .map {
        height: 200px;
    }

    .icon-set {
        flex-direction: column;
        text-align: center;
        font-size: .9rem;
    }
</style>
