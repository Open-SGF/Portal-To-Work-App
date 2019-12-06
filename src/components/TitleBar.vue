<template>
    <div class="row q-pt-md">
        <div>
            <q-icon
                v-if="back != null"
                class="q-ml-md col-2"
                color="white"
                size="md"
                name="arrow_back"
                @click="goBack"
            />
        </div>
        <div class="col text-center">
            <p class="text-h6 text-uppercase text-weight-medium text-white">{{ title }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TitleBarBackButton.vue",
        props: ['title', 'back'],
        methods: {
            goBack() {
                this.$router.push(this.back);
            }
        }
    }
</script>

<style scoped>

</style>
