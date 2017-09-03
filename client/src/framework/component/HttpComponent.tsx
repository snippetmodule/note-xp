import React = require('react');

import rx = require('reactxp');
import SyncTasks = require('synctasks');

import { ComponentBase } from 'resub';

import { EmptyView } from './widget/EmptyView';
import { HttpParams } from "../utils/RestUtils";
import BaseJson from '../models/BaseJson';
import { HttpStore, HttpResponse } from "./HttpStore";

interface HttpProps<T> extends rx.CommonStyledProps<rx.Types.ViewStyle> {
    httpParams?: HttpParams;
    task?: SyncTasks.Promise<BaseJson<T>>;
    onLoading?: () => JSX.Element;
    onSucess: (result: BaseJson<T>) => JSX.Element;
    onSucessFilter?: (result: BaseJson<T>) => boolean; // 根据http 结果判断结果是否有效,有校会调用:onSucess
    onFail?: (err: any) => JSX.Element;
}

export class HttpComponent<T> extends ComponentBase<HttpProps<T>, HttpResponse<T>> {

    private _httpStore: HttpStore<T>;

    protected _buildState(props: HttpProps<T>, initialBuild: boolean): HttpResponse<T> {
        if (!this._httpStore) {
            this._httpStore = new HttpStore();
            window.setTimeout(this.freshData);
        }
        return this._httpStore.getHttpResonse()
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
        return (<EmptyView state='loading' btnPress={this.freshData} />);
    }
    private renderFail = () => {
        if (this.props.onFail) {
            return this.props.onFail(this.state.result);
        }
        return (<EmptyView state='fail' btnPress={this.freshData} />);
    }
    private renderSucess = () => {
        if (!this.props.onSucessFilter) {
            return this.props.onSucess(this.state.result);
        }
        if (!this.props.onSucessFilter(this.state.result)) {
            return this.props.onSucess(this.state.result);
        }
        return (<EmptyView state='fail' btnPress={this.freshData} />);
    }
    freshData = () => {
        if (this.props.httpParams) {
            this._httpStore.exeHttp(this.props.httpParams);
        }
        if (this.props.task) {
            this._httpStore.exeAsync(this.props.task);
        }
    }
}