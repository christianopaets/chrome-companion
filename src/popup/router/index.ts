import type {RouteRecordRaw} from 'vue-router';
import {createMemoryHistory, createRouter} from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../pages/Dashboard.vue')
    },
    {
        path: '/settings',
        component: () => import('../pages/settings/Settings.vue'),
        children: [
            {
                path: 'theming',
                component: () => import('../pages/settings/SettingsTheming.vue')
            },
            {
                path: 'api',
                component: () => import('../pages/settings/SettingsAPI.vue')
            }
        ]
    }
];

export default createRouter({
    history: createMemoryHistory(),
    routes
});
