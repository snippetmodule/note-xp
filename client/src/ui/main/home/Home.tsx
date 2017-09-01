import rx = require('reactxp');
import fm = require('../../../framework');
import models = require('../../modles');
import utils = require('../../utils');

import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview';

import { SimpleItemComp, ArticleItem } from './SimpleItemComp';
import { PicItemComp } from './PicItemComp';
import { VideoItemComp } from './VideoItemComp';
import { ArticleListComp } from './ArticleListComp';

const styles = {
    listView: rx.Styles.createViewStyle({
        flex: 1,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5
    }),
};
let data: fm.models.BaseJson<models.Json.Article[]> = require('./data');

export class Home extends rx.Component<{}, any>{
    private _list: ArticleItem[];

    private onMenu = () => {
        (this.refs['httpComp'] as fm.component.HttpComponent<models.Json.Article[]>).freshData();
    }
    private onTitle = () => {

    }
    private onSearch = () => {

    }
    render() {
        return (
            <fm.component.TitleComponent
                onBack={this.onSearch}
                onTitle={this.onTitle}
                onRight={this.onMenu}
                backImg='asserts/home/home_search.png'
                titleImg='asserts/home/logo.png'
                rightImg='asserts/home/home_menu.png'
            >
                <fm.component.HttpComponent ref='httpComp'
                    onSucess={this._renderSucess}
                    onFail={this._renderFail}
                    httpParams={{
                        url: utils.UrlConst.HomeArticleUrl,
                        emptyUseCache: true
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
            <rx.Text>
                sucess
            </rx.Text>
        );
    }
}