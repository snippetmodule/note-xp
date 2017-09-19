import React = require('react');
import ReactNative = require('react-native');
import Navigation = require('react-navigation');
import * as Widget from './widget';

const styles = ReactNative.StyleSheet.create({
    root: {
        flexDirection: 'column',
        alignItems: 'stretch',
        flex: 1,
        alignSelf: 'stretch',
    },
    container: {
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#f5fcff',
        alignSelf: 'stretch',
        flex: 1,
    },
    titleContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'stretch',
        height: 56,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    backBtn: {
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backImg: {
        height: 17,
        width: 10.5,
    },
    titleBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleTex: {
        fontSize: 17,
        color: '#333333',
        textAlign: 'center',
    },
    titleImg: {
        alignItems: 'center',
    },
    rightBtn: {
        width: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    righteImg: {
        alignItems: 'center',
    },
    dividerLine: {
        height: 0.5,
        backgroundColor: '#d0d0d0',
    },
});

interface IProp extends ReactNative.ViewProperties {
    navigation: Navigation.NavigationScreenProp<Navigation.NavigationRoute<any>, Navigation.NavigationAction>;
    isShowTitle?: boolean;
    backImg?: ReactNative.ImageURISource;
    backImageSize?: ReactNative.ImageStyle;
    title?: string;
    titleImg?: ReactNative.ImageURISource;
    titleImgSize?: ReactNative.ImageStyle;
    right?: string;
    rightImg?: ReactNative.ImageURISource;
    rightImgSize?: ReactNative.ImageStyle;
    rightStyle?: any;
    onBack?: () => void;
    onTitle?: () => void;
    onRight?: () => void;
}
interface IState {
    isShowTitle: boolean;
    dividerLine: boolean;
    right: boolean;
}
class TitleComponent extends React.Component<IProp, IState> {
    public static defaultProps: IProp = {
        navigation: null,
        isShowTitle: true,
        backImg: require('../../../asserts/common/back.png'),
        onTitle: () => { },
        onRight: () => { },
    };
    constructor(prop: IProp, state: IState) {
        super(prop, state);
        this.state = { isShowTitle: this.props.isShowTitle, dividerLine: true, right: false };
    }
    render() {
        let titleLayout = this.state.isShowTitle ? (
            <ReactNative.View style={styles.titleContainer} ref="titleLayout">
                {/* back btn */}
                <ReactNative.TouchableOpacity onPress={this._onBack} style={styles.backBtn}>
                    <ReactNative.Image source={this.props.backImg} style={[{ height: 17, width: 10.5 }, this.props.backImageSize]} />
                </ReactNative.TouchableOpacity>
                {/* title */}
                {this.renderBtn(this.props.titleImg, [styles.titleImg, this.props.titleImgSize], this.props.title,
                    styles.titleTex, [styles.titleBtn], this.props.onTitle)}
                {/* right btn */}
                {this.renderBtn(this.props.rightImg, [styles.righteImg, this.props.rightImgSize], this.props.right,
                    null, styles.rightBtn, this.props.onRight)}
            </ReactNative.View>
        ) : null;
        return (
            <ReactNative.View style={styles.root}>
                {titleLayout}
                {this.state.dividerLine ? <ReactNative.View style={styles.dividerLine} ref="dividerLine" /> : null}
                <ReactNative.View style={[styles.container]} >
                    {this.props.children}
                </ReactNative.View>
                <Widget.ToastView />
            </ReactNative.View>
        );
    }

    private renderBtn = (
        img: ReactNative.ImageURISource,
        imgStyle: ReactNative.StyleProp<ReactNative.ImageStyle>,
        tex: string,
        texStyle: ReactNative.StyleProp<ReactNative.TextStyle>,
        btnstyle: ReactNative.StyleProp<ReactNative.ViewStyle>,
        onPress: () => any) => {
        return (
            <ReactNative.TouchableOpacity onPress={onPress} style={btnstyle}>
                {img === null ? null : (<ReactNative.Image source={img} style={imgStyle} />)}
                {tex === null ? null : (
                    <ReactNative.Text style={texStyle}>
                        {tex}
                    </ReactNative.Text>
                )}
            </ReactNative.TouchableOpacity>
        );
    }

    _onBack = () => {
        if (this.props.onBack) {
            this.props.onBack();
            return;
        }
        this.props.navigation.goBack();
    }
}
export = TitleComponent;
