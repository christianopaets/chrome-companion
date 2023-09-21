import type {StateTree} from 'pinia';

export class ChromeStoragePreload {
    private static _local: StateTree;
    private static _sync: StateTree;

    static get local(): StateTree {
        return this._local;
    }

    static get sync(): StateTree {
        return this._sync;
    }

    static async preload(): Promise<void> {
        this._local = await chrome.storage.local.get();
        this._sync = await chrome.storage.sync.get();
    }
}
