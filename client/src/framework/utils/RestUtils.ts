import { GenericRestClient, HttpAction, ApiCallOptions, WebResponse } from 'simplerestclients';
import SyncTasks = require('synctasks');

import UrlCacheUtils = require('./UrlCacheUtils');
import BaseJson from '../models/BaseJson'
import Log = require('./Log');

export type HttpParams = {
    url: string;
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any;
    expiredTime?: number,
    emptyUseCache?: boolean
};


// const _giphyApiUrl = 'https://api.giphy.com/v1/gifs/search';

class RestClient extends GenericRestClient {
    public _performApiCall<T>(apiPath: string, action: HttpAction, objToPost: any, givenOptions: ApiCallOptions): SyncTasks.Promise<WebResponse<T>> {
        return super._performApiCall(apiPath, action, objToPost, givenOptions);
    }
}

function requestImpl<T>(params: HttpParams): SyncTasks.Promise<BaseJson<T>> {
    const client = new RestClient('');
    Log.i('RestUtils', `request url:${params.url} \n \t\t method:${params.method} body:${params.body}`);
    return client._performApiCall<BaseJson<T>>(params.url, params.method || 'GET', params.body || '', null)
        .then((response => {
            Log.i('RestUtils', `request url:${params.url} \n \t\t result:${JSON.stringify(response)}`);
            if (response.statusCode === 200) {
                if (!response.body.message && params.emptyUseCache) {
                    return UrlCacheUtils.get(params.url, params.expiredTime, params.method, params.body)
                        .then(cache => {
                            if (cache) {
                                return JSON.parse(cache.response) as BaseJson<T>;
                            } else {
                                return SyncTasks.Rejected(`{$response.url} \n return 200,but no message,Cache also return empty`);
                            }
                        });

                }
                if (!response.body.message && (params.expiredTime > 0 || params.emptyUseCache)) {
                    UrlCacheUtils.save(params.url, JSON.stringify(response.body), params.method, params.body);
                }
                return response.body;
            } else {
                return SyncTasks.Rejected(`{$response.url} \n {$response.statusCode} {$reponse.statusText}`);
            }
        }));
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

            })
    }
    return requestImpl<T>(params);
}

// export const get=(url:string,option?:ApiCallOptions)=>request(url,'GET',{},option);
// export const post=(url:string,body?:any,option?:ApiCallOptions)=>request(url,'POST',body,option);
// export const del=(url:string,body?:any,option?:ApiCallOptions)=>request(url,'DELETE',body,option);
// export const put=(url:string,body?:any,option?:ApiCallOptions)=>request(url,'PUT',body,option);
// export const patch=(url:string,body?:any,option?:ApiCallOptions)=>request(url,'PATCH',body,option);



