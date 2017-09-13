import React = require('react');
import ReactNative = require('react-native');

import NavUtils = require('../utils/NavUtils');
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

interface Prop extends ReactNative.ViewProperties {
    isShowTitle?: boolean;
    backImg?: string;
    title?: string;
    titleImg?: string;
    right?: string;
    rightImg?: string;
    rightStyle?: any;
    onBack?: () => void;
    onTitle?: () => void;
    onRight?: () => void;
}
interface State {
    isShowTitle: boolean;
    dividerLine: boolean;
    right: boolean;
}
class TitleComponent extends React.Component<Prop, State>{
    public static defaultProps: Prop = {
        isShowTitle: true,
        backImg: require('../../../asserts/common/back.png'),
        onBack: () => NavUtils.nav.goBack(),
        onTitle: () => { },
        onRight: () => { },
    };
    constructor(prop: Prop, state: State) {
        super(prop, state);
        this.state = { isShowTitle: this.props.isShowTitle, dividerLine: true, right: false };
        this.setState = this.setState.bind(this);
    }
    render() {
        let titleBtn = this.renderBtn(this.props.title, this.props.titleImg, [styles.titleBtn, this.state.right ? {} : { marginRight: 56 }], styles.titleTex, this.props.onTitle);
        let rightBtn = this.renderBtn(this.props.right, this.props.rightImg, null, null, this.props.onRight);
        let titleLayout = this.state.isShowTitle ? (
            <ReactNative.View style={styles.titleContainer} ref="titleLayout">
                <ReactNative.TouchableOpacity onPress={this.props.onBack} style={styles.backBtn}>
                    <Widget.FitImage source={this.props.backImg} />
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
    private renderBtn = (title: string, img: string, btnstyle: ReactNative.StyleProp<ReactNative.ViewStyle>,
        titleStyle: ReactNative.StyleProp<ReactNative.TextStyle>, onPress: () => any) => {
        return (
            <ReactNative.TouchableOpacity onPress={onPress} style={btnstyle}>
                {img === null ? null : (<Widget.FitImage source={img} />)}
                {title === null ? null : (
                    <ReactNative.Text style={titleStyle}>
                        {title}
                    </ReactNative.Text>
                )}
            </ReactNative.TouchableOpacity>
        );
    }
}
export = TitleComponent;
