import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');

const styles = ReactNative.StyleSheet.create({
    scroll: {
        alignSelf: 'stretch',
        backgroundColor: '#fff',
    },
    container: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topLoginTxt: {
        fontSize: 17,
        height: 56,
        color: '#333333',
    },
    logo: {
        marginTop: 118,
        height: 19,
        width: 62,
    },
    loginSolution: {
        fontSize: 14,
        color: '#999999',
        marginTop: 142,
    },
    wechatBtn: {
        marginTop: 38,
    },
    wechatImg: {
        padding: 10,
        width: 49,
        height: 42,
    },
    loginBtn: {
        width: 327,
        height: 47,
        marginTop: 43,
        borderRadius: 4,
        backgroundColor: '#5E62FF',
        opacity: 0.9,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginTxt: {
        color: '#fff',
        fontSize: 15,
    },
});

export = class LoginScreen extends fm.component.NavComp<{}, null> {
    render() {
        return (
            <ReactNative.ScrollView style={styles.scroll}>
                <ReactNative.View style={styles.container}>
                    <ReactNative.Text style={styles.topLoginTxt}>
                        Login
                    </ReactNative.Text>
                    <ReactNative.Image resizeMode="contain" style={styles.logo} source={require('../../../asserts/login/logo.png')} />
                    <ReactNative.Text style={styles.loginSolution}>
                        Login Solution
                    </ReactNative.Text>
                    <ReactNative.TouchableOpacity style={styles.wechatBtn} onPress={this._onPressWeChat}>
                        <ReactNative.Image resizeMode="contain" style={styles.wechatImg} source={require('../../../asserts/login/wechat.png')} />
                    </ReactNative.TouchableOpacity>
                    <ReactNative.TouchableOpacity style={styles.loginBtn} onPress={this._onPressRegitser}>
                        <ReactNative.Text style={styles.loginTxt}>
                            LoginWithPhone
                        </ReactNative.Text>
                    </ReactNative.TouchableOpacity>
                </ReactNative.View>
            </ReactNative.ScrollView >
        );
    }
    private _onPressWeChat = () => {
        // this.props.onShowTodoPanel();
    }
    private _onPressRegitser = () => {
        this.go('register');
    }
};