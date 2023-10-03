export namespace ConversationDetailsVersions {
    export interface V1 {
        id: string;
        started: number;
        last: number;
        name: string;
        eof: number;
    }

    export type Latest = V1;
}

export type ConversationDetails = ConversationDetailsVersions.Latest;
