import tables from './tables';
import type {Table} from './interfaces/table.interface';
import {capitalize} from '../../common/utils/capitalize';

export class StorageMigrationService {

    private static readonly _tables = tables;

    static async migrate(): Promise<void> {
        const local = this._tables.filter(table => table.type === 'local');
        const sync = this._tables.filter(table => table.type === 'sync');
        await this._migrate(local, 'local');
        await this._migrate(sync, 'sync');
    }

    private static async _migrate(tables: Table[], type: 'local' | 'sync'): Promise<void> {
        if (!tables.length) {
            console.log(`${capitalize(type)} storage must be empty!`);
            await chrome.storage[type].clear();
            return;
        }
        const storage = await chrome.storage[type].get();
        const newStorage: Record<string, unknown> & Record<'migrations', Record<string, number>> = {
            migrations: {},
            ...storage
        };
        let upToDate = 0;
        for (let table of tables) {
            const currentTableVersion = storage?.migrations?.[table.name] || 0;
            const migrations = table.migrations.filter(migration => migration.version > currentTableVersion);
            if (!migrations.length) {
                ++upToDate;
                continue;
            }
            for (let migration of migrations) {
                newStorage[table.name] = migration.up(newStorage[table.name]);
                newStorage.migrations[table.name] = migration.version;
            }
        }
        if (upToDate === tables.length) {
            console.log('%cMigration was skipped due to no changes!', 'font-weight: bold;');
            return;
        }
        await chrome.storage[type].clear();
        await chrome.storage[type].set(newStorage);
    }
}
