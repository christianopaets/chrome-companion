import type {Table} from '../interfaces/table.interface';
import type {ApiConfigState} from '../../../common/storage/api-config.state';

const table: Table<ApiConfigState> = {
    version: 1,
    name: 'api-config',
    type: 'sync',
    fields: {
        key: {
            default: '',
            update: ''
        }
    }
};

export default table;
