import './scss/index.scss';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import {pinia} from './stores';
import {createApp} from 'vue';
import Popup from './Popup.vue';
import {router} from './router';
import PrimeVue from 'primevue/config';
import Toolbar from 'primevue/toolbar';
import {ThemeService} from './services/theme.service';
import Button from 'primevue/button';
import TabMenu from 'primevue/tabmenu';
import Menu from 'primevue/menu';
import Dropdown from 'primevue/dropdown';
import Divider from 'primevue/divider';
import Slider from 'primevue/slider';
import InputSwitch from 'primevue/inputswitch';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import {ChromeStoragePreload} from '../common/pinia/chrome-storage.preload';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import InputText from 'primevue/inputtext';
import Tooltip from 'primevue/tooltip';
import Message from 'primevue/message';
import Card from 'primevue/card';
import Fieldset from 'primevue/fieldset';
import {HttpService} from './services/http.service';

const app = createApp(Popup)
    .use(PrimeVue, {ripple: true})
    .use(ConfirmationService)
    .use(ToastService)
    .directive('tooltip', Tooltip)
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
    .component('Card', Card)
    .component('Fieldset', Fieldset)
    .provide(ThemeService.INJECTOR, new ThemeService())
    .provide(HttpService.INJECTOR, new HttpService());

ChromeStoragePreload.preload()
    .then(() => {
        app.use(pinia)
            .use(router)
            .mount('#app')
        document.dispatchEvent(new Event('app-mounted'));
    });
