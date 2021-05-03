import Vue from 'vue';
import VueRouter from 'vue-router';
import VueAnalytics from 'vue-analytics';

import { createGtm } from "vue-gtm";

import routes from './routes';

Vue.use(VueRouter);

Vue.use(
    createGtm({

        id: "gtm-79851879-5",
        queryParams: {},
        defer: false,
        compatibility: false,
        nonce: "54321",
        enabled: true,
        debug: false,
        loadScript: true,
        vueRouter: VueRouter,
        ignoredViews: ["settings/location"],
        trackOnNextTick: false,
    })
);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
    const router = new VueRouter({
        scrollBehavior: () => ({ x: 0, y: 0 }),
        routes,

        // Leave these as is and change from quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        mode: process.env.VUE_ROUTER_MODE,
        base: process.env.VUE_ROUTER_BASE,
    });

    if (!process.env.DEV) {
        Vue.use(VueAnalytics, {
            id: process.env.GOOGLE_ANALYTICS_ID,
            router,
        });
    }

    return router;
}
