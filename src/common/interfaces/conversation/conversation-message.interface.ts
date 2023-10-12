import type {OpenAI} from 'openai';

export namespace ConversationMessageVersions {
    export interface V1 {
        id: string;
        role: OpenAI.Chat.ChatCompletionRole;
        content: string;
        pending?: boolean;
    }

    export interface V2 {
        id: string;
        role: OpenAI.Chat.ChatCompletionRole;
        content: string;
        failed: boolean;
        pending?: boolean;
    }

    export type Latest = V2;
}

export type ConversationMessage = ConversationMessageVersions.Latest;
