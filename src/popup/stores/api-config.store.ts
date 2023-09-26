import {defineStore} from 'pinia';
import type {ApiConfigState} from '@state/api-config';

export const useApiConfigStore = defineStore('api-config', {
    chrome: 'sync',
    state: (): ApiConfigState => ({
        key: ''
    }),
    actions: {
        save(key: string): void {
            this.$patch({key});
        }
    }
});
