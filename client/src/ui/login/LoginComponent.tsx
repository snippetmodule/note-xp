import rx = require('reactxp');

import RegisterScene = require('./RegisterScene');
import fm = require('../../framework');

const styles = {
    scroll: rx.Styles.createScrollViewStyle({
        alignSelf: 'stretch',
        backgroundColor: '#fff'
    }),
    container: rx.Styles.createViewStyle({
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    }),
    topLoginTxt: rx.Styles.createTextStyle({
        fontSize: 17,
        height: 56,
        color: '#333333',
    }),
    logo: rx.Styles.createImageStyle({
        marginTop: 118,
    }),
    loginSolution: rx.Styles.createTextStyle({
        fontSize: 14,
        color: '#999999',
        marginTop: 142
    }),
    wechatBtn: rx.Styles.createButtonStyle({
        marginTop: 38
    }),
    wechatImg: rx.Styles.createButtonStyle({
        padding: 10,
    }),
    loginBtn: rx.Styles.createButtonStyle({
        width: 327,
        height: 47,
        marginTop: 43,
        borderRadius: 4,
        backgroundColor: '#5E62FF',
        opacity: 0.9,
        alignItems: 'center'
    }),
    loginTxt: rx.Styles.createTextStyle({
        color: '#fff',
        fontSize: 15,
    }),
}

export default class LonginComponent extends rx.Component<{}, null>{
    render() {
        return (
            <rx.ScrollView style={styles.scroll}>
                <rx.View style={styles.container}>
                    <rx.Text style={styles.topLoginTxt}>
                        Login
                    </rx.Text>
                    <fm.component.widget.FitImage style={styles.logo} source={require('../../../asserts/login/logo.png')} />
                    <rx.Text style={styles.loginSolution}>
                        Login Solution
                    </rx.Text>
                    <rx.Button style={styles.wechatBtn} onPress={this._onPressWeChat}>
                        <fm.component.widget.FitImage style={styles.wechatImg} source={require('../../../asserts/login/wechat.png')} />
                    </rx.Button>
                    <rx.Button style={styles.loginBtn} onPress={this._onPressRegitser}>
                        <rx.Text style={styles.loginTxt}>
                            LoginWithPhone
                        </rx.Text>
                    </rx.Button>
                </rx.View>
            </rx.ScrollView >
        );
    }
    private _onPressWeChat = () => {
        // this.props.onShowTodoPanel();
    }
    private _onPressRegitser() {
        fm.utils.NavUtils.go({ component: RegisterScene })
    }
} 