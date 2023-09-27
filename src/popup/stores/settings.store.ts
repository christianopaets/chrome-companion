import {defineStore} from 'pinia';
import type {SettingsState} from '@state/settings';
import {setLocale} from '../i18n';

export const useSettingsStore = defineStore('settings', {
    chrome: 'sync',
    state: (): SettingsState => ({
        theme: 'soho-light',
        inputStyle: 'outlined',
        ripple: true,
        scale: 14,
        language: 'en'
    }),
    actions: {
        save(state: Partial<SettingsState>): void {
            this.$patch(state);
        },
        setLocale(locale: string): void {
            locale = setLocale(locale);
            this.language = locale;
        }
    }
});
