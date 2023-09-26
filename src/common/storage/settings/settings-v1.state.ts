import type {PrimeVueTheme} from '../../types/prime-vue-theme.type';

export interface SettingsStateV1 {
    theme: PrimeVueTheme;
    scale: number;
    inputStyle: 'filled' | 'outlined';
    ripple: boolean;
}
