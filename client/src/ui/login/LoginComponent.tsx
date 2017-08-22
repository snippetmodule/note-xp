import RX = require('reactxp');

const styles = {
    scroll: RX.Styles.createScrollViewStyle({
        alignSelf: 'stretch',
        backgroundColor: '#fff'
    }),
    container: RX.Styles.createViewStyle({
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    }),
    topLoginTxt: RX.Styles.createTextStyle({
        fontSize: 17,
        height: 56,
        color: '#333333',
    }),
    logo: RX.Styles.createImageStyle({
        marginTop: 118
    }),
    loginSolution: RX.Styles.createTextStyle({
        fontSize: 14,
        color: '#999999',
        marginTop: 142
    }),
    wechatBtn: RX.Styles.createButtonStyle({
        marginTop: 38
    }),
    wechatImg: RX.Styles.createButtonStyle({
        padding: 10,
    }),
    loginBtn: RX.Styles.createButtonStyle({
        marginTop: 43,
        borderRadius: 4,
        backgroundColor: '#5E62FF',
        opacity: 0.9
    }),
    loginTxt: RX.Styles.createTextStyle({
        color: '#fff',
        fontSize: 15,
    }),
}
export default class LonginComponent extends RX.Component<{}, void>{

    render() {
        return (
            <RX.ScrollView style={styles.scroll}>
                <RX.View style={styles.container}>
                    <RX.Text style={styles.topLoginTxt}>
                        Login
                    </RX.Text>
                    <RX.Image style={styles.logo} source='asserts/login/logo.png'>
                    </RX.Image>
                    <RX.Text style={styles.loginSolution}>
                        Login Solution
                    </RX.Text>
                    <RX.Button style={styles.wechatBtn} onPress={this._onPressWeChat}>
                        <RX.Image style={styles.wechatImg} source='asserts/login/wechat.png' />
                    </RX.Button>
                    <RX.Button style={styles.loginBtn}>
                        <RX.Text style={styles.loginTxt}>
                            LoginWithPhone
                        </RX.Text>
                    </RX.Button>
                </RX.View>
            </RX.ScrollView >
        );
    }
    private _onPressWeChat = () => {
        // this.props.onShowTodoPanel();
    }
} 