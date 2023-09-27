import {createI18n} from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';
import datetimeFormats from './datetime.formats';

export const ACCEPTED_LANGUAGES = ['en'];

export const i18n = createI18n({
    legacy: false,
    fallbackLocale: 'en',
    messages,
    datetimeFormats: datetimeFormats
});

export function setLocale(locale: string): string {
    if (locale.match(/[a-z]{2}-[A-Z]{2}/)) {
        locale = locale.substring(0, 2);
    }
    if (!ACCEPTED_LANGUAGES.includes(locale)) {
        console.warn(`Fallback to default locale, because ${locale} is not available`);
        locale = 'en';
    }
    i18n.global.locale.value = locale;
    document.querySelector('html')!.setAttribute('lang', locale);
    return locale;
}
