import rx = require('reactxp');
import fm = require('../../../framework');
import models = require('../../modles');
import utils = require('../../utils');

import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview';

import { SimpleItemComp } from './SimpleItemComp';
import { PicItemComp } from './PicItemComp';
import { VideoItemComp } from './VideoItemComp';

const styles = {
    listView: rx.Styles.createViewStyle({
        flex: 1,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5
    }),
};
let data: fm.models.BaseJson<models.Json.Article[]> = require('./data.json');

interface ArticleItem extends VirtualListViewItemInfo {
    data: models.Json.Article;
}
export class Home extends rx.Component<{}, any>{
    private onMenu = () => {

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
                <fm.component.HttpComponent
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
            <VirtualListView style={styles.listView}
                padding={5}
                itemList={data.message.map((item, index) => {
                    return {
                        key: v.id + '__' + index,
                        height: 100,
                        measureHeight:true,
                        template: this._getItemTemplate(item),
                        data: item,
                    }
                })}
                renderItem={this._renderItem}
                animateChanges={true}
                
                logInfo={log => fm.utils.Log.i('VirtualListView', log)}
                skipRenderIfItemUnchanged={true}
            />
        );
    }
    private _getItemTemplate = (article: models.Json.Article) => {
        switch (article.articleType) {
            case 1:
                return 'pic';
            case 3:
                return 'video'
            default:
                return 'simple';
        }
    }
    private _renderSucess = (result: fm.models.BaseJson<models.Json.Article[]>) => {
        return (
            <rx.Text>
                sucess
            </rx.Text>
        );
    }
    private _renderItem = (item: ArticleItem, hasFocus?: boolean) => {
        fm.utils.Log.i('_renderItem', item.template);
        switch (item.template) {
            case 'simple':
                return (
                    <SimpleItemComp {...item.data} />
                );
            case 'pic':
                return (
                    <PicItemComp {...item.data} />
                );
            case 'video':
                return (
                    <VideoItemComp {...item.data} />
                );
            default:
                return (
                    <SimpleItemComp {...item.data} />
                );
        }
    }
}