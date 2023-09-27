import 'pinia';
import type {Router} from 'vue-router';
import type {PiniaPluginContext} from 'pinia';
import {inject, markRaw} from 'vue';
import type {ToastServiceMethods} from 'primevue/toastservice';
import type {ConfirmationOptions} from 'primevue/confirmationoptions';
import {router} from '../../popup/router';
import {useToast} from 'primevue/usetoast';
import {useConfirm} from 'primevue/useconfirm';
import {HttpService} from '../../popup/services/http.service';
import {useI18n} from 'vue-i18n';

declare module 'pinia' {
    export interface PiniaCustomProperties {
        router: Router;
        http: HttpService;
        toast: ToastServiceMethods;
        i18n: ReturnType<typeof useI18n>;
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
        context.store.i18n = markRaw(useI18n({useScope: 'global'}));
        context.store.http = inject(HttpService.INJECTOR)!;
        context.store.toast = markRaw(useToast());
        context.store.confirm = markRaw(useConfirm());
    }
}
