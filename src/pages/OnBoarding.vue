<template>
    <address-form v-if="showForm"/>
</template>

<script>
    import { mapState } from 'vuex';

    import AddressForm from './AddressForm';

    export default {
        components: {
            AddressForm,
        },
        data: () => ({
            showForm: false,
        }),
        computed: {
            ...mapState(['coordinates']),
        },
        created() {
            if (this.coordinates.latitude && this.coordinates.longitude) {
                this.$router.push('/jobs');
                return;
            }

            this.showForm = true;
        },
    };
</script>
