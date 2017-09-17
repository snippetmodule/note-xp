import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');
import models = require('../modles');
import utils = require('../utils');

import { SimpleItemComp, IArticleItem } from './SimpleItemComp';
import { PicItemComp } from './PicItemComp';
import { VideoItemComp } from './VideoItemComp';

const styles = ReactNative.StyleSheet.create({
    listView: {
        flex: 1,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
});

interface IState {
    list: IArticleItem[];
    refreshResult: fm.component.HttpStore.HttpResponse<models.Json.Article[]>;
    loadMoreResult: fm.component.HttpStore.HttpResponse<models.Json.Article[]>;
}
export class ArticleListComp extends fm.ComponentBase<{}, IState> {
    private mRefreshStore: fm.component.HttpStore.HttpStore<models.Json.Article[]> = new fm.component.HttpStore.HttpStore();
    private mLoadingMoreStore: fm.component.HttpStore.HttpStore<models.Json.Article[]> = new fm.component.HttpStore.HttpStore();

    protected _buildState(props: {}, initialBuild: boolean): IState {
        const newState = {
            ...this.state,
            refreshResult: this.mRefreshStore.getHttpResonse(),
            loadMoreResult: this.mLoadingMoreStore.getHttpResonse(),
        };
        if (!newState.list) {
            newState.list = [];
        }
        // http 成功,且没有处理过
        if (newState.refreshResult.state === 'sucess'
            && newState.refreshResult.state !== this.state.refreshResult.state) {
            newState.list = this.generalList(newState.refreshResult.result.message);
        }
        // loadmore 成功,且没有处理过
        // if (newState.loadMoreResult.state === 'sucess'
        //     && newState.loadMoreResult.state !== this.state.loadMoreResult.state) {
        //     newState.list.push(...this.generalList(newState.loadMoreResult.result.message));
        // }
        newState.loadMoreResult.state = 'loading';
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
        return (
            <ReactNative.FlatList
                data={this.state.list}
                onRefresh={this._onRefresh}
                refreshing={fm.utils.StringUtils.isIn(this.state.refreshResult.state, 'idle', 'loading')}
                onEndReached={this._onEndReached}
                ListFooterComponent={this._footer}
                ListEmptyComponent={this._emptyView}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                onEndReachedThreshold={0.5}
                renderItem={this._renderItem}
            />
        );
    }
    _emptyView = () => {
        if (fm.utils.StringUtils.isIn(this.state.refreshResult.state, 'idle', 'loading')) {
            return null;
        }
        return (
            <fm.component.widget.EmptyView state="fail" btnPress={this._onRefresh} hint="数据为空,请刷新后试试" />
        );
    }
    _footer = () => {
        if (this.state.list.length === 0) {
            return null;
        }
        let tex = '';
        switch (this.state.loadMoreResult.state) {
            case 'sucess':
                tex = 'LoadMore sucess';
                break;
            case 'fail':
                tex = 'LoadMore fail';
                break;
            default:
                tex = 'Loading';
                break;
        }
        return (
            <fm.component.widget.LoadMore state={this.state.loadMoreResult.state}>
                {tex}
            </fm.component.widget.LoadMore>
        );
    }
    _onEndReached = (info: { distanceFromEnd: number }) => {
        if (info.distanceFromEnd < 0) {
            return;
        }
        this._loadMore();
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
    _keyExtractor = (item: IArticleItem, index: number) => {
        return item.data.id + '_index_' + index;
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
    private _renderItem = (info: { item: IArticleItem, index: number }) => {
        fm.utils.Log.i('_renderItem', info.item.data.id + '_index_' + info.index + '_name_' + info.item.data.title);
        switch (info.item.template) {
            case 'simple':
                return (
                    <SimpleItemComp {...info.item} />
                );
            case 'pic':
                return (
                    <PicItemComp {...info.item} />
                );
            case 'video':
                return (
                    <VideoItemComp {...info.item} />
                );
            default:
                return (
                    <SimpleItemComp {...info.item} />
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