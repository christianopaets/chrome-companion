import type {ApiConfigStateV1} from './api-config-v1.state';

export namespace ApiConfigStateVersions {
    export type V1 = ApiConfigStateV1;
    export type Latest = ApiConfigStateV1;
}

export type {ApiConfigStateV1 as ApiConfigState};
