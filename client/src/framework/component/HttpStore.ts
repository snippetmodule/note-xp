import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';
import IBaseJson from '../models/IBaseJson';
import { HttpParams } from '../utils/RestUtils';
import SyncTasks = require('synctasks');
import RestUtils = require('../utils/RestUtils');

export type State = 'idle' | 'loading' | 'sucess' | 'fail';
export type HttpResponse<T> = {
    state: State,
    startTime?: number,
    endTime?: number,
    result?: IBaseJson<T>,
};

@AutoSubscribeStore
export class HttpStore<T> extends StoreBase {
    private response: HttpResponse<T> = { state: 'idle' };

    @autoSubscribe
    getHttpResonse() {
        return { ...this.response };
    }

    exeHttp(params: HttpParams) {
        this.response.state = 'loading';
        this.response.startTime = new Date().getTime();
        this.trigger();
        RestUtils.request(params)
            .then((result) => {
                this.response.state = 'sucess';
                this.response.endTime = new Date().getTime();
                this.response.result = result as IBaseJson<T>;
                this.trigger();
            }).catch((err) => {
                this.response.state = 'fail';
                this.response.endTime = new Date().getTime();
                this.response.result = err;
                this.trigger();
            });
    }

    exeAsync(task: SyncTasks.Promise<IBaseJson<T>>) {
        this.response.state = 'loading';
        this.response.startTime = new Date().getTime();
        this.trigger();
        task.then((result) => {
            this.response.state = 'sucess';
            this.response.endTime = new Date().getTime();
            this.response.result = result as IBaseJson<T>;
            this.trigger();
        }).catch((err) => {
            this.response.state = 'fail';
            this.response.endTime = new Date().getTime();
            this.response.result = err;
            this.trigger();
        });
    }
}
