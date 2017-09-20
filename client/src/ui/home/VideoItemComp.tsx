import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');
import models = require('../modles');

import { SimpleItemComp, IArticleItem } from './SimpleItemComp';

const styles = ReactNative.StyleSheet.create({
    view: {
        height: 189,
        marginTop: 17,
    },
    content: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
    },
    thum: {
        height: 189,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

enum PlayerState {
    idle, playing, pause, error,
}
export class VideoItemComp extends React.Component<IArticleItem, null> {

    private _playerState: PlayerState = PlayerState.idle;
    // componentWillReceiveProps(nextProps: ArticleItem, nextContext: any): void {
    //     fm.utils.Log.i('VideoItemComp', 'componentWillReceiveProps');
    // }
    // shouldComponentUpdate(nextProps: ArticleItem, nextState: null, nextContext: any): boolean {
    //     fm.utils.Log.i('VideoItemComp', 'shouldComponentUpdate');
    //     return true;
    // }
    componentDidUpdate(prevProps: IArticleItem, prevState: null, prevContext: any): void {
        fm.utils.Log.i('VideoItemComp', 'componentDidUpdate');
        // if (!this.props.isPlaying) {
        //     let video = this.refs['video'] as Video;
        //     this._playerState = PlayerState.pause;
        //     video.pause();
        // }
    }

    render() {
        return (
            <SimpleItemComp {...this.props}>
                <ReactNative.TouchableWithoutFeedback onPress={this.props.onPicBtn}>
                    <ReactNative.Image source={{ uri: this.props.data.simpleUrl }} style={[styles.thum]}>
                        <ReactNative.Image source={require('../../../asserts/home/ic_like.png')} />
                    </ReactNative.Image>
                    {/* <ReactNative.Video ref="video"
                        style={styles.content}
                        source={this.props.data.videoUrl}
                        resizeMode="contain" /> */}
                </ReactNative.TouchableWithoutFeedback>
            </SimpleItemComp>
        );
    }
    private _onPlay = () => {
        // let video = this.refs['video'] as Video;
        // switch (this._playerState) {
        //     case PlayerState.playing:
        //         this._playerState = PlayerState.pause;
        //         video.pause();
        //         break;
        //     default:
        //         this._playerState = PlayerState.playing;
        //         this.props.onVideoBtn();
        //         video.play();
        //         break;
        // }
    }
}