import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');
import models = require('../modles');
import utils = require('../utils');

interface IProp {
    pics: models.Json.ArticleResource[];
}
export = class PicList extends React.Component<IProp, null>{
    render() {
        if (this.props.pics.length === 0) {
            return null;
        }
        let list: models.Json.ArticleResource[] = this.props.pics;
        return (
            <ReactNative.FlatList
                numColumns={2}
                data={this.props.pics}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
    _keyExtractor = (item: models.Json.ArticleResource, index: number) => {
        return item.id + '_index_' + index;
    }
    _renderItem = (info: { item: models.Json.ArticleResource, index: number }) => {
        fm.utils.Log.i('_renderItem', info.item.id + '_index_' + info.index);
        return (
            <ReactNative.View>
                <ReactNative.Image source={{ uri: info.item.path }} />
            </ReactNative.View>
        );
    }
};