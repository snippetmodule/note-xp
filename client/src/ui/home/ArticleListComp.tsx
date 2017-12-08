import rx = require('reactxp');
import fm = require('../../framework');
import models = require('../modles');
import utils = require('../utils');

import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview';

import { SimpleItemComp, IArticleItem } from './SimpleItemComp';
import { PicItemComp } from './PicItemComp';
import { VideoItemComp } from './VideoItemComp';

const styles = {
    listView: rx.Styles.createViewStyle({
        flex: 1,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
    }),
};

interface IState {
    list: IArticleItem[];
}
export interface IArticleItem extends VirtualListViewItemInfo {
    isPlaying: boolean; // for VideoItemComp
    onVideoBtn: () => any;
    onPicBtn: () => any;
    onLikeBtn: () => any;
    onCollectionBtn: () => any;
    onShare: () => any;
    data: models.Json.Article;
}

interface IState {
    list: IArticleItem[];
    refreshResult: fm.component.AsyncStore.AsyncResponse<models.Json.ArticleListJson>;
    loadMoreResult: fm.component.AsyncStore.AsyncResponse<models.Json.ArticleListJson>;
}
export class ArticleListComp extends fm.component.ComponentBase<{}, IState> {
    private mRefreshStore: fm.component.AsyncStore.AsyncStore<models.Json.ArticleListJson> = new fm.component.AsyncStore.AsyncStore();
    private mLoadingMoreStore: fm.component.AsyncStore.AsyncStore<models.Json.ArticleListJson> = new fm.component.AsyncStore.AsyncStore();

    protected _buildState(props: {}, initialBuild: boolean): IState {
        const newState = {
            ...this.state,
            refreshResult: this.mRefreshStore.getResonse(),
            loadMoreResult: this.mLoadingMoreStore.getResonse(),
        };
        if (!newState.list) {
            newState.list = [];
        }
        // refresh 成功,且没有处理过
        if (newState.refreshResult.state === 'sucess'
            && newState.refreshResult.state !== this.state.refreshResult.state) {
            newState.list = this.generalList(newState.refreshResult.result.message);
        }
        // loadmore; 成功,且没有处理过;
        if (newState.loadMoreResult.state === 'sucess'
            && newState.loadMoreResult.state !== this.state.loadMoreResult.state) {
            newState.list.push(...this.generalList(newState.loadMoreResult.result.message));
        }
        // newState.loadMoreResult.state = 'loading';
        return newState;
    }
    componentDidMount() {
        super.componentDidMount();
        this._onRefresh();
    }
    render() {
        if (this.state.refreshResult.state === 'fail') {
            return (
                <fm.component.widget.EmptyView state="fail" btnPress={this._onRefresh} />
            );
        }
        if (fm.utils.StringUtils.isIn(this.state.refreshResult.state, 'idle', 'loading')) {
            return (
                <fm.component.widget.EmptyView state="loading" btnPress={this._onRefresh} />
            );
        }
        return (
            <VirtualListView style={styles.listView}
                padding={5}
                itemList={this.state ? this.state.list : []}
                renderItem={this._renderItem}
                animateChanges={true}
                logInfo={log => null}
                skipRenderIfItemUnchanged={true}
            />
        );
    }
    _loadMore = () => {
        this.mLoadingMoreStore.exeHttp({
            url: utils.UrlConst.HomeArticleUrl + '?loadmore',
        });
    }
    _onRefresh = () => {
        fm.utils.Log.i('_onRefresh', '');
        this.mRefreshStore.exeHttp({
            url: utils.UrlConst.HomeArticleUrl,
            emptyUseCache: true,
        });
    }
    private generalList = (data: models.Json.Article[]) => {
        return data.map((item, index) => {
            return {
                key: item.id + '__' + index,
                height: 100,
                measureHeight: true,
                template: this._getItemTemplate(item),
                data: item,
                isPlaying: this._videoPlayingIndex === index,
                onVideoBtn: () => this._onPlayVideo(index),
                onPicBtn: () => { },
                onLikeBtn: () => { },
                onCollectionBtn: () => { },
                onShare: () => { },
            };
        });
    }
    refreshList = (data: models.Json.Article[]) => {
        let list: IArticleItem[] = this.generalList(data);
        this.setState({ list });
    }
    private _getItemTemplate = (article: models.Json.Article) => {
        switch (article.articleType) {
            case 1:
                return 'pic';
            case 3:
                return 'video';
            default:
                return 'simple';
        }
    }
    private _renderItem = (item: IArticleItem, hasFocus?: boolean) => {
        fm.utils.Log.i('_renderItem', item.template);
        switch (item.template) {
            case 'simple':
                return (
                    <SimpleItemComp {...item} />
                );
            case 'pic':
                return (
                    <PicItemComp {...item} />
                );
            case 'video':
                return (
                    <VideoItemComp {...item} />
                );
            default:
                return (
                    <SimpleItemComp {...item} />
                );
        }
    }

    private _videoPlayingIndex = -1;
    private _onPlayVideo(index: number) {
        this._videoPlayingIndex = index;
        let list: IArticleItem[] = this.state.list.map((item, index) => {
            return {
                ...item,
                isPlaying: this._videoPlayingIndex === index,
            };
        });
        this.setState({ list });
    }
}