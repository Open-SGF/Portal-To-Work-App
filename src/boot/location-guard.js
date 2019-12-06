import store from '../store';

export default ({ router, store }) => {
    router.beforeEach((to, from, next) => {

        if (!to.meta.requiresLocation) {
            next();
            return;
        }

        if (!store.state.coordinates.longitude || !store.state.coordinates.latitude) {
            next('/');
            return;
        }

        next();

    });
}
