import type {Plugin} from 'rollup';
import type {PrimeVueTheme} from '../src/common/types/prime-vue-theme.type';

interface PluginOptions {
    themes: PrimeVueTheme[];
    output: string;
}

export default ({themes, output}: PluginOptions): Plugin => ({
    name: 'primevue-themes',
    async closeBundle() {
        const {cpSync, existsSync, mkdirSync} = await import('fs');
        for (let theme of themes) {
            if (!existsSync(`./node_modules/primevue/resources/themes/${theme}`)) {
                continue;
            }
            const fulldir = `${output}/${theme}`;
            if (!existsSync(fulldir)) {
                mkdirSync(fulldir, {recursive: true});
            }
            cpSync(`./node_modules/primevue/resources/themes/${theme}`, fulldir, {recursive: true});
        }
    }
});
