import React = require('react');
import ReactNative = require('react-native');

const styles = ReactNative.StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    footerTitle: {
        marginLeft: 10,
        fontSize: 15,
        color: 'gray',
    },
    loadingStatic: {
        height: 32.5,
        width: 32.5,
    },
});
interface IProp {
    state: 'idle' | 'loading' | 'sucess' | 'fail';
}
export = class LoadMore extends React.Component<IProp, null> {
    const _loadingValue = new ReactNative.Animated.Value(0);
    const _loadingAnimStyle = {
        transform: [{
            rotate: this._loadingValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
                extrapolate: 'clamp',
            }),
        }],
    };
    private _loadingAnim = ReactNative.Animated.loop(
        ReactNative.Animated.timing(this._loadingValue, {
            toValue: 1,
            duration: 1500,
            easing: ReactNative.Easing.linear,
        }),
    );
    componentDidMount() {
        if (this.props.state === 'loading' || this.props.state === 'idle') {
            this._loadingAnim.start();
        }
    }
    componentDidUpdate(prevProps: IProp, prevState: any, prevContext: any): void {
        if (this.props.state === 'loading' || this.props.state === 'idle') {
            this._loadingAnim.start();
        }
    }

    render() {
        return (
            <ReactNative.View style={styles.footer}>
                {
                    this.props.state === 'loading' ?
                        (
                            <ReactNative.Animated.Image
                                source={require('../../../../asserts/common/loading.png')} style={[styles.loadingStatic, this._loadingAnimStyle]} />
                        ) : null
                }
                <ReactNative.Text style={styles.footerTitle}>
                    {this.props.children}
                </ReactNative.Text>
            </ReactNative.View>
        );
    }
};
