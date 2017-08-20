import { GenericRestClient ,HttpAction,ApiCallOptions,WebResponse} from 'simplerestclients';
import SyncTasks = require('synctasks');

import BaseJson from '../models/BaseJson'
import Log = require('./Log');

export type HttpParams = {
    url: string;
    method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any;
    expiredTime?: number,
    emptyUseCache?: boolean
} ;


// const _giphyApiUrl = 'https://api.giphy.com/v1/gifs/search';

class RestClient extends GenericRestClient{
    public _performApiCall<T>(apiPath: string, action: HttpAction, objToPost: any, givenOptions: ApiCallOptions):SyncTasks.Promise<WebResponse<T>>{
       return super._performApiCall(apiPath,action,adjToPost,givenOptions);
    }
}
async function getFromCache(params:HttpParams){
    let cache = await UrlCacheUtils.get(params.url, params.expiredTime,params.method,params.body);
    if(cache){
        this.response.state = 'sucess';
        this.response.result = JSON.parse(cache.response);
        this.trigger();
    }
}
export async function request<T>(params:HttpParams): SyncTasks.Promise<BaseJson<T>> {
    if (params.expiredTime && params.expiredTime > 0) {
        let cache =  await UrlCacheUtils.get(params.url, params.expiredTime,params.method,params.body);
        if(cache){
            return SyncTasks.Resolved(JSON.parse(cache));
        }
    }
    const client= new RestClient(null);
    Log.d('RestUtils', `request url:{$url} \n \t\t method:{$method} body:{$body}`);
    const response:BaseJson<T> = await client._performApiCall(params.url, params.method || 'GET', params.body ||'', null);
    if(response.statusCode === 200){
        if(!response.message && response.emptyUseCache){
            let cache =  await UrlCacheUtils.get(params.url, params.expiredTime,params.method,params.body);
            if(cache){
                return JSON.parse(cache);
            }
        }
        if(!response.message && (params.expiredTime>0 || params.emptyUseCache)){
            await UrlCacheUtils.save(params.url,Json.toString(response),params.method,params.body);
        }
        return response.body.data;
    }else{
        return SyncTasks.reject(`{$response.url} \n {$response.statusCode} {$reponse.statusText}`);
    }
}

// export const get=(url:string,option?:ApiCallOptions)=>request(url,'GET',{},option);
// export const post=(url:string,body?:any,option?:ApiCallOptions)=>request(url,'POST',body,option);
// export const del=(url:string,body?:any,option?:ApiCallOptions)=>request(url,'DELETE',body,option);
// export const put=(url:string,body?:any,option?:ApiCallOptions)=>request(url,'PUT',body,option);
// export const patch=(url:string,body?:any,option?:ApiCallOptions)=>request(url,'PATCH',body,option);



