import type {RollupOptions} from 'rollup';
import json from '@rollup/plugin-json';
import manifestPlugin from './rollup/manifest.plugin';

const config: RollupOptions = {
    input: './manifest.json',
    output: {
        dir: './extension'
    },
    plugins: [
        json(),
        {
            name: 'delete',
            generateBundle(_, bundle) {
                Object.keys(bundle).forEach(key => delete bundle[key]);
            },
        },
        manifestPlugin()
    ]
};

export default config;
