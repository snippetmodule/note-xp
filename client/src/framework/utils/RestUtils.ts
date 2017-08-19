import { GenericRestClient ,HttpAction,ApiCallOptions,WebResponse} from 'simplerestclients';
import SyncTasks = require('synctasks');

import BaseJson from '../models/BaseJson'
import Log = require('./Log');

const _giphyApiUrl = 'https://api.giphy.com/v1/gifs/search';

class RestClient extends GenericRestClient{
    public _performApiCall<T>(apiPath: string, action: HttpAction, objToPost: any, givenOptions: ApiCallOptions):SyncTasks.Promise<WebResponse<T>>{
       return super._performApiCall(apiPath,action,adjToPost,givenOptions);
    }
}
function request<T>(url: string, method: HttpAction, body = {},option={}): SyncTasks.Promise<BaseJson<T>> {
    const client= new RestClient(_giphyApiUrl);
    Log.d('RestUtils', `request url:{$url} \n \t\t method:{$method} body:{$body}`);
    return client._performApiCall(url, method, body, option)
        .then(response => {
            Log.d('RestUtils', `response url:{$url} \n \t\t method:{$response}`);
            if(response.statusCode===200){
                return response.body.data;
            }else{
                return SyncTasks.reject(`{$response.url} \n {$response.statusCode} {$reponse.statusText}`);
            }
        });
}

export const get=(url:string,option?:ApiCallOptions)=>request(url,'GET',{},option);
export const post=(url:string,body?:any,option?:ApiCallOptions)=>request(url,'POST',body,option);
export const del=(url:string,body?:any,option?:ApiCallOptions)=>request(url,'DELETE',body,option);
export const put=(url:string,body?:any,option?:ApiCallOptions)=>request(url,'PUT',body,option);
export const patch=(url:string,body?:any,option?:ApiCallOptions)=>request(url,'PATCH',body,option);



