import type {SettingsStateV1} from '@state/settings/settings-v1.state';

export interface SettingsStateV2 extends SettingsStateV1 {
    language: string;
}
