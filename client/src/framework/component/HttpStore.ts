import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';
import BaseJson from '../models/BaseJson'
import { HttpParams } from "../utils/RestUtils";
import SyncTasks = require('synctasks');
import RestUtils = require('../utils/RestUtils');

export type State = 'idle' | 'loading' | 'sucess' | 'fail';
export type HttpResponse<T> = {
    state: State,
    result?: BaseJson<T>
};

@AutoSubscribeStore
export class HttpStore<T> extends StoreBase {
    private response: HttpResponse<T> = { state: 'idle' };

    @autoSubscribe
    getHttpResonse() {
        return this.response;
    }

    exeHttp(params: HttpParams) {
        this.response.state = 'loading';
        this.trigger();
        RestUtils.request(params)
            .then(result => {
                this.response.state = 'sucess';
                this.response.result = result as BaseJson<T>;
                this.trigger();
            }).catch(err => {
                this.response.state = 'fail';
                this.response.result = err;
                this.trigger();
            });

    }

    exeAsync(task: SyncTasks.Promise<BaseJson<T>>) {
        this.response.state = 'loading';
        this.trigger();
        task.then(result => {
            this.response.state = 'sucess';
            this.response.result = result as BaseJson<T>;
            this.trigger();
        }).catch(err => {
            this.response.state = 'fail';
            this.response.result = err;
            this.trigger();
        });
        ;
    }
}
