import type {ConversationsStateV1} from './conversations-v1.state';

export namespace ConversationsStateVersions {
    export type V1 = ConversationsStateV1;
    export type Latest = ConversationsStateV1;
}

export type {ConversationsStateV1 as ConversationsState};
