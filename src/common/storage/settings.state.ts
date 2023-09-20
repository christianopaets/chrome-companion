import type {PrimeVueTheme} from '../types/prime-vue-theme.type';

export interface SettingsState {
    version: number;
    theme: PrimeVueTheme;
    scale: number;
    inputStyle: 'filled' | 'outlined';
    ripple: boolean;
}
