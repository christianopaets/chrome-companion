import type {SettingsState} from '@storage/settings';

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
document.addEventListener('app-mounted', async () => {
    await wait(250);
    preload.classList.add('transition-all', 'transition-duration-150', 'animation-ease-in-out');
    preload.style.opacity = '0';
    await wait(150);
    preload.remove();
});

function wait(time: number): Promise<void> {
    return new Promise(resolve => setTimeout(() => resolve(), time));
}
