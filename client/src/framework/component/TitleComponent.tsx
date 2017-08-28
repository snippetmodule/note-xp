import rx = require('reactxp');
import React = require('react');

import NavUtils = require('../utils/NavUtils');
import * as Widget from './widget';

const styles = {
    scroll: rx.Styles.createScrollViewStyle({
        alignSelf: 'stretch',
        backgroundColor: '#f5f5f5'
    }),
    container: rx.Styles.createViewStyle({
        justifyContent: 'center',
        alignItems: 'stretch'
    }),
    titleContainer: rx.Styles.createViewStyle({
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        backgroundColor: '#fff'
    }),
    backBtn: rx.Styles.createButtonStyle({
        width: 56,
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
        color: '#333333'
    }),
    titleImg: rx.Styles.createImageStyle({

    }),
    rightBtn: rx.Styles.createButtonStyle({
        width: 56
    }),
    dividerLine: rx.Styles.createViewStyle({
        alignSelf: 'stretch',
        height: 0.5,
        backgroundColor: '#d0d0d0'
    }),
}

interface Prop extends rx.CommonStyledProps<rx.Types.ViewStyle> {
    isShowTitle?: boolean,
    backImg?: string,
    title?: string,
    titleImg?: string,
    right?: string,
    rightImg?: string,
    rightStyle?: any,
    onBack?: () => void,
    onTitle?: () => void,
    onRight?: () => void,
}
interface State {
    isShowTitle: boolean,
    children: React.ReactNode | React.ReactNode[];
    dividerLine: boolean,
    right: boolean,
}
class TitleComponent extends rx.Component<Prop, State>{
    public static defaultProps: Prop = {
        isShowTitle: true,
        backImg: 'asserts/common/back.png',
        onBack: () => NavUtils.goBack(),
        onTitle: () => { },
        onRight: () => { },
    };
    constructor(prop: Prop, state: State) {
        super(prop, state);
        this.state = { isShowTitle: this.props.isShowTitle, children: this.props.children, dividerLine: true, right: false };
        this.setState = this.setState.bind(this);
    }
    render() {
        let titleBtn = this.props.titleImg
            ? (
                <rx.Button onPress={this.props.onTitle} style={[styles.titleBtn, this.state.right ? {} : { marginRight: 56 }]}>
                    <rx.Image source={this.props.titleImg} >
                    </rx.Image>
                    <rx.Text style={styles.titleTex}>
                        {this.props.title}
                    </rx.Text>
                </rx.Button>
            ) : (
                <rx.Button onPress={this.props.onTitle} style={[styles.titleBtn, this.state.right ? {} : { marginRight: 56 }]}>
                    <rx.Text style={styles.titleTex}>
                        {this.props.title}
                    </rx.Text>
                </rx.Button>
            );
        let rightBtn = this.props.right
            ? (
                <rx.Button onPress={this.props.onRight}>
                    <rx.Image source={this.props.rightImg}>
                    </rx.Image>
                    <rx.Text >
                        {this.props.right}
                    </rx.Text>
                </rx.Button>
            ) : (
                this.props.right
                    ? (<rx.Button onPress={this.props.onRight}>
                        <rx.Text >
                            {this.props.right}
                        </rx.Text>
                    </rx.Button>)
                    : null
            );
        let titleLayout = this.state.isShowTitle ? (
            <rx.View style={styles.titleContainer} ref='titleLayout'>
                <rx.Button onPress={this.props.onBack} style={styles.backBtn}>
                    <Widget.FitImage source={this.props.backImg} resizeMode='auto' />
                </rx.Button>
                {titleBtn}
                {
                    this.state.right ? rightBtn : null
                }
                {
                    this.state.dividerLine ? <rx.View style={styles.dividerLine} ref='dividerLine' /> : null
                }

            </rx.View>
        ) : null;
        return (
            <rx.ScrollView style={styles.scroll}>
                <rx.View style={styles.container} >
                    {titleLayout}
                    {this.state.children}
                </rx.View>
            </rx.ScrollView>
        );
    }
}
export = TitleComponent;
