import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');
import models = require('../modles');
import utils = require('../utils');

import PicList = require('./PicList');
import Info = require('./Info');

interface IProp {
    article: models.Json.ArticleDetail;
}

export = class DetailComp extends React.Component<IProp, null>{
    render() {
        return (
            <ReactNative.View>
                <PicList pics={...this.props.article.resourceDetailsList} />
                <Info article={this.props.article} />
            </ReactNative.View>
        );
    }
};