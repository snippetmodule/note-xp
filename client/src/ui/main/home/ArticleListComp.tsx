import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../../framework');
import models = require('../../modles');
import utils = require('../../utils');

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
}

interface IProp {
    data: models.Json.Article[];
}
export class ArticleListComp extends React.Component<IProp, IState> {

    constructor(props: IProp, context?: any) {
        super(props, context);
        this.state = {
            list: this.generalList(this.props.data),
        };
        // this.refreshList(this.props.data);
    }

    render() {
        return (
            <ReactNative.FlatList
                data={this.state.list}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
    _keyExtractor = (item: IArticleItem, index: number) => {
        return item.data.id;
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
    private _renderItem = (info: { item: IArticleItem, index: number }) => {
        fm.utils.Log.i('_renderItem', info.item.data.id);
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