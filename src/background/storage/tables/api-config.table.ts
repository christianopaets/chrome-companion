import type {Table} from '../interfaces/table.interface';
import type {ApiConfigState} from '../../../common/storage/api-config.state';

const table: Table<ApiConfigState> = {
    version: 1,
    name: 'api-config',
    type: 'sync',
    fields: {
        version: {
            default: 1,
            update: 1
        },
        key: {
            default: '',
            update: ''
        }
    }
};

export default table;
