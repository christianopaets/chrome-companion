import type {ConversationMessageVersions} from '@interfaces/conversation/conversation-message.interface';

export namespace ConversationVersions {
    export interface V1 {
        messages: ConversationMessageVersions.V1[];
    }

    export interface V2 {
        messages: ConversationMessageVersions.V2[];
    }

    export interface V3 {
        messages: ConversationMessageVersions.V2[];
        loading: boolean;
    }

    export type Latest = V3;
}

export type Conversation = ConversationVersions.Latest;
