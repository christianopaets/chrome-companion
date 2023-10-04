import 'pinia';
import type {Router} from 'vue-router';
import type {PiniaPluginContext} from 'pinia';
import {markRaw} from 'vue';
import type {ToastServiceMethods} from 'primevue/toastservice';
import type {ConfirmationOptions} from 'primevue/confirmationoptions';
import {router} from '../../popup/router';
import {useToast} from 'primevue/usetoast';
import {useConfirm} from 'primevue/useconfirm';
import {HttpService} from '../../popup/services/http.service';
import type {Composer} from 'vue-i18n';
import {useI18n} from 'vue-i18n';

type StorePackages = 'router' | 'i18n' | 'http' | 'toast' | 'confirm';

declare module 'pinia' {
    export interface DefineStoreOptionsBase<S, Store> {
        inject?: StorePackages[];
    }

    export interface DefineStoreOptionsInPlugin<Id, S, G, A> {
        inject?: StorePackages[];
    }

    export interface PiniaCustomProperties {
        router?: Router;
        http?: HttpService;
        toast?: ToastServiceMethods;
        i18n?: Composer;
        confirm?: {
            require: (option: ConfirmationOptions) => void;
            close: () => void;
        };
    }
}

export function utilsPlugin({store, options}: PiniaPluginContext): void {
    if (!options.inject?.length) {
        return;
    }
    if (options.inject.includes('router')) {
        store.router = markRaw(router);
    }
    if (options.inject.includes('i18n')) {
        store.i18n = markRaw(useI18n({useScope: 'global'}));
    }
    if (options.inject.includes('http')) {
        store.http = HttpService.instance;
    }
    if (options.inject.includes('toast')) {
        store.toast = markRaw(useToast());
    }
    if (options.inject.includes('confirm')) {
        store.confirm = markRaw(useConfirm());
    }
}
