import type {RouteRecordRaw} from 'vue-router';
import {createMemoryHistory, createRouter} from 'vue-router';
import {useApiConfigStore} from '../stores/api-config.store';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../pages/Dashboard.vue'),
    },
    {
        path: '/welcome',
        component: () => import('../pages/Welcome.vue')
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

const router = createRouter({
    history: createMemoryHistory(),
    routes
});

router.beforeEach(async to => {
    const apiSettingsStore = useApiConfigStore();
    if (!apiSettingsStore.key && !to.path.includes('welcome')) {
        return '/welcome';
    }
});
export {router};
