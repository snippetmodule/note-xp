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
        alignItems: 'center',
        height: 56,
        backgroundColor: '#fff',
    },
    backBtn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleTex: {
        fontSize: 17,
        color: '#333333',
    },
    titleImg: {

    },
    rightBtn: {
        width: 56,
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
    backImageSize?: { width: number, height: number };
    title?: string;
    titleImg?: ReactNative.ImageURISource;
    titleImgSize?: { width: number, height: number };
    right?: string;
    rightImg?: ReactNative.ImageURISource;
    rightImgSize?: { width: number, height: number };
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
        let titleBtn = this.renderBtn(this.props.title, this.props.titleImg, this.props.titleImgSize,
            [styles.titleBtn, this.state.right ? {} : { marginRight: 56 }], styles.titleTex, this.props.onTitle);
        let rightBtn = this.renderBtn(this.props.right, this.props.rightImg, this.props.rightImgSize,
            null, null, this.props.onRight);
        let titleLayout = this.state.isShowTitle ? (
            <ReactNative.View style={styles.titleContainer} ref="titleLayout">
                <ReactNative.TouchableOpacity onPress={this._onBack} style={styles.backBtn}>
                    <ReactNative.Image source={this.props.backImg} style={this.props.backImageSize || { height: 17, width: 10.5 }} />
                </ReactNative.TouchableOpacity>
                {titleBtn}
                {rightBtn}
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

    private renderBtn = (title: string, img: ReactNative.ImageURISource, imgSizeStyle: { width: number, height: number },
                         btnstyle: ReactNative.StyleProp<ReactNative.ViewStyle>,
                         titleStyle: ReactNative.StyleProp<ReactNative.TextStyle>, onPress: () => any) => {
        return (
            <ReactNative.TouchableOpacity onPress={onPress} style={btnstyle}>
                {img === null ? null : (<ReactNative.Image source={img} style={imgSizeStyle} />)}
                {title === null ? null : (
                    <ReactNative.Text style={titleStyle}>
                        {title}
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
