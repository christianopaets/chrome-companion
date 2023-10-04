import {useApiConfigStore} from '@store/api-config.store';
import type {OpenAI} from 'openai';
import {fetchEventSource} from '@microsoft/fetch-event-source';

export class ChatOpenError extends Error {
    constructor(readonly response: Response, message: string) {
        super(message);
    }
}

export class HttpService {

    static readonly INJECTOR = Symbol('HttpClient');

    private static _instance: HttpService | undefined;

    static get instance(): HttpService {
        if (!this._instance) {
            this._instance = new HttpService();
        }
        return this._instance;
    }

    private readonly _errorHandlers: Map<Symbol, (e: Error) => void> = new Map([]);

    private constructor() {
    }

    async get(url: string, options: FetchRequestInit = {}): Promise<Response> {
        const apiConfigStore = useApiConfigStore();
        if (apiConfigStore.key) {
            options = {
                ...options,
                headers: {
                    'Authorization': `Bearer ${apiConfigStore.key}`,
                    ...options?.headers,
                }
            };
        }
        return await fetch(url, options);
    }

    async chat(
        messages: OpenAI.Chat.ChatCompletionMessageParam[],
        onmessage: (response: OpenAI.Chat.ChatCompletionChunk) => void,
        onerror: (error: Error) => void = () => {
        }
    ): Promise<void> {
        await fetchEventSource('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: this._getChatHeaders(),
            body: this._prepareChatBody(messages),
            async onopen(response) {
                if (response.ok) {
                    return;
                }
                throw new ChatOpenError(response, response.statusText);
            },
            onmessage: message => {
                if (message.event === 'FatalError') {
                    console.log(message, 'fatal');
                    throw new Error(message.data);
                }
                if (!message.data) {
                    console.log(message, 'no data');
                    throw new Error(message.data);
                }
                if (message.data === '[DONE]') {
                    return;
                }
                try {
                    const data = JSON.parse(message.data) as OpenAI.Chat.ChatCompletionChunk;
                    onmessage(data);
                } catch (e) {
                    if (e instanceof Error) {
                        throw e;
                    }
                }
            },
            onerror: (err: Error) => {
                onerror(err);
                this._errorHandlers.forEach(callback => callback(err));
                throw err;
            },
        });
    }

    addErrorListener(callback: (e: Error) => void): Symbol {
        const id = Symbol();
        this._errorHandlers.set(id, callback);
        return id;
    }

    removeErrorListener(id: Symbol): void {
        if (!this._errorHandlers.has(id)) {
            return;
        }
        this._errorHandlers.delete(id);
    }

    private _getChatHeaders(): Record<string, string> {
        const apiConfigStore = useApiConfigStore();
        return {
            'Authorization': `Bearer ${apiConfigStore.key}`,
            'Content-Type': 'application/json',
        };
    }

    private _prepareChatBody(messages: OpenAI.Chat.ChatCompletionMessageParam[]): string {
        const params: OpenAI.Chat.ChatCompletionCreateParams = {
            messages,
            model: 'gpt-3.5-turbo',
            stream: true
        };
        return JSON.stringify(params);
    }
}
