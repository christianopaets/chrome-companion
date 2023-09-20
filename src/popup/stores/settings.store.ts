import {defineStore} from 'pinia';
import type {SettingsState} from '../../common/storage/settings.state';

export const useSettingsStore = defineStore('settings', {
    chrome: 'sync',
    state: (): SettingsState => ({
        version: 1,
        theme: 'soho-light',
        inputStyle: 'outlined',
        ripple: true,
        scale: 14
    }),
    actions: {
        save(state: Partial<SettingsState>): void {
            this.$patch(state);
        }
    }
});
