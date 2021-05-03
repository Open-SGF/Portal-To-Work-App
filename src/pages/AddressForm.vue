<template>
    <q-page class="q-pt-md desktop-friendly text-center">
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
        <q-form
            class="q-px-md q-pb-lg q-gutter-md"
            @submit="setAddress"
            >
            <q-input
                outlined
                :value="addressLine1"
                @input="updateAddressLine1"
                label="Street Address"
                :rules="[val => !!val || 'Field is required']"
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
                :rules="[val => !!val || 'Field is required']"
            />
            <q-select
                outlined
                :value="state"
                @input="updateState"
                label="State"
                :options="options"
                emit-value
                map-options
                :rules="[val => !!val || 'Field is required']"
            />
            <q-input
                outlined
                :value="zipCode"
                @input="updateZipCode"
                label="Postal Code"
                :rules="[val => !!val || 'Field is required']"
            />
            <q-btn
                class="q-px-xl q-py-sm q-mb-md"
                size="lg"
                unelevated
                rounded
                type="submit"
                color="primary"
                label="Use This Address"
            />
        </q-form>
        <q-dialog v-model="showError" >
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
    </q-page>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    import { getGoogleMaps } from '../common/google-maps';

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
                'updateCoordinates'
            ]),
            ...mapActions(['registerDevice']),
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
                    this.registerLocation({
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

                // TODO: use trycatch?
                const google = await getGoogleMaps();

                if(google == null) {
                    this.$q.loading.hide();
                    this.displayError('Error saving address');
                    return;
                }

                const geocoder = new google.maps.Geocoder();

                console.log(this.fullAddress);

                geocoder.geocode({ address: this.fullAddress }, (results, status) => {
                    if(status !== google.maps.GeocoderStatus.OK) {
                        this.$q.loading.hide();
                        this.displayError(`This doesn't look like a valid address`);
                        return;
                    }

                    const coordinates = results[0].geometry.location;

                    this.registerLocation({
                        latitude: coordinates.lat(),
                        longitude: coordinates.lng(),
                    });

                    this.$q.loading.hide();

                    this.navigate();
                });
            },
            registerLocation(coordinates) {
                this.updateCoordinates(coordinates);
                this.registerDevice();
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
