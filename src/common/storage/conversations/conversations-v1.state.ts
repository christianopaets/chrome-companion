import type {ConversationDetailsVersions} from '@interfaces/conversation/conversation-details.interface';

export interface ConversationsStateV1 {
    conversations: ConversationDetailsVersions.V1[];
    archived: ConversationDetailsVersions.V1[];
    limit: number;
}
