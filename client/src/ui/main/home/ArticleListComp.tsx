import rx = require('reactxp');
import fm = require('../../../framework');
import models = require('../../modles');
import utils = require('../../utils');

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
interface IProp {
    data: models.Json.Article[];
}
export class ArticleListComp extends rx.Component<IProp, IState> {

    constructor(props: IProp, context?: any) {
        super(props, context);
        this.state = {
            list: this.generalList(this.props.data),
        };
        // this.refreshList(this.props.data);
    }

    render() {
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