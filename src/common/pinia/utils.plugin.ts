import 'pinia';
import type {Router} from 'vue-router';
import type {PiniaPluginContext} from 'pinia';
import {markRaw} from 'vue';
import type {ToastServiceMethods} from 'primevue/toastservice';
import type {ConfirmationOptions} from 'primevue/confirmationoptions';
import {router} from '../../popup/router';
import {useToast} from 'primevue/usetoast';
import {useConfirm} from 'primevue/useconfirm';

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
    // resolve this hack
    if (context.store.$id !== 'api-config') {
        context.store.toast = markRaw(useToast());
        context.store.confirm = markRaw(useConfirm());
    }
}
