export interface TableOptions<State extends object, K extends keyof State> {
    default: State[K];
    update: State[K] | null;
}

export interface Table<State extends object> {
    version: number;
    name: string;
    type: 'local' | 'sync';
    fields: {
        [K in keyof State]: TableOptions<State, K>;
    };
}
