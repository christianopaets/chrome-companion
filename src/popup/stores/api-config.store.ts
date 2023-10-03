import {defineStore} from 'pinia';
import type {ApiConfigState} from '@storage/api-config';
import ApiConfigTable from '@storage/tables/api-config.table';

export const useApiConfigStore = defineStore(ApiConfigTable.name, {
    chrome: ApiConfigTable.type,
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
