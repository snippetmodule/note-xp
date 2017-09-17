import NoSqlProvider = require('nosqlprovider');
import SyncTasks = require('synctasks');

import DbModels = require('./DbModels');
import DbUtils = require('./DbUtils');
import DbConfig = require('./DbConfig');

export class BaseDao<T extends DbModels.BaseDBModel> {
    private storeName: string;

    public constructor(storeName: string) {
        this.storeName = storeName;
    }

    getAll(): SyncTasks.Promise<T[]> {
        return DbUtils.getStore(this.storeName, false)
            .then((store: NoSqlProvider.DbStore) => {
                return store.openPrimaryKey().getAll() as SyncTasks.Promise<T[]>;
            }).fail(this._handleDbFail);
    }

    put(model: T): SyncTasks.Promise<void> {
        return DbUtils.getStore(this.storeName, true)
            .then((store: NoSqlProvider.DbStore) => {
                let result: SyncTasks.Promise<void> = store.put(model) as SyncTasks.Promise<void>;
                return result;
            }).fail(this._handleDbFail);
    }

    remove(keyOrKeys: any | any[]): SyncTasks.Promise<void> {
        return DbUtils.getStore(this.storeName, true)
            .then((store: NoSqlProvider.DbStore) => {
                return store.remove(keyOrKeys) as SyncTasks.Promise<void>;
            }).fail(this._handleDbFail);
    }
    get(key: any | any[]): SyncTasks.Promise<T> {
        return DbUtils.getStore(this.storeName, false)
            .then((store: NoSqlProvider.DbStore) => {
                return store.get(key) as SyncTasks.Promise<T>;
            }).fail(this._handleDbFail);
    }
    getMultiple(key: any | any[]): SyncTasks.Promise<T[]> {
        return DbUtils.getStore(this.storeName, false)
            .then((store: NoSqlProvider.DbStore) => {
                return store.getMultiple(key) as SyncTasks.Promise<T[]>;
            }).fail(this._handleDbFail);
    }
    clear(): SyncTasks.Promise<void> {
        return DbUtils.getStore(this.storeName, true)
            .then((store: NoSqlProvider.DbStore) => {
                return store.clearAllData() as SyncTasks.Promise<void>;
            }).fail(this._handleDbFail);
    }

    private _handleDbFail = (err: any) => {
        if (err.target) {
            if (err.target.error) {
                const error = err.target.error;
                console.error(`IDBRequest: ${error.name}: ${error.message}`);
            }
            if (err.target.transaction && err.target.transaction.error) {
                const error = err.target.transaction.error;
                console.error(`IDBTransaction: ${error.name}: ${error.message}`);
            }
            if (err.target.source) {
                const source = err.target.source;
                console.error(`IDBStore: ${source.name}, ${source.keyPath}, indexes: ${source.indexNames.join()}`);
            }
        }
    }
}
export class NoteItemDao extends BaseDao<DbModels.NoteItem> {
    public constructor() {
        super(DbConfig.Stores.noteItems);
    }
}

export class UrlCacheDao extends BaseDao<DbModels.UrlCache> {
    public constructor() {
        super(DbConfig.Stores.urlCache);
    }
}