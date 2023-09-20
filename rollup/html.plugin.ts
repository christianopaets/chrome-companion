import type {MaybePromise, OutputBundle, OutputChunk, Plugin} from 'rollup';

interface PluginOptions {
    template: string;
    destination: string;
    filename: string;
}

export default ({template, destination, filename}: PluginOptions): MaybePromise<Plugin> => {
    return {
        name: 'html',
        async generateBundle(_, bundle: OutputBundle) {
            const {mkdirSync, existsSync} = await import('fs');
            let file = await Bun.file(template).text();
            const entryFiles = Object.keys(bundle)
                .filter(key => bundle[key]?.hasOwnProperty('isEntry') && (bundle[key] as OutputChunk).isEntry)
                .map(filename => `<script type="module" src="./${filename}"></script>`);
            file = file.replace('</html>', [...entryFiles, '</html>'].join('\n'));
            const cssFiles = Object.keys(bundle)
                .filter(key => bundle[key]?.fileName.includes('.css'))
                .map(filename => `<link rel="stylesheet" href="./${filename}">`);
            file = file.replace('</head>', [...cssFiles, '</head>'].join('\n'));
            if (!existsSync(destination)) {
                mkdirSync(destination, {recursive: true});
            }
            await Bun.write(`${destination}/${filename}`, file);
        }
    };
}
