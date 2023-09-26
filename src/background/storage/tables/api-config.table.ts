import type {Table} from '../interfaces/table.interface';
import type {ApiConfigStateVersions} from '@state/api-config';

const table: Table = {
    name: 'api-config',
    type: 'sync',
    migrations: [
        {
            version: 1,
            up: (): ApiConfigStateVersions.V1 => ({
                key: ''
            }),
        }
    ]
};

export default table;
