import {defineStore} from 'pinia';
import type {SettingsState} from '../../common/storage/settings';

export const useSettingsStore = defineStore('settings', {
    chrome: 'sync',
    state: (): SettingsState => ({
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
