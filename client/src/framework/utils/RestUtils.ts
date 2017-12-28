import SyncTasks = require('synctasks');
// import { GenericRestClient, ApiCallOptions, HttpAction, WebResponse } from 'simplerestclients';
import UrlCacheUtils = require('./UrlCacheUtils');
import DeviceUtils = require('./DeviceUtils');
import IBaseJson from '../models/IBaseJson';
import UserManager = require('../manager/UserManager');
import Log = require('./Log');
import _ = require('lodash');

export type HttpParams = {
    url: string;
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: {
        [header: string]: string;
    };
    body?: any;
    expiredTime?: number,
    emptyUseCache?: boolean
};

// const _giphyApiUrl = 'https://api.giphy.com/v1/gifs/search';

// class RestClient extends GenericRestClient {
//     // Override _getHeaders to append a custom header with the app ID.
//     public _getHeaders(options: ApiCallOptions): { [key: string]: string } {
//         let headers = super._getHeaders(options);
//         // headers['Client-Device-Id'] = '1213113131313';
//         // headers['Authorization'] = `Bearer ${UserManager.getUser().token}`;
//         return headers;
//     }
//     public _performApiCall<T>(apiPath: string, action: HttpAction, objToPost: any, givenOptions: ApiCallOptions): SyncTasks.Promise<WebResponse<T>> {
//         return super._performApiCall(apiPath, action, objToPost, givenOptions);
//     }
// }

function findInCache<T>(params: HttpParams): SyncTasks.Promise<T> {
    return UrlCacheUtils.get(params.url, params.expiredTime, params.method, params.body)
        .then((cache) => {
            if (cache) {
                return responseTo(cache.response);
            } else {
                return SyncTasks.Rejected(`${params.url} not in cache`);
            }
        });
}
function performFetch(url: string, method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH', body: any, header: HeadersInit): SyncTasks.Promise<string> {
    let defer = SyncTasks.Defer<string>();
    window.fetch(url, { headers: header, body: method === 'GET' ? null : body, method: method })
        .then(r => r.text())
        .then(r => defer.resolve(r))
        .catch(err => defer.reject(err));
    return defer.promise();
}

function requestJsonImpl<T extends IBaseJson<any>>(params: HttpParams): SyncTasks.Promise<T> {
    // Log.i('RestUtils', `request url:${params.url} \n \t\t header:${JSON.stringify(client._getHeaders(null))} method:${params.method} body:${params.body}`);
    return performFetch(params.url, params.method || 'GET', params.body || '', params.headers)
        .then((response: string) => {
            // Log.i('RestUtils', `request url:${params.url} \n \t\t result:${JSON.stringify(response)}`);
            let json = responseTo<T>(response);
            if (json.code === 401) {
                UserManager.logOut();
                SyncTasks.Rejected(`stateCode: 200,but body.code: ${json.code}`);
            }
            let messages = json.message;
            if (params.emptyUseCache && (!messages || (_.isArray(messages) && (messages as any).length === 0))) {
                return findInCache<T>(params);
            }
            if ((params.expiredTime > 0 || params.emptyUseCache) &&
                ((_.isArray(messages) && (messages as any).length === 0) || (_.isObject(messages)))) {
                UrlCacheUtils.save(params.url, response, params.method, params.body);
            }
            return SyncTasks.Resolved(json);
        })
        .catch(err => findInCache(params));
}
function responseTo<T>(response: string): T {
    if (/^[\],:{}\s]*$/.test(response.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        return JSON.parse(response);
    } else {
        let result = response as any;
        return result;
    }
}
function requestImpl<T>(params: HttpParams): SyncTasks.Promise<T> {
    // Log.i('RestUtils', `request url:${params.url} \n \t\t header:${JSON.stringify(client._getHeaders(null))} method:${params.method} body:${params.body}`);
    return performFetch(params.url, params.method || 'GET', params.body || '', params.headers)
        .then((response: string) => {
            // Log.i('RestUtils', `request url:${params.url} \n \t\t result:${JSON.stringify(response)}`);
            if ((params.expiredTime > 0 || params.emptyUseCache)) {
                UrlCacheUtils.save(params.url, responseTo(response), params.method, params.body);
            }
            return responseTo<T>(response);
        })
        .catch(e => findInCache<T>(params));
}
export function request<T extends IBaseJson<any>>(params: HttpParams): SyncTasks.Promise<T> {
    if (params.expiredTime && params.expiredTime > 0) {
        return UrlCacheUtils.get(params.url, params.expiredTime, params.method, params.body)
            .then((cache) => {
                if (cache) {
                    return SyncTasks.Resolved(responseTo<T>(cache.response));
                } else {
                    return requestJsonImpl<T>(params);
                }
            });
    }
    return requestJsonImpl<T>(params);
}

export function fetch<T>(params: HttpParams): SyncTasks.Promise<T> {
    // if (params.isJsonp) {
    //     let defer = SyncTasks.Defer<T>();
    //     fetchJsonp(params.url, { timeout: 1000 * 900, jsonpCallback: 'custom_callback' })
    //         .then(res => {
    //             console.log('res.ok');
    //             return res.json<T>();
    //         })
    //         .then(res => {
    //             console.log('fetch11111');
    //             return defer.resolve(res);
    //         })
    //         .catch(err => {
    //             console.log('fetch2222' + err.message);
    //             defer.reject(err);
    //         });
    //     return defer.promise();
    // }
    if (params.expiredTime && params.expiredTime > 0) {
        return UrlCacheUtils.get(params.url, params.expiredTime, params.method, params.body)
            .then((cache) => {
                if (cache && cache.response) {
                    return SyncTasks.Resolved(cache.response);
                } else {
                    return requestImpl<T>(params);
                }
            });
    }
    return requestImpl<T>(params);
}