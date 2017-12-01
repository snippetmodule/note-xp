import SyncTasks = require('synctasks');
import fm = require('../../framework');

const SUFFIX = 'docs';

const mCacheDao = new fm.db.DaoUtils.KeyValueCacheDao();

function getKey(key: string): string {
    return SUFFIX + key;
}
export function save<T>(key: string, value: T): SyncTasks.Promise<void> {
    return mCacheDao.put({
        id: getKey(key),
        createTime: new Date().getTime(),
        value: value,
    });
}
export function get<T>(key: string, value: T = null): SyncTasks.Promise<T> {
    return mCacheDao.get(getKey(key)).then((cache) => {
        if (!cache) {
            return value;
        }
        return cache.value;
    });
}
export function del(key: string): SyncTasks.Promise<void> {
    return mCacheDao.remove(getKey(key));
}