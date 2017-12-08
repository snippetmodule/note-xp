import SyncTasks = require('synctasks');
import fetchJsonp = require('fetch-jsonp');
import { GenericRestClient, ApiCallOptions, HttpAction, WebResponse } from 'simplerestclients';
import UrlCacheUtils = require('./UrlCacheUtils');
import DeviceUtils = require('./DeviceUtils');
import IBaseJson from '../models/IBaseJson';
import UserManager = require('../manager/UserManager');
import Log = require('./Log');
import _ = require('lodash');

export type HttpParams = {
    url: string;
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any;
    expiredTime?: number,
    emptyUseCache?: boolean
};

// const _giphyApiUrl = 'https://api.giphy.com/v1/gifs/search';

class RestClient extends GenericRestClient {
    // Override _getHeaders to append a custom header with the app ID.
    public _getHeaders(options: ApiCallOptions): { [key: string]: string } {
        let headers = super._getHeaders(options);
        headers['Client-Device-Id'] = '1213113131313';
        headers['Authorization'] = `Bearer ${UserManager.getUser().token}`;
        return headers;
    }
    public _performApiCall<T>(apiPath: string, action: HttpAction, objToPost: any, givenOptions: ApiCallOptions): SyncTasks.Promise<WebResponse<T>> {
        return super._performApiCall(apiPath, action, objToPost, givenOptions);
    }
}
function findInCache<T extends IBaseJson<any>>(params: HttpParams, response: WebResponse<T>): SyncTasks.Promise<T> {
    return UrlCacheUtils.get(params.url, params.expiredTime, params.method, params.body)
        .then((cache) => {
            if (cache) {
                return JSON.parse(cache.response);
            } else {
                return SyncTasks.Rejected(`{$response.url} \n {$response.statusCode} {$reponse.statusText}`);
            }
        });
}
function fetchInCache<T>(params: HttpParams, response: WebResponse<T>): SyncTasks.Promise<T> {
    return UrlCacheUtils.get(params.url, params.expiredTime, params.method, params.body)
        .then((cache) => {
            if (cache) {
                return JSON.parse(cache.response);
            } else {
                return SyncTasks.Rejected(`{$response.url} \n {$response.statusCode} {$reponse.statusText}`);
            }
        });
}
function requestImpl<T extends IBaseJson<any>>(params: HttpParams): SyncTasks.Promise<T> {
    const client = new RestClient('');
    // Log.i('RestUtils', `request url:${params.url} \n \t\t header:${JSON.stringify(client._getHeaders(null))} method:${params.method} body:${params.body}`);
    return client._performApiCall<T>(params.url, params.method || 'GET', params.body || '', null)
        .then((response: WebResponse<T>) => {
            // Log.i('RestUtils', `request url:${params.url} \n \t\t result:${JSON.stringify(response)}`);
            if (response.statusCode === 200) {
                if (response.body.code === 401) {
                    UserManager.logOut();
                    return SyncTasks.Rejected(`stateCode: 200,but response.body.code: ${response.body.code}`);
                }
                let messages = response.body.message;
                if (params.emptyUseCache && (!messages || (_.isArray(messages) && (messages as any).length === 0))) {
                    return findInCache(params, response);
                }
                if ((params.expiredTime > 0 || params.emptyUseCache) &&
                    ((_.isArray(messages) && (messages as any).length === 0) || (_.isObject(messages)))) {
                    UrlCacheUtils.save(params.url, JSON.stringify(response.body), params.method, params.body);
                }
                return response.body;
            } else {
                return findInCache(params, response);
            }
        });
}
function fetchImpl<T>(params: HttpParams): SyncTasks.Promise<T> {
    const client = new RestClient('');
    // Log.i('RestUtils', `request url:${params.url} \n \t\t header:${JSON.stringify(client._getHeaders(null))} method:${params.method} body:${params.body}`);
    return client._performApiCall<T>(params.url, params.method || 'GET', params.body || '', null)
        .then((response: WebResponse<T>) => {
            // Log.i('RestUtils', `request url:${params.url} \n \t\t result:${JSON.stringify(response)}`);
            if (response.statusCode === 200) {
                if ((params.expiredTime > 0 || params.emptyUseCache)) {
                    UrlCacheUtils.save(params.url, JSON.stringify(response.body), params.method, params.body);
                }
                return response.body;
            } else {
                return fetchInCache(params, response);
            }
        });
}
export function request<T extends IBaseJson<any>>(params: HttpParams): SyncTasks.Promise<T> {
    if (params.expiredTime && params.expiredTime > 0) {
        return UrlCacheUtils.get(params.url, params.expiredTime, params.method, params.body)
            .then((cache) => {
                if (cache) {
                    return SyncTasks.Resolved(JSON.parse(cache.response));
                } else {
                    return requestImpl<T>(params);
                }
            });
    }
    return requestImpl<T>(params);
}

export function fetch<T>(params: HttpParams): SyncTasks.Promise<T> {
    // if (DeviceUtils.isWeb) {
    //     let defer = SyncTasks.Defer<T>();
    //     fetchJsonp(params.url, { timeout: 1000 * 90, jsonpCallback: 'custom_callback' })
    //         .then(res => {
    //             console.log('res.ok');
    //             return res.json<T>();
    //         })
    //         .then(res => {
    //             console.log('fetch11111');
    //             return defer.resolve(res);
    //         })
    //         .catch(err => {
    //             console.log('fetch2222');
    //             defer.reject(err);
    //         });
    //     return defer.promise();
    // }
    if (params.expiredTime && params.expiredTime > 0) {
        return UrlCacheUtils.get(params.url, params.expiredTime, params.method, params.body)
            .then((cache) => {
                if (cache) {
                    return SyncTasks.Resolved(JSON.parse(cache.response));
                } else {
                    return fetchImpl<T>(params);
                }
            });
    }
    return fetchImpl<T>(params);
}