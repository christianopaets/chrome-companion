import {Marked} from 'marked';
import highlight from 'highlight.js';
import DOMPurify from 'dompurify';

export class MarkedService {

    static readonly marked = new Marked({
        renderer: {
            code(code: string, infostring: string | undefined): string {
                if (!infostring || !highlight.getLanguage(infostring)) {
                    return `<pre><code class="hljs">${code}</code></pre>`;
                }
                const highlighted = highlight.highlight(code, {language: infostring, ignoreIllegals: true});
                return `<pre><code class="hljs">${highlighted.value}</code></pre>`;
            },
        },
        hooks: {
            preprocess: markdowm => markdowm,
            postprocess(html: string) {
                return DOMPurify.sanitize(html);
            }
        }
    });

    static parse(content: string): string {
        const parsed = this.marked.parse(content);
        if (typeof parsed !== 'string') {
            console.warn('Markdown returned promise!');
            return '';
        }
        return parsed;
    }
}
