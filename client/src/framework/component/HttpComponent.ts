import RX = require('reactxp');
import { ComponentBase } from 'resub';
import { HttpResponse } from "./HttpStore";
import { HttpParams } from "../utils/RestUtils";
import BaseJson from '../models/BaseJson';
import { HttpStore } from "./HttpStore";

export type HttpProps<T> = {
    httpParams?: HttpParams;
    httpStore?: HttpStore<T>; // 可能其它组件发起http ,此组件来监听结果
    onIdle?: () => JSX.Element;
    onLoading?: () => JSX.Element;
    onSucess: (result: BaseJson<T>) => JSX.Element;
    onFail?: (err: any) => JSX.Element;
}

export class HttpComponent<T> extends ComponentBase<HttpProps<T>, HttpResponse<T>> {
    protected _buildState(props: HttpProps<T>, initialBuild: boolean): HttpResponse<T> {
        let mHttpStore: HttpStore<T> = this.props.httpStore;
        if (!mHttpStore) {
            mHttpStore = new HttpStore();
            mHttpStore.exeHttp(this.props.httpParams);
        }
        return mHttpStore.getHttpResonse()
    }

    render(){
        switch (this.state.state) {
            case 'idle':
                return this.props.onIdle() || this.props.onLoading();
            case 'loading':
                return this.props.onLoading() || this.props.onIdle();
            case 'sucess':
                return this.props.onSucess(this.state.result);
            case 'fail':
                return this.props.onFail(this.state.result);
            default:
                return this.props.onIdle() || this.props.onLoading();
        }

    }
}