import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');
import models = require('../modles');
import utils = require('../utils');

interface IProp {
    article: models.Json.ArticleDetail;
}
const styles = ReactNative.StyleSheet.create({
    titleTex: {
        fontSize: 18,
        color: '#2b2b2b',
        paddingTop: 15,
        paddingLeft: 14,
        paddingRight: 14,
        paddingBottom: 5,
    },
    tags: {
        paddingTop: 4,
        paddingBottom: 6,
        paddingLeft: 14,
        paddingRight: 14,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    tag: {
        fontSize: 13,
        color: '#575757',
    },
    contentTex: {
        fontSize: 15,
        color: '#2b2b2b',
        marginTop: 10,
        paddingTop: 3,
        paddingBottom: 5,
        paddingLeft: 14,
        paddingRight: 14,
    },
    btnLaout: {
        flexDirection: 'row',
        paddingLeft: 14,
    },
    btn: {
        paddingRight: 16,
        paddingBottom: 16,
        paddingTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnImg: {
        height: 25,
        width: 25,
        marginRight: 10,
    },
    btnTxt: {
        color: '#d9d9d9',
        fontSize: 11,
    },
    createTimeTxt: {
        marginRight: 20,
        paddingTop: 16,
        paddingBottom: 16,
        fontSize: 12,
        color: '#d9d9d9',
    },
    autorLayout: {
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorPic: {
        width: 47,
        height: 47,
        borderRadius: 26,
        marginRight: 9,
    },
    authorTagPic: {
        width: 14.5,
        height: 14.5,
        borderRadius: 7,
        marginLeft: -22,
        alignSelf: 'flex-end',
    },
    authorName: {
        marginLeft: 22 - 9,
        color: '#333333',
        fontSize: 14,
    },
    devideLine: {
        height: 0.5,
        backgroundColor: '#dedede',
    },
});
export = class Info extends React.Component<IProp, null>{
    render() {
        let like = this.props.article.isLike ? require('../../../asserts/home/ic_has_like.png') : require('../../../asserts/home/ic_like.png');
        let collection = this.props.article.hasCollection ? require('../../../asserts/home/ic_has_collection.png') : require('../../../asserts/home/ic_collection.png');
        let readNum = ' 22' + this.props.article.readNum;
        return (
            <ReactNative.View>
                {this._renderText(this.props.article.title, styles.titleTex)}
                {this._renderTags(this.props.article.categories)}
                {this._renderText(this.props.article.content, styles.contentTex)}

                <ReactNative.View style={styles.btnLaout}>
                    <ReactNative.TouchableOpacity style={styles.btn}>
                        <ReactNative.Image style={styles.btnImg} source={like} />
                        <ReactNative.Text>
                            {`${this.props.article.likeNum}赞`}
                        </ReactNative.Text>
                    </ReactNative.TouchableOpacity>
                    <ReactNative.TouchableOpacity style={[styles.btn, { paddingLeft: 11, paddingRight: 11 }]}>
                        <ReactNative.Image style={styles.btnImg} source={collection} />
                    </ReactNative.TouchableOpacity>
                    <ReactNative.TouchableOpacity style={[styles.btn, { paddingLeft: 28, paddingRight: 28 }]}>
                        <ReactNative.Image style={styles.btnImg} source={require('../../../asserts/home/ic_reward.png')} />
                    </ReactNative.TouchableOpacity>
                    <ReactNative.Text style={styles.createTimeTxt}>
                        {`${this.props.article.createTime} ${this.props.article.readNum}浏览`}
                    </ReactNative.Text>
                </ReactNative.View>
                <ReactNative.View style={styles.autorLayout}>
                    <ReactNative.Image style={styles.authorPic} source={{ uri: this.props.article.avatorUrl }} />
                    {
                        this.props.article.isLike ?
                            (
                                <ReactNative.Image style={styles.authorTagPic} source={require('../../../asserts/home/author_tag_v.png')} />
                            ) : null
                    }
                    <ReactNative.Text style={styles.authorName}>
                        {this.props.article.bucketName}
                    </ReactNative.Text>
                </ReactNative.View>
                <ReactNative.View style={styles.devideLine} />

                <ReactNative.View />
            </ReactNative.View>
        );
    }
    _renderText = (tex: string, textStyle: ReactNative.TextStyle) => {
        if (!tex) {
            return null;
        }
        return (
            <ReactNative.Text style={textStyle}>
                {tex}
            </ReactNative.Text>
        );
    }
    _renderTags = (tags: string[]) => {
        return (
            <ReactNative.View style={styles.tags}>
                {tags.map((tag, index) => {
                    return (
                        <ReactNative.Text key={index} style={styles.tag}>
                            {index === tags.length - 1 ? ` #${tag}   ` : ` #${tag}    /`}
                        </ReactNative.Text>
                    );
                })}
            </ReactNative.View>
        );
    }
};