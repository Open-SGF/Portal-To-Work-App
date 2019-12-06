<template>
    <q-page class="q-pa-lg text-center" v-if=event>
        <p class="text-h5 text-weight-medium">{{ event.title }}</p>
        <p class="text-subtitle1">{{ }}</p>

        <q-item-section class="calendar q-mx-auto q-my-lg">
            <h5 class="q-ma-none">{{ myGetMonth }}</h5>
            <h4 class="q-ma-none">{{ myGetDay }}</h4>
        </q-item-section>

        <q-list bordered class="rounded-borders text-primary text-left">
            <q-expansion-item
                expand-separator
                label="Event Description"
            >
                <q-card>
                    <q-card-section>
                        <div v-html="event.description"></div>
                    </q-card-section>
                </q-card>
            </q-expansion-item>

            <q-item>
                <q-item-label>Date</q-item-label>
                <q-space/>
                <q-item-label>{{ getFullDate }}</q-item-label>
            </q-item>

            <q-item>
                <q-item-label>Time</q-item-label>
                <q-space/>
                <q-item-label>{{ getFullTime }}</q-item-label>
            </q-item>

            <q-item>
                <q-item-label>Cost</q-item-label>
                <q-space/>
                <q-item-label>${{ event.cost }}</q-item-label>
            </q-item>
        </q-list>

        <google-map v-if="location" :pins="location" class="map"/>

        <q-card flat class="row address-section text-primary">
            <q-card-section class="col">
                <q-btn
                    unelevated
                    rounded
                    class="q-px-xl q-py-sm"
                    size="lg"
                    color="primary"
                    label="Map"
                />
            </q-card-section>
            <q-card-section class="col q-py-none text-left">
                <q-item-label>{{ event.location.street }}</q-item-label>
                <q-item-label caption>{{ event.location.city }}, {{ event.location.state }} {{ event.location.zipcode }}</q-item-label>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
    import { jobsApi } from '../common/http';
    import GoogleMap from "../components/GoogleMap";

    export default {
        components: {
            GoogleMap
        },
        data: () => ({
            event: null,
        }),
        created() {
            this.$q.loading.show({
                message: 'Loading event info',
            });
            const { id } = this.$route.params;

            if (!id) {
                this.$router.push('/404');
                this.$q.loading.hide();
                return;
            }

            jobsApi.get(`/event/${id}`).then(res => {
                this.event = res.data.data;
                this.$q.loading.hide();
            }).catch(() => {
                this.$q.loading.hide();
                this.$router.push('/404');
            });
        },
        computed: {
            getFullDate() {
                let date = new Date(this.event.date_begin);
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let dt = date.getDate();
                if (dt < 10) {
                    dt = '0' + dt;
                }
                if (month < 10) {
                    month = '0' + month;
                }
                return month+'-' + dt + '-'+year;
            },
            myGetDay() {
                let date = new Date(this.event.date_begin);
                let dt = date.getDate();
                if (dt < 10) {
                    dt = '0' + dt;
                }
                return dt;
            },
            myGetMonth() {
                let arr = this.event.date_begin.split("-");
                let months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Octr", "Nov", "Dec" ];
                let month_index =  parseInt(arr[1],10) - 1;
                return months[month_index];
            },
            getFullTime() {
                let date = new Date(this.event.date_begin);
                return date.toString().substring(16,21)
            },
            location() {
                if(this.event == null) return false;

                const { lat, lng } = this.event.location;

                if(!lat && !lng) return false;

                return [{
                    lat: parseFloat(lat),
                    lng: parseFloat(lng),
                }];
            }
        },
    }
</script>

<style scoped lang="scss">
    .calendar {
        border: 1px solid $primary;
        text-align: center;
        height: 90px;
        max-width: 90px;
    }

    .address-section {
        display: flex;
        align-items: center;
    }

    .map {
        height: 200px;
    }
</style>
