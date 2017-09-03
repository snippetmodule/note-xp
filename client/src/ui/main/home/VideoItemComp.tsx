import rx = require('reactxp');
import Video from 'reactxp-video';

import fm = require('../../../framework');
import models = require('../../modles');

import { SimpleItemComp, ArticleItem } from './SimpleItemComp';

const styles = {
    view: rx.Styles.createImageStyle({
        height: 189,
        marginTop: 17,
    }),
    content: rx.Styles.createViewStyle({
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0
    }),
}

enum PlayerState {
    idle, playing, pause, error
}
export class VideoItemComp extends rx.Component<ArticleItem, null>{

    private _playerState: PlayerState = PlayerState.idle;
    // componentWillReceiveProps(nextProps: ArticleItem, nextContext: any): void {
    //     fm.utils.Log.i('VideoItemComp', 'componentWillReceiveProps');
    // }
    // shouldComponentUpdate(nextProps: ArticleItem, nextState: null, nextContext: any): boolean {
    //     fm.utils.Log.i('VideoItemComp', 'shouldComponentUpdate');
    //     return true;
    // }
    componentDidUpdate(prevProps: ArticleItem, prevState: null, prevContext: any): void {
        fm.utils.Log.i('VideoItemComp', 'componentDidUpdate');
        if (!this.props.isPlaying) {
            let video = this.refs['video'] as Video;
            this._playerState = PlayerState.pause;
            video.pause();
        }
    }

    render() {
        return (
            <SimpleItemComp {...this.props}>
                <rx.View style={styles.view} onPress={this._onPlay}>
                    <rx.Image source={this.props.data.simpleUrl} style={styles.content} resizeMode='contain' />
                    <Video ref='video'
                        style={styles.content}
                        source={this.props.data.videoUrl}
                        resizeMode='contain' />
                </rx.View>
            </SimpleItemComp>
        );
    }
    private _onPlay = () => {
        let video = this.refs['video'] as Video;
        switch (this._playerState) {
            case PlayerState.playing:
                this._playerState = PlayerState.pause;
                video.pause();
                break;
            default:
                this._playerState = PlayerState.playing;
                this.props.onVideoBtn();
                video.play();
                break
        }
    }
}