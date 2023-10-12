import type {Plugin} from '@vue/runtime-core';
import Tooltip from 'primevue/tooltip';
import FocusTrap from 'primevue/focustrap';
import Ripple from 'primevue/ripple';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import TabMenu from 'primevue/tabmenu';
import Menu from 'primevue/menu';
import Dropdown from 'primevue/dropdown';
import Divider from 'primevue/divider';
import Slider from 'primevue/slider';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import Message from 'primevue/message';
import InlineMessage from 'primevue/inlinemessage';
import Card from 'primevue/card';
import Fieldset from 'primevue/fieldset';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import PrimeVue from 'primevue/config';
import Avatar from 'primevue/avatar';
import Skeleton from 'primevue/skeleton';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

const primevue: Plugin = {
    install: app => {
        app.use(PrimeVue, {ripple: true})
            .use(ConfirmationService)
            .use(ToastService).directive('tooltip', Tooltip)
            .directive('focustrap', FocusTrap)
            .directive('ripple', Ripple)
            .component('Toolbar', Toolbar)
            .component('Button', Button)
            .component('TabMenu', TabMenu)
            .component('Menu', Menu)
            .component('Dropdown', Dropdown)
            .component('Divider', Divider)
            .component('Slider', Slider)
            .component('InputSwitch', InputSwitch)
            .component('InputText', InputText)
            .component('Toast', Toast)
            .component('ConfirmDialog', ConfirmDialog)
            .component('Message', Message)
            .component('InlineMessage', InlineMessage)
            .component('Card', Card)
            .component('Fieldset', Fieldset)
            .component('Dialog', Dialog)
            .component('Avatar', Avatar)
            .component('Skeleton', Skeleton)
            .component('Textarea', Textarea);
    }
};

export {primevue as PrimevueComponents};
