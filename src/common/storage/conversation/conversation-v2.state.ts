import type {ConversationVersions} from '@interfaces/conversation/conversation.interface';

export interface ConversationStateV2 {
    conversations: {
        [key: string]: ConversationVersions.V2;
    };
}
