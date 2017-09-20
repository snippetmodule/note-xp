import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');
import models = require('../modles');
import utils = require('../utils');
const styles = ReactNative.StyleSheet.create({
    thum: {
        height: 189,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
// 189
interface IProp {
    videoInfo: models.Json.ArticleResource[];
}
export = class VideoComp extends React.Component<IProp, null>{
    render() {
        return (
            <ReactNative.Image
                style={styles.thum}
                source={{ uri: this.props.videoInfo[0].resizePath }}
                progressiveRenderingEnabled={true}
                resizeMode="cover" />
        );
    }
};