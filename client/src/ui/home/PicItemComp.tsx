import React = require('react');
import ReactNative = require('react-native');

import models = require('../modles');
import { SimpleItemComp, IArticleItem } from './SimpleItemComp';

export class PicItemComp extends React.Component<IArticleItem, any> {
    render() {
        return (
            <SimpleItemComp {...this.props}>
                <ReactNative.TouchableWithoutFeedback onPress={this.props.onPicBtn}>
                    <ReactNative.Image  source={{ uri: this.props.data.simpleUrl }} style={{ height: 189 }} />
                </ReactNative.TouchableWithoutFeedback>
            </SimpleItemComp>
        );
    }
}