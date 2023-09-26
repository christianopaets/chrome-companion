export interface TableOptions<State extends object, K extends keyof State> {
    default: State[K];
    update: State[K] | null;
}

export interface StorageMigration {
    version: number;
    up: (old: any) => unknown;
}

export interface Table {
    name: string;
    type: 'local' | 'sync';
    migrations: StorageMigration[];
}
