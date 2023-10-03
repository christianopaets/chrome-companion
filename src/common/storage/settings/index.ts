import type {SettingsStateV1} from './settings-v1.state';
import type {SettingsStateV2} from '@storage/settings/settings-v2.state';

export namespace SettingsStateVersions {
    export type V1 = SettingsStateV1;
    export type V2 = SettingsStateV2;
    export type Latest = SettingsStateV2;
}

export type SettingsState = SettingsStateVersions.Latest;
