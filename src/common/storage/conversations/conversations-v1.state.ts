import type {Conversation} from '../../interfaces/conversation.interface';

export interface ConversationsStateV1 {
    conversations: Conversation[];
    archived: Conversation[];
    limit: number;
}
