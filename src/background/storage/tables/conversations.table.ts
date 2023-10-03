import type {Table} from '../interfaces/table.interface';
import type {ConversationsStateVersions} from '@storage/conversations';

const table: Table = {
    name: 'conversations',
    type: 'sync',
    migrations: [
        {
            version: 1,
            up: (): ConversationsStateVersions.V1 => ({
                limit: 20,
                archived: [],
                conversations: []
            })
        }
    ]
};

export default table;
