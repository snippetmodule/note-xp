import React = require('react');
import ReactNative = require('react-native');

import { FitImage } from './FitImage';

interface IProp {
    state?: 'loading' | 'sucess' | 'fail';
    pic?: string;
    hint?: string;
    btnStr?: string;
    btnPress?: () => any;
}
const loadingValue = new ReactNative.Animated.Value(0);
const loadingAnim = {
    transform: [{
        rotate: loadingValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
            extrapolate: 'clamp',
        }),
    }],
};
const styles = ReactNative.StyleSheet.create({
    continer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30,
    },
    loadingStatic: {
        height: 32.5,
        width: 32.5,
    },
    failHint: {
        marginTop: 17,
    },
    failBtn: {
        marginTop: 44,
        borderColor: '#2c86ff',
        opacity: 0.8,
        borderRadius: 10,
        borderWidth: 1,
        paddingBottom: 6,
        paddingTop: 6,
        paddingLeft: 10,
        paddingRight: 10,
    },
    failTxt: {
        fontSize: 12,
        color: '#2c86ff',
    },
});

export class EmptyView extends React.Component<IProp, any> {
    private _loadingAnim = ReactNative.Animated.timing(loadingValue, {
        toValue: 1,
        duration: 1500,
        easing: ReactNative.Easing.linear,
    });
    componentDidUpdate(prevProps: IProp, prevState: any, prevContext: any): void {
        if (this.props.state === 'loading') {
            this._loadingAnim.start();
        }
    }
    render() {
        switch (this.props.state) {
            case 'loading':
                return this.renderLoading();
            case 'fail':
                return this.renderLoadFail();
            case 'sucess':
                return null;
        }
    }
    private renderLoading = () => {
        return (
            <ReactNative.View style={styles.continer}>
                <ReactNative.Animated.Image
                    source={require('../../../../asserts/common/loading.png')} style={[styles.loadingStatic, loadingAnim]} />
            </ReactNative.View>
        );
    }
    private renderLoadFail = () => {
        return (
            <ReactNative.View style={styles.continer}>
                <ReactNative.Image source={this.props.pic || require('../../../../asserts/common/empty_img.png')} style={{height: 75.5, width: 67.5}}/>
                <ReactNative.Text style={styles.failHint}>
                    {this.props.hint || '喝杯咖啡休息一会吧'}
                </ReactNative.Text>
                {this.rendRefreshBtn()}
            </ReactNative.View>
        );
    }
    private rendRefreshBtn = () => {
        if (!this.props.btnPress) {
            return null;
        }
        return (
            <ReactNative.TouchableOpacity onPress={this.onPressBtn} style={styles.failBtn}>
                <ReactNative.Text style={styles.failTxt}>
                    {this.props.btnStr || '重新加载'}
                </ReactNative.Text>
            </ReactNative.TouchableOpacity>
        );
    }
    private onPressBtn = () => {
        this.setState({ state: 'loading' });
        this.props.btnPress();
    }
}