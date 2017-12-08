
import rx = require('reactxp');
import SyncTasks = require('synctasks');

import { ComponentBase } from 'resub';

import { EmptyView } from './widget/EmptyView';
import { HttpParams } from '../utils/RestUtils';
import IBaseJson from '../models/IBaseJson';
import { AsyncStore, AsyncResponse } from './AsyncStore';

interface IAsyncProps<T> extends React.Props<T> {
    httpParams?: HttpParams;
    task?: () => SyncTasks.Promise<T>;
    promise?: () => Promise<T>;
    onLoading?: () => JSX.Element;
    onSucess: (result: T) => JSX.Element;
    onSucessFilter?: (result: T) => boolean; // 根据http 结果判断结果是否有效,有校会调用:onSucess
    onFail?: (err: any) => JSX.Element;
}

export class AsyncComponent<T> extends ComponentBase<IAsyncProps<T>, AsyncResponse<T>> {

    private _asyncStore: AsyncStore<T>;

    protected _buildState(props: IAsyncProps<T>, initialBuild: boolean): AsyncResponse<T> {
        if (!this._asyncStore) {
            this._asyncStore = new AsyncStore();
            window.setTimeout(this.freshData);
        }
        return this._asyncStore.getResonse();
    }

    render() {
        let contentView: JSX.Element;
        switch (this.state.state) {
            case 'loading':
                contentView = this.renderLoading();
                break;
            case 'sucess':
                contentView = this.renderSucess();
                break;
            case 'fail':
                contentView = this.renderFail();
                break;
            default:
                contentView = null;
                break;
        }
        return contentView;
    }
    private renderLoading = () => {
        if (this.props.onLoading) {
            return this.props.onLoading();
        }
        return (<EmptyView state="loading" btnPress={this.freshData} />);
    }
    private renderFail = () => {
        if (this.props.onFail) {
            return this.props.onFail(this.state.result);
        }
        return (<EmptyView state="fail" btnPress={this.freshData} />);
    }
    private renderSucess = () => {
        if (!this.props.onSucessFilter) {
            return this.props.onSucess(this.state.result);
        }
        if (!this.props.onSucessFilter(this.state.result)) {
            return this.props.onSucess(this.state.result);
        }
        return (<EmptyView state="fail" btnPress={this.freshData} />);
    }
    freshData = () => {
        if (this.props.httpParams) {
            this._asyncStore.exeHttp(this.props.httpParams);
        }
        if (this.props.task) {
            this._asyncStore.exeAsync(this.props.task());
        }
        if (this.props.promise) {
            this._asyncStore.exePromise(this.props.promise());
        }
    }
}