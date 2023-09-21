import 'pinia';
import type {Router} from 'vue-router';
import type {PiniaPluginContext} from 'pinia';
import {markRaw} from 'vue';
import type {ToastServiceMethods} from 'primevue/toastservice';
import type {ConfirmationOptions} from 'primevue/confirmationoptions';
import {router} from '../../popup/router';

declare module 'pinia' {
    export interface PiniaCustomProperties {
        router: Router;
        toast: ToastServiceMethods;
        confirm: {
            require: (option: ConfirmationOptions) => void;
            close: () => void;
        };
    }
}

export function utilsPlugin(context: PiniaPluginContext): void {
    context.store.router = markRaw(router);
}
