import type {Table} from '../interfaces/table.interface';
import type {SettingsState} from '../../../common/storage/settings.state';

const table: Table<SettingsState> = {
    version: 1,
    name: 'settings',
    type: 'sync',
    fields: {
        version: {
            default: 1,
            update: null
        },
        theme: {
            default: 'soho-light',
            update: null
        },
        scale: {
            default: 14,
            update: null
        },
        ripple: {
            default: true,
            update: null
        },
        inputStyle: {
            default: 'outlined',
            update: null
        }
    }
};

export default table;
