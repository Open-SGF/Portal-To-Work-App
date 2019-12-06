<template>
    <div class="wrapper">
        <q-layout>
            <q-page-container>
                <q-page class="q-pt-md">
                    <p><strong>Location For Job Search</strong></p>
                    <q-btn
                        class="q-px-xl q-pa-sm"
                        size="md"
                        unelevated
                        rounded
                        color="primary"
                        label="Use My Current Location"
                        @click="getLocation"
                    />
                    <h5>OR</h5>
                    <q-form class="q-px-md q-pb-lg q-gutter-md">
                        <q-input
                            outlined
                            :value="addressLine1"
                            @input="updateAddressLine1"
                            label="Street Address"
                        />
                        <q-input
                            outlined
                            :value="addressLine2"
                            @input="updateAddressLine2"
                            label="Line 2"
                        />
                        <q-input
                            outlined
                            :value="city"
                            @input="updateCity"
                            label="City"
                        />
                        <q-select
                            outlined
                            :value="state"
                            @input="updateState"
                            label="State"
                            :options="options"
                            emit-value
                            map-options
                        />
                        <q-input
                            outlined
                            :value="zipCode"
                            @input="updateZipCode"
                            label="Postal Code"
                        />
                    </q-form>
                    <q-btn
                        class="q-px-xl q-pa-sm"
                        size="lg"
                        unelevated
                        rounded
                        @click="setAddress"
                        color="primary"
                        label="Use This Address"
                    />
                </q-page>
            </q-page-container>
        </q-layout>
        <q-dialog
            v-model="showError"
        >
            <q-card>
                <q-card-section>
                    <div class="text-h6">Whoops</div>
                </q-card-section>

                <q-card-section v-text="errorMessage">
                    Looks like your browser doesn't support this feature
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="OK" v-close-popup/>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    import { googleMaps } from '../common/google-maps';

    import states from '../common/states';

    export default {
        google: null,
        created() {
        },
        data: () => ({
            showError: false,
            errorMessage: '',
            options: states.map(state => ({ label: state.name, value: state.abbreviation })),
        }),
        computed: {
            ...mapState(['addressLine1', 'addressLine2', 'city', 'state', 'zipCode']),
            fullAddress() {
                let address = this.addressLine1;

                if(this.addressLine2 !== '') {
                    address = `${address} ${this.addressLine2}`;
                }

                address = `${address} ${this.city} ${this.state} ${this.zipCode}`;


                return address;
            }
        },
        methods: {
            ...mapMutations([
                'updateAddressLine1',
                'updateAddressLine2',
                'updateCity',
                'updateState',
                'updateZipCode',
            ]),
            ...mapActions(['register']),
            displayError(message) {
                this.errorMessage = message;
                this.showError = true;
            },
            getLocation() {
                if (!'geolocation' in navigator) {
                    this.displayError('Your device does not support this feature');
                    return;
                }

                this.$q.loading.show({
                    message: 'Getting current location',
                });

                navigator.geolocation.getCurrentPosition(({ coords }) => {
                    this.register({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                    });

                    this.updateAddressLine1('');
                    this.updateAddressLine2('');
                    this.updateCity('');
                    this.updateState('');
                    this.updateZipCode('');

                    this.$q.loading.hide();

                    this.navigate();
                });
            },
            async setAddress() {
                this.$q.loading.show({
                    message: 'Saving address',
                });

                const google = await googleMaps();

                if(google == null) {
                    this.$q.loading.hide();
                    this.displayError('Error saving address');
                    return;
                }

                const geocoder = new google.maps.Geocoder();

                geocoder.geocode({ address: this.fullAddress }, (results, status) => {
                    if(status !== 'OK') {
                        this.$q.loading.hide();
                        this.displayError(`This doesn't look like a valid address`);
                        return;
                    }

                    const coordinates = results[0].geometry.location;

                    this.register({
                        latitude: coordinates.lat(),
                        longitude: coordinates.lng(),
                    });

                    this.$q.loading.hide();

                    this.navigate();
                });
            },
            navigate() {
                this.$router.push('/jobs');
            }
        },
    };
</script>

<style scoped lang="scss">
    .wrapper {
        text-align: center;

        p {
            font-size: 20px;
        }
    }
</style>
