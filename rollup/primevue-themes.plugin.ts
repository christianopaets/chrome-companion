import type {Plugin} from 'rollup';
import type {PrimeVueTheme} from '../src/common/types/prime-vue-theme.type';
import postcss from 'postcss';
import cssnano from 'cssnano';

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
            const cssFile = Bun.file(`${fulldir}/theme.css`);
            if (!await cssFile.exists()) {
                continue;
            }
            const cssCode = await cssFile.text();
            const parsedCss = await postcss([cssnano({preset: 'default'})])
                .process(cssCode, {from: `${fulldir}/theme.css`, to: `${fulldir}/theme.css`});
            await Bun.write(cssFile, parsedCss.css);
        }
    }
});
