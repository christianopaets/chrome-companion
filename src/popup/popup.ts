import './scss/index.scss';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import {pinia} from './stores';
import {createApp} from 'vue';
import Popup from './Popup.vue';
import {router} from './router';
import {ThemeService} from './services/theme.service';
import {ChromeStoragePreload} from '../common/pinia/chrome-storage.preload';
import {HttpService} from './services/http.service';
import {i18n} from './i18n';
import {PrimevueComponents} from './primevue';
import {ScrollService} from './services/scroll.service';

const app = createApp(Popup)
    .use(i18n)
    .use(PrimevueComponents)
    .provide(ThemeService.INJECTOR, new ThemeService())
    .provide(HttpService.INJECTOR, HttpService.instance)
    .provide(ScrollService.INJECTOR, new ScrollService());

ChromeStoragePreload.preload()
    .then(async () => {
        app.use(pinia)
            .use(router)
            .mount('#app');
        document.dispatchEvent(new Event('app-mounted'));
    });
