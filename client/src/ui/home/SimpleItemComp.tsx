import React = require('react');
import ReactNative = require('react-native');

import models = require('../modles');

const styles = ReactNative.StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowRadius: 3,
        margin: 4.5,
        elevation: 2,
    },
    title: {
        marginLeft: 5,
        marginTop: 17,
        fontSize: 16,
        color: '#2b2b2b',
    },
    dividerLine: {
        height: 1,
        marginTop: 17,
        backgroundColor: '#e9e9e9',
    },
    bottomLayout: {
        height: 35,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorImg: {
        height: 35,
        width: 35,
        marginRight: 5,
        borderRadius: 17,
    },
    authorName: {
        color: '#2b2b2b',
        fontSize: 16,
        flex: 1,
    },
    checkbox: {
        padding: 4,
        marginRight: 30,
    },
    checkboxImg: {
        height: 25,
        width: 25,
    },
});
export interface IArticleItem {
    isPlaying: boolean; // for VideoItemComp
    onVideoBtn: () => any;
    onPicBtn: () => any;
    onLikeBtn: () => any;
    onCollectionBtn: () => any;
    onShare: () => any;
    template: string;
    data: models.Json.Article;
}

interface IProp extends IArticleItem {
    children?: React.ReactNode;
}
export class SimpleItemComp extends React.Component<IProp, any> {

    render() {
        return (
            <ReactNative.View style={styles.root}>
                <ReactNative.Text numberOfLines={3} ellipsizeMode="tail" style={styles.title}>
                    {this.props.data.title}
                </ReactNative.Text>
                {this.props.children}
                <ReactNative.View style={styles.dividerLine} />
                <ReactNative.View style={styles.bottomLayout} >
                    <ReactNative.Image source={{ uri: this.props.data.avatorUrl }} style={styles.authorImg} />
                    <ReactNative.Text numberOfLines={1} ellipsizeMode="tail" style={styles.authorName}>
                        {this.props.data.nikeName}
                    </ReactNative.Text>
                    <ReactNative.TouchableOpacity style={styles.checkbox} onPress={this.props.onLikeBtn}>
                        <ReactNative.Image style={styles.checkboxImg}
                            source={this.props.data.isLike ? require('../../../asserts/home/ic_has_like.png') : require('../../../asserts/home/ic_like.png')} />
                    </ReactNative.TouchableOpacity>
                    <ReactNative.TouchableOpacity style={styles.checkbox} onPress={this.props.onCollectionBtn}>
                        <ReactNative.Image style={styles.checkboxImg}
                            source={this.props.data.hasCollection ? require('../../../asserts/home/ic_has_collection.png') : require('../../../asserts/home/ic_collection.png')} />
                    </ReactNative.TouchableOpacity>
                    <ReactNative.TouchableOpacity style={[styles.checkbox, { marginRight: 6 }]} onPress={this.props.onShare}>
                        <ReactNative.Image style={styles.checkboxImg}
                            source={require('../../../asserts/home/ic_share.png')} />
                    </ReactNative.TouchableOpacity>
                </ReactNative.View>
            </ReactNative.View>
        );
    }
}