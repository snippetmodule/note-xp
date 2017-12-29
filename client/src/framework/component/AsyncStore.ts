import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';
import IBaseJson from '../models/IBaseJson';
import { HttpParams } from '../utils/RestUtils';
import SyncTasks = require('synctasks');
import RestUtils = require('../utils/RestUtils');

export type State = 'idle' | 'loading' | 'sucess' | 'fail';

export type AsyncResponse<T> = {
    state: State,
    startTime?: number,
    endTime?: number,
    result?: T,
};

@AutoSubscribeStore
export class AsyncStore<T> extends StoreBase {
    private response: AsyncResponse<T> = { state: 'idle' };
    private promise: SyncTasks.Promise<any>;

    @autoSubscribe
    getResonse() {
        return { ...this.response };
    }
    private cancelPromise() {
        if (this.promise != null) {
            this.promise.cancel();
        }
    }
    exeHttp(params: HttpParams) {
        this.cancelPromise();
        this.response.state = 'loading';
        this.response.startTime = new Date().getTime();
        this.trigger();
        this.promise = RestUtils.request(params)
            .then((result) => {
                this.response.state = 'sucess';
                this.response.endTime = new Date().getTime();
                this.response.result = result as any;
                this.trigger();
            }).catch((err) => {
                this.response.state = 'fail';
                this.response.endTime = new Date().getTime();
                this.response.result = err.name;
                this.trigger();
            });
    }

    exeAsync(task: SyncTasks.Promise<T>) {
        this.cancelPromise();
        this.response.state = 'loading';
        this.response.startTime = new Date().getTime();
        this.trigger();
        this.promise = task.then((result) => {
            this.response.state = 'sucess';
            this.response.endTime = new Date().getTime();
            this.response.result = result;
            this.trigger();
        }).catch((err) => {
            this.response.state = 'fail';
            this.response.endTime = new Date().getTime();
            this.response.result = err.name;
            this.trigger();
        });
    }

    exePromise(task: Promise<T>) {
        this.cancelPromise();
        this.response.state = 'loading';
        this.response.startTime = new Date().getTime();
        this.trigger();
        let defer = SyncTasks.Defer<T>();
        task.then((v) => {
            defer.resolve(v);
        }).catch((err) => {
            defer.reject(err);
        });
        this.promise = defer.promise().then(v => {
            this.response.state = 'sucess';
            this.response.endTime = new Date().getTime();
            this.response.result = v;
            this.trigger();
        }).catch(err => {
            this.response.state = 'fail';
            this.response.endTime = new Date().getTime();
            this.response.result = err.name;
            this.trigger();
        });
    }
}