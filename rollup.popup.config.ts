import type {RollupOptions} from 'rollup';
import vuePlugin from '@vitejs/plugin-vue';
import styles from 'rollup-plugin-styles';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import htmlPlugin from './rollup/html.plugin';
import primevueThemesPlugin from './rollup/primevue-themes.plugin';
import replace from '@rollup/plugin-replace';
import purgeCSSPlugin from '@fullhuman/postcss-purgecss';
import typescript from '@rollup/plugin-typescript';

const prod = process.env.BUILD === 'production';

const config: RollupOptions = {
    input: ['./src/popup/popup.preload.ts', './src/popup/popup.ts'],
    output: {
        dir: './extension/popup',
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: '[name].js',
        manualChunks: (id) => {
            if (id.includes('/vue/') || id.includes('/@vue/')) {
                return 'vue';
            }
            if (id.includes('/primevue/')) {
                return 'primevue';
            }
            if (id.includes('node_modules')) {
                return 'vendor';
            }
        }
    },
    plugins: [
        vuePlugin({isProduction: prod}),
        typescript(),
        styles({
            mode: 'extract',
            minimize: prod,
            plugins: prod ? [
                purgeCSSPlugin({
                    content: [`./src/**/*.html`, `./src/**/*.vue`],
                    keyframes: true,
                    defaultExtractor(content) {
                        const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
                        return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
                    },
                    safelist: [
                        /-(leave|enter|appear)(|-(to|from|active))$/,
                        /^(?!(|.*?:)cursor-move).+-move$/,
                        /^router-link(|-exact)-active$/,
                        /data-v-.*/,
                        /pi-.*/
                    ],
                }) as any // bad
            ] : []
        }),
        resolve({moduleDirectories: ['node_modules']}),
        commonjs(),
        esbuild({
            exclude: [],
            minify: prod,
            sourceMap: !prod,
            loaders: {
                '.vue': 'ts',
            }
        }),
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify(process.env.BUILD || 'development'),
            '__VUE_OPTIONS_API__': JSON.stringify(true),
            '__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
        }),
        htmlPlugin({
            template: './src/popup/popup.html',
            destination: './extension/popup',
            filename: 'popup.html'
        }),
        primevueThemesPlugin({
            themes: ['soho-light', 'soho-dark', 'lara-light-teal', 'lara-dark-teal'],
            output: './extension/popup/themes'
        })
    ]
};

export default config;
