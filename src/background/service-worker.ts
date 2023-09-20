import {StorageMigrationService} from './storage/storage-migration.service';

chrome.runtime.onInstalled.addListener(async () => {
    // perform migration
    await StorageMigrationService.migrate();
});
