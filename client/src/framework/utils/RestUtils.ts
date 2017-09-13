import SyncTasks = require('synctasks');

import UrlCacheUtils = require('./UrlCacheUtils');
import BaseJson from '../models/BaseJson';
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
    protected _getHeaders(options: ApiCallOptions): { [key: string]: string } {
        let headers = super._getHeaders(options);
        headers['Client-Device-Id'] = '1213113131313';
        headers['Authorization'] = `Bearer ${UserManager.Instance.getUser().token}`;
        return headers;
    }
    public _performApiCall<T>(apiPath: string, action: HttpAction, objToPost: any, givenOptions: ApiCallOptions): SyncTasks.Promise<WebResponse<T>> {
        return super._performApiCall(apiPath, action, objToPost, givenOptions);
    }
}
function findInCache<T>(params: HttpParams, response: WebResponse<BaseJson<T>>): SyncTasks.Promise<BaseJson<T>> {
    return UrlCacheUtils.get(params.url, params.expiredTime, params.method, params.body)
        .then((cache) => {
            if (cache) {
                return JSON.parse(cache.response) as BaseJson<T>;
            } else {
                return SyncTasks.Rejected(`{$response.url} \n {$response.statusCode} {$reponse.statusText}`);
            }
        });
}
function requestImpl<T>(params: HttpParams): SyncTasks.Promise<BaseJson<T>> {
    const client = new RestClient('');
    Log.i('RestUtils', `request url:${params.url} \n \t\t method:${params.method} body:${params.body}`);
    return client._performApiCall<BaseJson<T>>(params.url, params.method || 'GET', params.body || '', null)
        .then((response: WebResponse<BaseJson<T>>) => {
            Log.i('RestUtils', `request url:${params.url} \n \t\t result:${JSON.stringify(response)}`);
            if (response.statusCode === 200) {
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
export function request<T>(params: HttpParams): SyncTasks.Promise<BaseJson<T>> {
    if (params.expiredTime && params.expiredTime > 0) {
        return UrlCacheUtils.get(params.url, params.expiredTime, params.method, params.body)
            .then((cache) => {
                if (cache) {
                    return SyncTasks.Resolved(JSON.parse(cache.response) as BaseJson<T>);
                } else {
                    return requestImpl<T>(params);
                }

            });
    }
    return requestImpl<T>(params);
}
