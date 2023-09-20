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

createApp(Popup)
    .use(router)
    .use(PrimeVue)
    .component('Toolbar', Toolbar)
    .component('Button', Button)
    .component('TabMenu', TabMenu)
    .component('Menu', Menu)
    .component('Dropdown', Dropdown)
    .component('Divider', Divider)
    .provide(ThemeService.INJECTOR, new ThemeService())
    .mount('body');
