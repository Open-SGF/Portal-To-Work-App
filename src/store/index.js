import Vue from 'vue';
import Vuex from 'vuex';
import { portalToWorkApi } from '../common/http';

Vue.use(Vuex);

export default function (/* { ssrContext } */) {

    const Store = new Vuex.Store({
        state: {
            userId: null,
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipCode: '',
            coordinates: {
                latitude: '',
                longitude: '',
            },
            nearby: true,
            sortByDate: false,
            radius: '',
            educationLevel: 'all',
            jobType: 'all',
            currentTab: 'list',
            favoriteJobs: [],
        },
        mutations: {
            initialiseStore(state) {
                if (window === undefined) return;

                if (localStorage.getItem('store')) {
                    this.replaceState(
                        Object.assign(state, JSON.parse(localStorage.getItem('store'))),
                    );
                }
            },
            updateAddressLine1(state, value) {
                state.addressLine1 = value;
            },
            updateAddressLine2(state, value) {
                state.addressLine2 = value;
            },
            updateCity(state, value) {
                state.city = value;
            },
            updateState(state, value) {
                state.state = value;
            },
            updateZipCode(state, value) {
                state.zipCode = value;
            },
            updateCoordinates(state, { latitude, longitude }) {
                state.coordinates.latitude = latitude;
                state.coordinates.longitude = longitude;
            },
            updateUserId(state, value) {
                state.userId = value;
            },
            updateNearby(state, value) {
                state.nearby = value;
            },
            updateSortByDate(state, value) {
                state.sortByDate = value;
            },
            updateRadius(state, value) {
                state.radius = value;
            },
            updateEducationLevel(state, value) {
                state.educationLevel = value;
            },
            updateJobType(state, value) {
                state.jobType = value;
            },
            updateCurrentTab(state, value) {
                state.currentTab = value;
            },
            addFavoriteJob(state, value) {
                state.favoriteJobs = [
                    value,
                    ...state.favoriteJobs,
                ];
            },
            removeFavoriteJob(state, id) {
                state.favoriteJobs = state.favoriteJobs.filter(job => job.id !== id);
            },
        },
        getters: {},
        actions: {
            async registerDevice({ state }) {

                if (!state.userId) return;

                if (!state.coordinates.latitude || !state.coordinates.longitude) return;

                await portalToWorkApi.post('/device/register', {
                    playerId: state.userId,
                    lat: state.coordinates.latitude,
                    lng: state.coordinates.longitude,
                });
            },
        },

        // enable strict mode (adds overhead!)
        // for dev mode only
        strict: process.env.DEV,
    });

    Store.subscribe((mutation, state) => {
        if (window === undefined) return;

        localStorage.setItem('store', JSON.stringify(state));
    });

    return Store;
}
