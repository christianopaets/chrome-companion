import type {RollupOptions} from 'rollup';
import typescript from '@rollup/plugin-typescript';

const rollupBackgroundConfig: RollupOptions = {
    input: './src/background/service-worker.ts',
    output: {
        dir: './extension/background',
    },
    plugins: [
        typescript({
            tsconfig: './tsconfig.json'
        })
    ]
};

export default rollupBackgroundConfig;
