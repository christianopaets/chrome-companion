import type {PiniaPluginContext} from 'pinia';
import {ChromeStoragePreload} from './chrome-storage.preload';
import {toRaw} from 'vue';

declare module 'pinia' {
    export interface DefineStoreOptionsBase<S, Store> {
        chrome?: 'local' | 'sync';
    }

    export interface DefineStoreOptionsInPlugin<Id, S, G, A> {
        chrome?: 'local' | 'sync';
    }
}

export function chromeStoragePlugin(context: PiniaPluginContext): void {
    const {options, store} = context;
    if (!options.chrome) {
        return;
    }
    if (!ChromeStoragePreload[options.chrome]?.hasOwnProperty(store.$id)) {
        return;
    }
    store.$patch(ChromeStoragePreload[options.chrome][store.$id]);
    store.$subscribe(async (_, state) => {
        await chrome.storage[options.chrome!]?.set({[store.$id]: toRaw(state)});
        localStorage.setItem(store.$id, JSON.stringify(state));
    }, {detached: true});
}
