import rx = require('reactxp');
import react = require('react');
import { VirtualListViewItemInfo } from 'reactxp-virtuallistview';

import models = require('../../modles');

const styles = {
    root: rx.Styles.createViewStyle({
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowRadius: 3,
        margin: 4.5,
        elevation: 2
    }),
    title: rx.Styles.createTextStyle({
        marginLeft: 5,
        marginTop: 17,
        fontSize: 16,
        color: '#2b2b2b',
    }),
    dividerLine: rx.Styles.createViewStyle({
        height: 1,
        marginTop: 17,
        backgroundColor: '#e9e9e9'
    }),
    bottomLayout: rx.Styles.createViewStyle({
        height: 35,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center'
    }),
    authorImg: rx.Styles.createImageStyle({
        height: 35,
        width: 35,
        marginRight: 5,
        borderRadius: 17,
    }),
    authorName: rx.Styles.createTextStyle({
        color: '#2b2b2b',
        fontSize: 16,
        flex: 1,
    }),
    checkbox: rx.Styles.createButtonStyle({
        padding: 4,
        marginRight: 30,
    }),
    checkboxImg: rx.Styles.createImageStyle({
        height: 25,
        width: 25,
    }),
}
export interface ArticleItem extends VirtualListViewItemInfo {
    isPlaying: boolean; // for VideoItemComp
    onVideoBtn: () => any;
    onPicBtn: () => any;
    onLikeBtn: () => any;
    onCollectionBtn: () => any;
    onShare: () => any;
    data: models.Json.Article;
}

interface Prop extends ArticleItem {
    children?: react.ReactNode;
}
export class SimpleItemComp extends rx.Component<Prop, any>{

    render() {
        return (
            <rx.View style={styles.root}>
                <rx.Text numberOfLines={3} ellipsizeMode='tail' style={styles.title}>
                    {this.props.data.title}
                </rx.Text>
                {this.props.children}
                <rx.View style={styles.dividerLine} />
                <rx.View style={styles.bottomLayout}>
                    <rx.Image source={this.props.data.avatorUrl} style={styles.authorImg}>
                    </rx.Image>
                    <rx.Text numberOfLines={1} ellipsizeMode='tail' style={styles.authorName}>
                        {this.props.data.nikeName}
                    </rx.Text>
                    <rx.Button style={styles.checkbox} onPress={this.props.onLikeBtn}>
                        <rx.Image style={styles.checkboxImg} source={this.props.data.isLike ? 'asserts/home/ic_has_like.png' : 'asserts/home/ic_like.png'}>
                        </rx.Image>
                    </rx.Button>
                    <rx.Button style={styles.checkbox} onPress={this.props.onCollectionBtn}>
                        <rx.Image style={styles.checkboxImg} source={this.props.data.hasCollection ? 'asserts/home/ic_has_collection.png' : 'asserts/home/ic_collection.png'}>
                        </rx.Image>
                    </rx.Button>
                    <rx.Button style={[styles.checkbox, { marginRight: 6 }]} onPress={this.props.onShare}>
                        <rx.Image style={styles.checkboxImg} source='asserts/home/ic_share.png'>
                        </rx.Image>
                    </rx.Button>
                </rx.View>
            </rx.View>
        );
    }
}