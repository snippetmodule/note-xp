
import React = require('react');
import ReactNative = require('react-native');
import Navigation = require('react-navigation');
import SyncTasks = require('synctasks');

import fm = require('../../framework');
import models = require('../modles');
import utils = require('../utils');
import DetailComp = require('./DetailComp');

interface IProp {
    id: string;
}

export = class DetailScreen extends fm.component.NavComp<IProp, null>{
    private _httpComp: fm.component.HttpComponent<models.Json.ArticleDetailJson>;

    render() {
        return (
            <fm.component.HttpComponent
                ref={this._onHttpCompRef}
                task={this._fetchArticle}
                onFail={this._onFail}
                onLoading={this._onLoading}
                onSucess={this._onSucess}
            />
        );
    }
    _fetchArticle = () => {
        return fm.utils.RestUtils.request<models.Json.ArticleDetailJson>({
            url: utils.UrlConst.DetailArticleUrl + this.props.navigation.state.params.id,
        });
    }
    _onHttpCompRef = (ref: any) => {
        this._httpComp = ref;
    }
    _onFail = (err: any) => {
        return (
            <fm.component.TitleComponent {...this.props}>
                <fm.component.widget.EmptyView state="fail" btnPress={this._httpComp.freshData} />
            </fm.component.TitleComponent>
        );
    }
    _onLoading = () => {
        return (
            <fm.component.TitleComponent {...this.props}>
                <fm.component.widget.EmptyView state="loading" btnPress={this._httpComp.freshData} />
            </fm.component.TitleComponent>
        );
    }
    _onSucess = (result: models.Json.ArticleDetailJson) => {
        if (result.code === 403) {
            return (
                <fm.component.TitleComponent {...this.props}>
                    <fm.component.widget.EmptyView state="fail" hint="此文章并未公开" btnStr="点击返回" btnPress={this.goBack} />
                </fm.component.TitleComponent>
            );
        }
        if (result.message.length === 0) {
            return (
                <fm.component.TitleComponent {...this.props}>
                    <fm.component.widget.EmptyView state="fail" btnPress={this._httpComp.freshData} />
                </fm.component.TitleComponent>
            );
        }
        let detail: models.Json.ArticleDetail = result.message[0];
        return (
            <fm.component.TitleComponent {...this.props}
                title={detail.nikeName}
                titleImg={{ uri: detail.avatorUrl }}
                titleImgSize={{ width: 30, height: 30, borderRadius: 15, marginRight: 5 }}
            >
                <DetailComp article={detail} />
            </fm.component.TitleComponent >
        );
    }
};