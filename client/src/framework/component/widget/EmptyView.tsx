import rx = require('reactxp');
import { FitImage } from './FitImage';

interface IProp {
    state?: 'idle' | 'loading' | 'sucess' | 'fail';
    pic?: string;
    hint?: string;
    btnStr?: string;
    btnPress?: () => any;
    renderSucess?: () => JSX.Element;
}
const loadingValue = new rx.Animated.Value(0);
const styles = {
    continer: rx.Styles.createViewStyle({
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    loadingStatic: rx.Styles.createImageStyle({
        height: 60,
        width: 60,
    }),
    loadingAnim: rx.Styles.createAnimatedImageStyle({
        transform: [
            {
                rotate: loadingValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                }),
            },
        ],
    }),
    failHint: rx.Styles.createTextStyle({
        marginTop: 17,
    }),
    failBtn: rx.Styles.createButtonStyle({
        marginTop: 44,
        borderColor: '#2c86ff',
        opacity: 0.8,
        borderRadius: 10,
        borderWidth: 1,
        paddingBottom: 6,
        paddingTop: 6,
        paddingLeft: 10,
        paddingRight: 10,
    }),
    failTxt: rx.Styles.createTextStyle({
        fontSize: 12,
        color: '#2c86ff',
    }),
};

export class EmptyView extends rx.Component<IProp, any> {
    private _loadingAnim = rx.Animated.timing(loadingValue, {
        toValue: 1,
        duration: 1500,
        easing: rx.Animated.Easing.Linear(),
        loop: { restartFrom: 0 },
    });
    componentDidUpdate(prevProps: IProp, prevState: any, prevContext: any): void {
        if (this.props.state === 'loading') {
            this._loadingAnim.start();
        }
    }
    render() {
        switch (this.props.state) {
            case 'loading':
            case 'idle':
                return this.renderLoading();
            case 'fail':
                return this.renderLoadFail();
            case 'sucess':
                if (this.props.renderSucess) {
                    return this.props.renderSucess();
                }
                return (
                    <rx.View style={styles.continer}>
                        {this.props.children}
                    </rx.View>
                );
        }
    }
    private renderLoading = () => {
        return (
            <rx.View style={styles.continer}>
                <rx.Animated.Image
                    source={require('../../../../asserts/common/loading.png')} style={[styles.loadingStatic, styles.loadingAnim]} />
            </rx.View>
        );
    }
    private renderLoadFail = () => {
        return (
            <rx.View style={styles.continer}>
                <FitImage source={this.props.pic || require('../../../../asserts/common/empty_img.png')} />
                <rx.Text style={styles.failHint}>
                    {this.props.hint || '喝杯咖啡休息一会吧'}
                </rx.Text>
                {this.rendRefreshBtn()}
            </rx.View>
        );
    }
    private rendRefreshBtn = () => {
        if (!this.props.btnPress) {
            return null;
        }
        return (
            <rx.Button onPress={this.onPressBtn} style={styles.failBtn}>
                <rx.Text style={styles.failTxt}>
                    {this.props.btnStr || '重新加载'}
                </rx.Text>
            </rx.Button>
        );
    }
    private onPressBtn = () => {
        this.setState({ state: 'loading' });
        this.props.btnPress();
    }
}