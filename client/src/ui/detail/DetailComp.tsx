import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');
import models = require('../modles');
import utils = require('../utils');

import PicList = require('./PicList');
import Info = require('./Info');
import VideoComp = require('./VideoComp');

interface IProp {
    article: models.Json.ArticleDetail;
}

export = class DetailComp extends React.Component<IProp, null>{
    render() {
        console.info('DetailComp:' + this.props.article.articleType);
        return (
            <ReactNative.ScrollView>
                {
                    this.props.article.articleType === 3 ?
                        (<VideoComp videoInfo={this.props.article.resourceDetailsList} />) :
                        (<PicList pics={...this.props.article.resourceDetailsList} />)
                }
                <Info article={this.props.article} />
            </ReactNative.ScrollView>
        );
    }
};