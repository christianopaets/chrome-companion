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

    private static async _migrate(tables: Table<object>[], type: 'local' | 'sync'): Promise<void> {
        if (!tables.length) {
            console.log(`${capitalize(type)} storage must be empty!`);
            await chrome.storage[type].clear();
            return;
        }
        const storage = await chrome.storage[type].get();
        const newStorage: Record<string, object> = {};
        let skipMigrationLength = 0;
        for (let table of tables) {
            if (!storage.hasOwnProperty(table.name)) {
                newStorage[table.name] = this._createTable(table);
                continue;
            }
            if (storage[table.name]?.version === table.version) {
                console.log(`Skip migration of %c${table.name}`, 'font-weight: bold;');
                ++skipMigrationLength;
                newStorage[table.name] = storage[table.name];
                continue;
            }
            newStorage[table.name] = this._updateTable(table, storage[table.name]);
        }
        if (skipMigrationLength === tables.length) {
            console.log('%cMigration was skipped do to no changes!', 'font-weight: bold;');
            return;
        }
        await chrome.storage[type].clear();
        await chrome.storage[type].set(newStorage);
    }

    private static _createTable(table: Table<Record<string, any>>): Record<string, any> {
        const newTable: Record<string, any> = {};
        for (let field of Object.keys(table.fields)) {
            newTable[field] = table.fields[field]!.default;
        }
        return newTable;
    }

    private static _updateTable(table: Table<Record<string, any>>, oldValues: Record<string, any>): Record<string, any> {
        const newTable: Record<string, any> = {};
        for (let field of Object.keys(table.fields)) {
            if (!oldValues.hasOwnProperty(field)) {
                newTable[field] = table.fields[field]!.default;
                continue;
            }
            if (table.fields[field]!.update !== null) {
                newTable[field] = table.fields[field]!.update;
                continue;
            }
            newTable[field] = oldValues[field];
        }
        return newTable;
    }
}
