import type {PrimeVueTheme} from '../../common/types/prime-vue-theme.type';
import {capitalize} from '../../common/utils/capitalize';
import type {SettingsStateV1} from '@state/settings/settings-v1.state';

export class ThemeService {

    static readonly INJECTOR = Symbol('ThemeService');

    private readonly _themeLinkId: string = 'primevue-theme';

    private readonly _themes: PrimeVueTheme[] = ['soho-light', 'soho-dark', 'lara-light-teal', 'lara-dark-teal'];

    private readonly _inputStyles = [
        {label: 'Outlined', value: 'outlined'},
        {label: 'Filled', value: 'filled'}
    ];

    private _initialized: boolean = false;

    private _currentTheme: PrimeVueTheme | undefined;

    get inputStyles() {
        return this._inputStyles;
    }

    get selectThemes() {
        return this._themes.map(theme => ({
            label: theme.split('-').map(word => capitalize(word)).join(' '),
            value: theme
        }));
    }

    private get _href(): string {
        return `./themes/${this._currentTheme}/theme.css`;
    }

    init({theme, scale, inputStyle, ripple}: SettingsStateV1): void {
        if (this._initialized) {
            console.warn('Theme is already initialized. Skipped this part!');
            return;
        }
        this._currentTheme = theme;
        this._initTheme();
        this.changeScale(scale);
        this.changeInputStyle(inputStyle);
        this.changeRipple(ripple);
        this._initialized = true;
    }

    changeTheme(theme: PrimeVueTheme): void {
        if (!this._initialized) {
            console.warn('Theme is not initialized');
            return;
        }
        if (!this._themes.some(item => item === theme)) {
            console.warn('Theme not existing!');
            return;
        }
        this._currentTheme = theme;
        const link = document.getElementById(this._themeLinkId) as HTMLLinkElement;
        link.href = this._href;
    }

    changeScale(scale: number): void {
        const html = window.document.getElementsByTagName('html');
        if (!html.length) {
            return;
        }
        html.item(0)!.style.fontSize = `${scale}px`;
    }

    changeInputStyle(style: 'filled' | 'outlined'): void {
        if (style === 'filled') {
            document.body.classList.add('p-input-filled');
            return;
        }
        document.body.classList.remove('p-input-filled');
    }

    changeRipple(ripple: boolean): void {
        if (ripple) {
            document.body.classList.remove('p-ripple-disabled');
            return;
        }
        document.body.classList.add('p-ripple-disabled');
    }

    private _initTheme(): void {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.id = this._themeLinkId;
        link.href = this._href;
        document.head.append(link);
    }
}
