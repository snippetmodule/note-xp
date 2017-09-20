import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');
import models = require('../modles');
import utils = require('../utils');

interface IProp {
    pics: models.Json.ArticleResource[];
}

export = class PicList extends React.Component<IProp, null>{
    private _countInLine = 3;

    constructor(props: IProp) {
        super(props);
        if (this.props.pics.length === 1) {
            this._countInLine = 1;
        } else if (this.props.pics.length <= 3) {
            this._countInLine = 2;
        } else if (this.props.pics.length >= 6) {
            this._countInLine = 3;
        }
    }
    render() {
        if (this.props.pics.length === 0) {
            return null;
        }
        let list: models.Json.ArticleResource[] = this.props.pics;
        return (
            <ReactNative.FlatList
                numColumns={this._countInLine}
                data={this.props.pics}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                ItemSeparatorComponent={this._space}
                renderItem={this._renderItem}
            />
        );
    }
    _keyExtractor = (item: models.Json.ArticleResource, index: number) => {
        return item.id + '_index_' + index;
    }
    _space = () => {
        return (
            <ReactNative.View style={{ height: 3, width: 3 }} />
        );
    }
    _renderItem = (info: { item: models.Json.ArticleResource, index: number }) => {
        fm.utils.Log.i('_renderItem', info.item.id + '_index_' + info.index);
        fm.utils.Log.i('_renderItem', info.item.path);
        return (
            <ReactNative.View>
                <ReactNative.Image
                    style={{
                        height: fm.utils.DimenUtils.getWindowSize().width / this._countInLine,
                        width: fm.utils.DimenUtils.getWindowSize().width / this._countInLine,
                    }}
                    resizeMode="cover"
                    source={{ uri: info.item.path }} />
            </ReactNative.View>
        );
    }
};