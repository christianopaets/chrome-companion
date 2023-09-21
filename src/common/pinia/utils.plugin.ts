import 'pinia';
import type {Router} from 'vue-router';
import {useRouter} from 'vue-router';
import type {PiniaPluginContext} from 'pinia';
import {markRaw} from 'vue';
import {useToast} from 'primevue/usetoast';
import type {ToastServiceMethods} from 'primevue/toastservice';
import {useConfirm} from 'primevue/useconfirm';
import type {ConfirmationOptions} from 'primevue/confirmationoptions';

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
    context.store.router = markRaw(useRouter());
    context.store.toast = markRaw(useToast());
    context.store.confirm = markRaw(useConfirm());
}