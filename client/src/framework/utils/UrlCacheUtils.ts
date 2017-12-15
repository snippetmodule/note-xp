import SyncTasks = require('synctasks');

import { UrlCacheDao } from '../db/DaoUtils';
import MD5Utils = require('./Md5Utils');
import DeviceUtils = require('./DeviceUtils');
import DBModels = require('../db/DbModels');

const mUrlCacheDao = new UrlCacheDao();
function getMd5(url: string, method = 'GET', body = ''): string {
    return DeviceUtils.isDebug ? `${url}_${method}_${body}` : MD5Utils.hash(`${url}_${method}_${body}`);
}
export function save(url: string, response: string, method = 'GET', body = ''): SyncTasks.Promise<void> {
    // let md5 = MD5Utils.hash(`{$url}_{$method}_{$body}`);
    return mUrlCacheDao.put({
        id: getMd5(url, method, body),
        createTime: new Date().getTime(),
        response: response,
    });
}
export function get(url: string, expiredTime = 0, method = 'GET', body = ''): SyncTasks.Promise<DBModels.IUrlCache> {
    // let md5 = MD5Utils.hash(`{$url}_{$method}_{$body}`);
    return mUrlCacheDao.get(getMd5(url, method, body)).then((cache) => {
        if (!cache) {
            return null;
        }
        if (expiredTime <= 0) {
            return cache;
        } else if (expiredTime >= 0 && new Date().getTime() - cache.createTime < expiredTime) {
            return cache;
        } else {
            del(url, method, body);
            return SyncTasks.Rejected(`{$url} expired time`);
        }
    });
}
export function del(url: string, method = 'GET', body = ''): SyncTasks.Promise<void> {
    // let md5 = MD5Utils.hash(`{$url}_{$method}_{$body}`);
    return mUrlCacheDao.remove(getMd5(url, method, body));
}