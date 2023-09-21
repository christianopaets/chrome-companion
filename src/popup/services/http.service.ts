import {useApiConfigStore} from '../stores/api-config.store';

export class HttpService {

    static readonly INJECTOR = Symbol('HttpClient');

    constructor() {
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
}
