import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');
import models = require('../modles');
import utils = require('../utils');

import { SimpleItemComp } from './SimpleItemComp';
import { PicItemComp } from './PicItemComp';
import { VideoItemComp } from './VideoItemComp';
import { ArticleListComp } from './ArticleListComp';

const styles = ReactNative.StyleSheet.create({
    listView: {
        flex: 1,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
});
let data: fm.models.BaseJson<models.Json.Article[]> = require('./data');

export class Home extends fm.component.NavComp<{}, null> {
    private _data: models.Json.Article[] = [];
    private _list: ArticleListComp;
    private _httpComp: fm.component.HttpComponent<models.Json.Article[]>;

    private onMenu = () => {
        this.props.navigation.navigate('DrawerToggle');
    }
    private onTitle = () => {
        this._httpComp.freshData();
    }
    private onSearch = () => {

    }
    render() {
        return (
            <fm.component.TitleComponent
                {...this.props}
                onBack={this.onSearch}
                onTitle={this.onTitle}
                onRight={this.onMenu}
                backImg={require('../../../asserts/home/home_search.png')}
                backImageSize={{ width: 22, height: 21 }}
                titleImg={require('../../../asserts/home/logo.png')}
                titleImgSize={{ width: 62, height: 18.5 }}
                rightImg={require('../../../asserts/home/home_menu.png')}
                rightImgSize={{ width: 22, height: 20.5 }}
            >
                <fm.component.HttpComponent ref={this._onRefHttpComp}
                    onFail={this._renderFail}
                    onLoading={this._renderLoading}
                    onSucess={this._renderSucess}
                    onSucessFilter={this._onSucessFilter}
                    httpParams={{
                        url: utils.UrlConst.HomeArticleUrl,
                        emptyUseCache: true,
                    }} />
            </fm.component.TitleComponent>
        );
    }
    private _onRefHttpComp = (ref: fm.component.HttpComponent<models.Json.Article[]>) => {
        this._httpComp = ref;
    }
    private _onRefList = (ref: ArticleListComp) => {
        this._list = ref;
    }
    private _renderFail = (v: any) => {
        return (
            <fm.component.widget.EmptyView state="fail" btnPress={this._httpComp.freshData} />
        );
    }
    private _renderLoading = () => {
        return (
            <ArticleListComp ref={this._onRefList} data={this._data} onRefresh={this._httpComp.freshData} refreshing={true} onEndReached={this._onEndReached} />
        );
    }
    private _renderSucess = (result: fm.models.BaseJson<models.Json.Article[]>) => {
        this._data = result.message;
        return (
            <ArticleListComp ref={this._onRefList} data={this._data} onRefresh={this._httpComp.freshData} refreshing={false} onEndReached={this._onEndReached} />
        );
    }
    private _onSucessFilter = (result: fm.models.BaseJson<models.Json.Article[]>) => {
        return result.message.length === 0;
    }
    private _onEndReached = (info: { distanceFromEnd: number }) => {
        fm.utils.Log.i('_onEndReached', JSON.stringify(info));
    }
}