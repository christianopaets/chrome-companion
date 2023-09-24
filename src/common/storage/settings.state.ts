import type {PrimeVueTheme} from '../types/prime-vue-theme.type';
import type {BaseState} from './base.state';

export interface SettingsState extends BaseState {
    theme: PrimeVueTheme;
    scale: number;
    inputStyle: 'filled' | 'outlined';
    ripple: boolean;
}
