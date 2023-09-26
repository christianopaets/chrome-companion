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
        }
    ]
};

export default table;
