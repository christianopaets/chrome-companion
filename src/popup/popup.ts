import './scss/index.scss';
import {createApp} from 'vue';
import Popup from './Popup.vue';
import router from './router';
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
import {createPinia} from 'pinia';
import {chromeStoragePlugin} from '../common/pinia/chrome-storage.plugin';
import {utilsPlugin} from '../common/pinia/utils.plugin';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';

const pinia = createPinia()
    .use(utilsPlugin);

const app = createApp(Popup)
    .use(router)
    .use(PrimeVue, {ripple: true})
    .use(ConfirmationService)
    .use(ToastService)
    .component('Toolbar', Toolbar)
    .component('Button', Button)
    .component('TabMenu', TabMenu)
    .component('Menu', Menu)
    .component('Dropdown', Dropdown)
    .component('Divider', Divider)
    .component('Slider', Slider)
    .component('InputSwitch', InputSwitch)
    .component('Toast', Toast)
    .component('ConfirmDialog', ConfirmDialog)
    .provide(ThemeService.INJECTOR, new ThemeService());

ChromeStoragePreload.preload()
    .then(() => {
        pinia.use(chromeStoragePlugin);
        app.use(pinia)
            .mount('body');
    });
