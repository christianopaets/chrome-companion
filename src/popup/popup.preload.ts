import type {SettingsState} from '../common/storage/settings.state';

const preload = document.getElementById('preload') as HTMLDivElement;
let bgColor = 'var(--surface-ground)';
const settingsStateString = localStorage.getItem('settings');

if (settingsStateString) {
    const settingsState = JSON.parse(settingsStateString) as SettingsState;
    if (settingsState.theme) {
        const color = settingsState.theme.includes('dark') ? '#1d1e27' : '#eff3f8';
        bgColor = `var(--surface-ground, ${color})`;
    }
}
preload.style.backgroundColor = bgColor;
document.addEventListener('app-mounted', () => {
    setTimeout(() => {
        preload.style.opacity = '0';
        setTimeout(() => {
            preload.remove();
        }, 150);
    }, 150);
});
