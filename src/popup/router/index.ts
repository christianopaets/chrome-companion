import type {RouteRecordRaw} from 'vue-router';
import {createMemoryHistory, createRouter} from 'vue-router';
import {useApiConfigStore} from '@store/api-config.store';
import {useConversationsStore} from '@store/conversations.store';

export enum TRoutes {
    Conversations = 'conversations',
    Conversation = 'conversation'
}

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/conversations'
    },
    {
        name: TRoutes.Conversations,
        path: '/conversations',
        component: () => import('../pages/Conversations.vue')
    },
    {
        name: TRoutes.Conversation,
        path: '/conversations/:id',
        props: true,
        component: () => import('../pages/Conversation.vue'),
        beforeEnter: to => {
            const {conversations, archived} = useConversationsStore();
            if ('archive' in to.query) {
                return archived.some(item => item.id === to.params?.id);
            }
            return conversations.some(item => item.id === to.params?.id);
        }
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
                meta: {id: 'settings', priority: 0}
            },
            {
                path: 'api',
                component: () => import('../pages/settings/SettingsAPI.vue'),
                meta: {id: 'settings', priority: 1}
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
