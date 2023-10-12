import type {ConversationVersions} from '@interfaces/conversation/conversation.interface';

export interface ConversationStateV3 {
    conversations: {
        [key: string]: ConversationVersions.V3;
    };
}
