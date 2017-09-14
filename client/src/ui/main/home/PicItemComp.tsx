import React = require('react');
import ReactNative = require('react-native');

import models = require('../../modles');
import { SimpleItemComp, IArticleItem } from './SimpleItemComp';

export class PicItemComp extends React.Component<IArticleItem, any> {
    render() {
        return (
            <SimpleItemComp {...this.props}>
                <ReactNative.TouchableOpacity onPress={this.props.onPicBtn}>
                    <ReactNative.Image source={{ uri: this.props.data.simpleUrl }} />
                </ReactNative.TouchableOpacity>
            </SimpleItemComp>
        );
    }
}