import {defineStore} from 'pinia';
import type {ApiConfigState} from '../../common/storage/api-config.state';

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

export type ApiSettingsStoreType = ReturnType<typeof useApiConfigStore>;
