import SyncTasks = require('synctasks');
import fm = require('../../framework');

const caches: { [storename: string]: fm.db.DaoUtils.KeyValueCacheDao } = {
};
type KeyValueStoreName = 'docsDbCache' | 'keyValueCache';
function getKey(key: string): string {
    return key || '';
}
function getCache(storename: string) {
    if (caches[storename]) {
        return caches[storename];
    }
    return caches[storename] = new fm.db.DaoUtils.KeyValueCacheDao(storename);
}
export function save<T>(key: string, value: T, storename: KeyValueStoreName = 'keyValueCache'): SyncTasks.Promise<void> {
    return getCache(storename).put({
        id: getKey(key),
        createTime: new Date().getTime(),
        value: value,
    });
}
export function get<T>(key: string, value: T = null, storename: KeyValueStoreName = 'keyValueCache'): SyncTasks.Promise<T> {
    return getCache(storename).get(getKey(key)).then((cache) => {
        if (!cache) {
            return value;
        }
        return cache.value;
    }).catch(err => {
        return value;
    });
}
export function del(key: string, storename = 'keyValue'): SyncTasks.Promise<void> {
    return getCache(storename).remove(getKey(key));
}