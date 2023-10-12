import type {Table} from '@storage/interfaces/table.interface';
import type {ConversationStateVersions} from '@storage/conversation';
import {mapValues} from '@utils/map-values';

const table: Table = {
    name: 'conversation',
    type: 'local',
    migrations: [
        {
            version: 1,
            up: (): ConversationStateVersions.V1 => ({
                conversations: {}
            })
        },
        {
            version: 2,
            up: (old: ConversationStateVersions.V1): ConversationStateVersions.V2 => ({
                conversations: mapValues(old.conversations, value => ({
                    messages: value.messages.map(message => ({
                        ...message,
                        failed: false
                    }))
                }))
            })
        },
        {
            version: 3,
            up: (old: ConversationStateVersions.V2): ConversationStateVersions.V3 => ({
                conversations: mapValues(old.conversations, value => ({
                    ...value,
                    loading: false
                }))
            })
        }
    ]
};

export default table;
