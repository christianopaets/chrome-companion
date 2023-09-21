import {createPinia} from 'pinia';
import {utilsPlugin} from '../../common/pinia/utils.plugin';
import {chromeStoragePlugin} from '../../common/pinia/chrome-storage.plugin';

export const pinia = createPinia()
    .use(utilsPlugin)
    .use(chromeStoragePlugin);
