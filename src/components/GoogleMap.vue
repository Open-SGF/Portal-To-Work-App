<template>
    <div id="map" ref="map">
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { getGoogleMaps } from '../common/google-maps';

    import * as defaultIcon from '../assets/circle.png';
    import * as userIcon from '../assets/home.png';
    import googleMapsStyle from '../common/google-map-style';

    export default {
        name: 'GoogleMap',
        google: null,
        map: null,
        icon: null,
        markers: [],
        userMarker: null,
        userIcon: null,
        computed: {
            ...mapState(['coordinates']),
        },
        props: {
            pins: {
                type: Array,
                default: () => ([]),
            },
        },
        async mounted() {
            try {
                this.$options.google = await getGoogleMaps();
                this.initMap();
            } catch (e) {}
        },
        methods: {
            initMap() {
                const { google } = this.$options;

                this.$options.map = new google.maps.Map(this.$refs.map, {
                    center: { lat: -34.397, lng: 50.644 },
                    zoom: 10,
                    disableDefaultUI: true,
                    styles: googleMapsStyle,
                });

                this.$options.icon = {
                    url: defaultIcon,
                    size: new google.maps.Size(30, 30),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(0, 0),
                };

                this.$options.userIcon = {
                    url: userIcon,
                    size: new google.maps.Size(30, 30),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(0, 0),
                };

                this.drawPins();
            },
            drawPins() {
                const { google, map } = this.$options;

                this.$options.markers.forEach(marker => {
                    marker.setMap(null);
                    marker = null;
                });

                if (this.$options.userMarker) {
                    this.$options.userMarker.setMap(null);
                    this.$options.userMarker = null;
                }

                const bounds = new google.maps.LatLngBounds();


                this.$options.markers = this.pins.map(pin => {
                    const marker = new google.maps.Marker({
                        position: {
                            lat: pin.lat,
                            lng: pin.lng,
                        },
                        icon: this.$options.icon,
                        label: {
                            text: pin.label ? `${pin.label}` : ' ',
                            color: 'white',
                            fontWeight: 'bold',
                        },
                        map,
                    });

                    if(pin.value) {
                        marker.addListener('click', () => {
                            this.$emit('select', pin.value);
                        });
                    }

                    bounds.extend(marker.getPosition());

                    return marker;
                });

                this.$options.userMarker = new google.maps.Marker({
                    position: {
                        lat: this.coordinates.latitude,
                        lng: this.coordinates.longitude,
                    },
                    icon: this.$options.userIcon,
                    map,
                });

                bounds.extend(this.$options.userMarker.getPosition());

                map.setCenter(bounds.getCenter());
                map.fitBounds(bounds);

                google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
                    map.setZoom(map.getZoom() - .5);
                });
            },
        },
        watch: {
            pins() {
                // this.drawPins();
            },
            coordinates() {
                // this.drawPins();
            }
        },
    };
</script>

<style scoped lang="scss">
    #map {
        width: 100%
    }
</style>
