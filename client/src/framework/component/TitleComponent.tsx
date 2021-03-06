import rx = require('reactxp');
import React = require('react');

import NavUtils = require('../utils/NavUtils');
import * as Widget from './widget';

const styles = {
    root: rx.Styles.createViewStyle({
        flexDirection: 'column',
        alignItems: 'stretch',
        flex: 1,
        alignSelf: 'stretch',
    }),
    container: rx.Styles.createViewStyle({
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#f5fcff',
        alignSelf: 'stretch',
        flex: 1,
    }),
    titleContainer: rx.Styles.createViewStyle({
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        backgroundColor: '#fff',
    }),
    backBtn: rx.Styles.createButtonStyle({
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    }),
    titleBtn: rx.Styles.createButtonStyle({
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }),
    titleTex: rx.Styles.createTextStyle({
        fontSize: 17,
        color: '#333333',
    }),
    titleImg: rx.Styles.createImageStyle({

    }),
    rightBtn: rx.Styles.createButtonStyle({
        width: 56,
    }),
    dividerLine: rx.Styles.createViewStyle({
        height: 0.5,
        backgroundColor: '#d0d0d0',
    }),
};

interface IProp extends rx.CommonStyledProps<rx.Types.ViewStyle> {
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
interface IState {
    isShowTitle: boolean;
    dividerLine: boolean;
    right: boolean;
}
class TitleComponent extends rx.Component<IProp, IState> {
    public static defaultProps: IProp = {
        isShowTitle: true,
        backImg: require('../../../asserts/common/back.png'),
        onBack: () => NavUtils.goBack(),
        onTitle: () => { },
        onRight: () => { },
    };
    constructor(prop: IProp, state: IState) {
        super(prop, state);
        this.state = { isShowTitle: this.props.isShowTitle, dividerLine: true, right: false };
        this.setState = this.setState.bind(this);
    }
    render() {
        let titleBtn = this.renderBtn(this.props.title, this.props.titleImg, [styles.titleBtn, this.state.right ? {} : { marginRight: 56 }], styles.titleTex, this.props.onTitle);
        let rightBtn = this.renderBtn(this.props.right, this.props.rightImg, null, null, this.props.onRight);
        let titleLayout = this.state.isShowTitle ? (
            <rx.View style={styles.titleContainer} ref="titleLayout">
                <rx.Button onPress={this.props.onBack} style={styles.backBtn}>
                    <Widget.FitImage source={this.props.backImg} />
                </rx.Button>
                {titleBtn}
                {rightBtn}
            </rx.View>
        ) : null;
        return (
            <rx.View style={styles.root}>
                {titleLayout}
                {this.state.dividerLine ? <rx.View style={styles.dividerLine} ref="dividerLine" /> : null}
                <rx.View style={[styles.container]} >
                    {this.props.children}
                </rx.View>
                <Widget.ToastView />
            </rx.View>
        );
    }
    private renderBtn = (title: string, img: string, btnstyle: rx.Types.StyleRuleSetRecursive<rx.Types.ButtonStyle>,
                         titleStyle: rx.Types.StyleRuleSetRecursive<rx.Types.TextStyle>, onPress: () => any) => {
        return (
            <rx.Button onPress={onPress} style={btnstyle}>
                {img === null ? null : (<Widget.FitImage source={img} />)}
                {title === null ? null : (
                    <rx.Text style={titleStyle}>
                        {title}
                    </rx.Text>
                )}
            </rx.Button>
        );
    }
}
export = TitleComponent;
