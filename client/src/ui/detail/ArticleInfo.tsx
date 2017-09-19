import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');
import models = require('../modles');
import utils = require('../utils');

interface IProp {
    article: models.Json.ArticleDetail;
}
export = class ArticleInfo extends React.Component<IProp, null>{
    render() {
        return (
            <ReactNative.View>
                <ReactNative.Text>
                    {this.props.article.title}
                </ReactNative.Text>
                {this._renderTags(this.props.article.categories)}
                <ReactNative.Text>
                    {this.props.article.content}
                </ReactNative.Text>
                <ReactNative.View>
                    <ReactNative.TouchableHighlight>
                        <ReactNative.Image source={require('')} />
                        <ReactNative.Text>
                            {this.props.article.readNum}
                        </ReactNative.Text>
                    </ReactNative.TouchableHighlight>
                    <ReactNative.TouchableHighlight>
                        <ReactNative.Image source={require('')} />
                    </ReactNative.TouchableHighlight>
                    <ReactNative.TouchableHighlight>
                        <ReactNative.Image source={require('')} />
                    </ReactNative.TouchableHighlight>
                </ReactNative.View>
                <ReactNative.View>
                    <ReactNative.Image source={{ uri: this.props.article.avatorUrl }} />
                    <ReactNative.Text>
                        {this.props.article.bucketName}
                    </ReactNative.Text>
                </ReactNative.View>
                <ReactNative.View />
            </ReactNative.View>
        );
    }
    _renderTags = (tags: string[]) => {
        return (
            <ReactNative.View>
                {tags.map((tag, index) => {
                    return (
                        <ReactNative.Text key={index}>
                            {tag}
                        </ReactNative.Text>
                    );
                })}

            </ReactNative.View>
        );
    }
};