
import RX = require('reactxp');
import React = require('react');

import NavUtils = require('../utils/NavUtils');
import * as Widget from './widget';

const styles = {
    scroll: RX.Styles.createScrollViewStyle({
        alignSelf: 'stretch',
        backgroundColor: '#f5f5f5'
    }),
    container: RX.Styles.createViewStyle({
        justifyContent: 'center',
        alignItems: 'stretch'
    }),
    titleContainer: RX.Styles.createViewStyle({
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        backgroundColor: '#fff'
    }),
    backBtn: RX.Styles.createButtonStyle({
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
    }),

    titleBtn: RX.Styles.createButtonStyle({
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }),
    titleTex: RX.Styles.createTextStyle({
        fontSize: 17,
        color: '#333333'
    }),
    titleImg: RX.Styles.createImageStyle({

    }),
    rightBtn: RX.Styles.createButtonStyle({
        width: 56
    }),
    dividerLine: RX.Styles.createViewStyle({
        alignSelf: 'stretch',
        height: 0.5,
        backgroundColor: '#d0d0d0'
    }),
}

export interface Prop extends RX.CommonStyledProps<RX.Types.ViewStyle> {
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
    children?: React.ReactNode | React.ReactNode[];
    dividerLine?: boolean,
    right?: boolean,
}
export class TitleComponent extends RX.Component<Prop, State>{
    public static defaultProps: Prop = {
        isShowTitle: true,
        backImg: 'asserts/common/back.png',
        onBack: () => NavUtils.goBack(),
        onTitle: () => { },
        onRight: () => { },
    };
    constructor(prop: Prop, state: State) {
        super(prop, state);
        this.state = { children: this.props.children, dividerLine: true, right: false };
        this.setState = this.setState.bind(this);
    }
    setState(newState: State) {
        newState = { ...this.state, ...newState };
        super.setState(newState);
    }
    render() {
        let titleBtn = this.props.titleImg
            ? (
                <RX.Button onPress={this.props.onTitle} style={[styles.titleBtn, this.state.right ? {} : { marginRight: 56 }]}>
                    <RX.Image source={this.props.titleImg} >
                    </RX.Image>
                    <RX.Text style={styles.titleTex}>
                        {this.props.title}
                    </RX.Text>
                </RX.Button>
            ) : (
                <RX.Button onPress={this.props.onTitle} style={[styles.titleBtn, this.state.right ? {} : { marginRight: 56 }]}>
                    <RX.Text style={styles.titleTex}>
                        {this.props.title}
                    </RX.Text>
                </RX.Button>
            );
        let rightBtn = this.props.right
            ? (
                <RX.Button onPress={this.props.onRight}>
                    <RX.Image source={this.props.rightImg}>
                    </RX.Image>
                    <RX.Text >
                        {this.props.right}
                    </RX.Text>
                </RX.Button>
            ) : (
                this.props.right
                    ? (<RX.Button onPress={this.props.onRight}>
                        <RX.Text >
                            {this.props.right}
                        </RX.Text>
                    </RX.Button>)
                    : null
            );
        return (
            <RX.ScrollView style={styles.scroll}>
                <RX.View style={styles.container}>
                    <RX.View style={styles.titleContainer} ref='titleLayout'>
                        <RX.Button onPress={this.props.onBack} style={styles.backBtn}>
                            <Widget.FitImage source={this.props.backImg} resizeMode='auto' />
                        </RX.Button>
                        {titleBtn}
                        {
                            this.state.right ? rightBtn : null
                        }
                        {
                            this.state.dividerLine ? <RX.View style={styles.dividerLine} ref='dividerLine' /> : null
                        }

                    </RX.View>
                    {this.state.children}
                </RX.View>
            </RX.ScrollView>
        );
    }
}