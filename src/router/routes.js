const routes = [
    {
        path: '',
        component: () => import('layouts/SimpleLayout.vue'),
        children: [
            {
                path: '/',
                component: () => import('pages/AddressForm.vue'),
                meta: {
                    title: "Settings"
                }
            }
        ]
    },
    {
        path: '/app',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: 'jobs',
                component: () => import('pages/JobListing.vue'),
                meta: {
                    title: 'Jobs near you',
                },
            },
            {
                path: 'jobs/filter',
                component: () => import('pages/JobsFilter.vue'),
                meta: {
                    title: "Job Search Settings",
                    back: "/app/jobs"
                }
            },
            {
                path: 'jobs/:id',
                component: () => import('pages/JobDetail.vue'),
                meta: {
                    title: "Job Details",
                    back: "/app/jobs"
                }
            },
            {
                path: 'notifications',
                component: () => import('pages/Notifications.vue'),
                meta: {
                    title: "Notifications"
                }
            },
            {
                path: 'saved-jobs',
                component: () => import('pages/SavedJobs.vue'),
                meta: {
                    title: "Favorite Jobs"
                }
            },
            {
                path: 'events',
                component: () => import('pages/Events.vue'),
                meta: {
                    title: "Events"
                }
            },
            {
                path: 'events/:id',
                component: () => import('pages/EventDetail.vue'),
                meta: {
                    title: "Event Details",
                    back: "/app/events"
                }
            },
            // {
            //     path: 'settings',
            //     component: () => import('pages/Settings.vue'),
            //     meta: {
            //         title: "Settings"
            //     }
            // },
            {
                path: 'settings/location',
                component: () => import('pages/AddressForm.vue'),
                meta: {
                    title: "Settings",
                }
            },
        ],
    },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () => import('pages/Error404.vue'),
    });
}

export default routes;
