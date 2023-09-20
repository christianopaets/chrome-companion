import type {Plugin} from 'rollup';

export default (): Plugin => {
    return {
        name: 'manifest',
        closeBundle() {
            const manifest = Bun.file('./manifest.json');
            Bun.write('./extension/manifest.json', manifest);
        }
    };
};
