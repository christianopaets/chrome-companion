import type {PrimeVueTheme} from '../../common/types/prime-vue-theme.type';

export class ThemeService {

    static readonly INJECTOR = Symbol('ThemeService');

    private readonly _id: string = 'primevue-theme';

    private readonly _themes: PrimeVueTheme[] = ['soho-light', 'soho-dark', 'lara-light-teal', 'lara-dark-teal'];

    private _initialized: boolean = false;

    private _currentTheme: typeof this._themes[number] = this._themes[0]!;

    private get _href(): string {
        return `./themes/${this._currentTheme}/theme.css`;
    }

    get themes(): PrimeVueTheme[] {
        return this._themes;
    }

    init(): void {
        if (this._initialized) {
            console.warn('Theme is already initialized. Skipped this part!');
            return;
        }
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.id = this._id;
        link.href = this._href;
        document.head.append(link);
        this._initialized = true;
    }

    changeTheme(theme: PrimeVueTheme): void {
        if (!this._initialized) {
            console.warn('Theme is not initialized');
            return;
        }
        this._currentTheme = theme;
        const link = document.getElementById(this._id) as HTMLLinkElement;
        link.href = this._href;
    }
}
