const routes = [
    {
        path: '',
        component: () => import('../layouts/SimpleLayout.vue'),
        children: [
            {
                path: '/',
                component: () => import('../pages/OnBoarding.vue'),
            },
        ],
    },
    {
        path: '',
        component: () => import('../layouts/MainLayout.vue'),
        children: [
            {
                path: 'jobs',
                component: () => import('../pages/JobListing.vue'),
                meta: {
                    title: 'Jobs near you',
                    requiresLocation: true,
                },
            },
            {
                path: 'jobs/filter',
                component: () => import('../pages/JobsFilter.vue'),
                meta: {
                    title: 'Job Search Settings',
                    back: '/jobs',
                    requiresLocation: true,
                },
            },
            {
                path: 'jobs/:id',
                component: () => import('../pages/JobDetail.vue'),
                meta: {
                    title: 'Job Details',
                    back: '/jobs',
                    requiresLocation: true,
                },
            },
            {
                path: 'notifications',
                component: () => import('../pages/Notifications.vue'),
                meta: {
                    title: 'Notifications',
                    requiresLocation: true,
                },
            },
            {
                path: 'saved-jobs',
                component: () => import('../pages/SavedJobs.vue'),
                meta: {
                    title: 'Favorite Jobs',
                    requiresLocation: true,
                },
            },
            {
                path: 'events',
                component: () => import('../pages/Events.vue'),
                meta: {
                    title: 'Events',
                    requiresLocation: true,
                },
            },
            {
                path: 'events/:id',
                component: () => import('../pages/EventDetail.vue'),
                meta: {
                    title: 'Event Details',
                    back: '/events',
                    requiresLocation: true,
                },
            },
            // {
            //     path: 'settings',
            //     component: () => import('../pages/Settings.vue'),
            //     meta: {
            //         title: "Settings"
            //     }
            // },
            {
                path: 'settings/location',
                component: () => import('../pages/AddressForm.vue'),
                meta: {
                    title: 'Settings',
                },
            },
        ],
    },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () => import('../pages/Error404.vue'),
    });
}

export default routes;
