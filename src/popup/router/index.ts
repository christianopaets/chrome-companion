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
                component: () => import('../pages/settings/SettingsTheming.vue'),
                meta: {
                    id: 'settings',
                    priority: 0
                }
            },
            {
                path: 'api',
                component: () => import('../pages/settings/SettingsAPI.vue'),
                meta: {
                    id: 'settings',
                    priority: 1
                }
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

router.afterEach((to, from) => {
    if (to.meta.id && from.meta.id && to.meta.id === from.meta.id
        && typeof to.meta.priority === 'number' && typeof from.meta.priority === 'number') {
        to.meta.direction = to.meta.priority > from.meta.priority ? 'left' : 'right';
    }
});
export {router};
