import type {SettingsStateV1} from '@storage/settings/settings-v1.state';

export interface SettingsStateV2 extends SettingsStateV1 {
    language: string;
}
