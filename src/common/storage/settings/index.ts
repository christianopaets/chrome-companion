import type {SettingsStateV1} from './settings-v1.state';

export namespace SettingsStateVersions {
    export type V1 = SettingsStateV1;
    export type Latest = SettingsStateV1;
}

export type {SettingsStateV1 as SettingsState};
