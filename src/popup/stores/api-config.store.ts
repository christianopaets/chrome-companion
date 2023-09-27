import {defineStore} from 'pinia';
import type {ApiConfigState} from '@state/api-config';

export const useApiConfigStore = defineStore('api-config', {
    chrome: 'sync',
    state: (): ApiConfigState => ({
        key: ''
    }),
    actions: {
        async test(key: string): Promise<boolean> {
            const headers = {'Authorization': `Bearer ${key}`};
            const response = await fetch('https://api.openai.com/v1/models', {headers});
            return response.ok;
        },
        save(key: string): void {
            this.$patch({key});
        }
    }
});
