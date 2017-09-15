import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../../framework');
import models = require('../../modles');
import utils = require('../../utils');

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
    private onMenu = () => {
        this.props.navigation.navigate('DrawerToggle');
    }
    private onTitle = () => {
        (this.refs['httpComp'] as fm.component.HttpComponent<models.Json.Article[]>).freshData();
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
                backImg={require('../../../../asserts/home/home_search.png')}
                backImageSize={{ width: 22, height: 21 }}
                titleImg={require('../../../../asserts/home/logo.png')}
                titleImgSize={{ width: 62, height: 18.5 }}
                rightImg={require('../../../../asserts/home/home_menu.png')}
                rightImgSize={{ width: 22, height: 20.5 }}
            >
                <fm.component.HttpComponent ref="httpComp"
                    onFail={this._renderFail}
                    onSucess={this._renderSucess}
                    onSucessFilter={this._onSucessFilter}
                    httpParams={{
                        url: utils.UrlConst.HomeArticleUrl,
                        emptyUseCache: true,
                    }} />
            </fm.component.TitleComponent>
        );
    }
    private _renderFail = (v: any) => {
        return (
            <ArticleListComp data={data.message} />
        );
    }

    private _renderSucess = (result: fm.models.BaseJson<models.Json.Article[]>) => {
        return (
            <ArticleListComp data={result.message} />
        );
    }
    private _onSucessFilter = (result: fm.models.BaseJson<models.Json.Article[]>) => {
        return result.message.length === 0;
    }
}