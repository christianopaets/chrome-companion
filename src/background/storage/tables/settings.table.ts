import type {Table} from '../interfaces/table.interface';
import type {SettingsStateVersions} from '@state/settings';

const table: Table = {
    name: 'settings',
    type: 'sync',
    migrations: [
        {
            version: 1,
            up: (): SettingsStateVersions.V1 => ({
                theme: 'soho-light',
                scale: 14,
                ripple: true,
                inputStyle: 'outlined'
            })
        },
        {
            version: 2,
            up: (old: SettingsStateVersions.V1): SettingsStateVersions.V2 => ({
                ...old,
                language: chrome.i18n.getUILanguage()
            })
        }
    ]
};

export default table;
