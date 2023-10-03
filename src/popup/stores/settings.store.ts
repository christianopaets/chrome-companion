import {defineStore} from 'pinia';
import type {SettingsState} from '@storage/settings';
import {setLocale} from '../i18n';
import SettingsTable from '@storage/tables/settings.table';

export const useSettingsStore = defineStore(SettingsTable.name, {
    chrome: SettingsTable.type,
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
