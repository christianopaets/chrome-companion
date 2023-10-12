import type {ConversationStateV1} from '@storage/conversation/conversation-v1.state';
import type {ConversationStateV2} from '@storage/conversation/conversation-v2.state';
import type {ConversationStateV3} from '@storage/conversation/conversation-v3.state';

export namespace ConversationStateVersions {
    export type V1 = ConversationStateV1;
    export type V2 = ConversationStateV2;
    export type V3 = ConversationStateV3;
    export type Latest = V3;
}

export type ConversationState = ConversationStateVersions.Latest;
