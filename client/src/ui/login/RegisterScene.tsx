import RX = require('reactxp');

import { TitleComponent } from '../../framework/component/TitleComponent';

const styles = {
    phoneInput: RX.Styles.createTextInputStyle({
        marginTop: 46,
        marginLeft: 20,
        marginRight: 20,
        height:48,
        backgroundColor: 'transparent',
        fontSize: 16,
        color: '#BBBBBB',
    }),
    dividerLine: RX.Styles.createViewStyle({
        height: 1,
        backgroundColor: '#DFDFDF',
        marginLeft: 17,
        marginRight: 17,
    }),
    codeLayout: RX.Styles.createViewStyle({
        height:48,
        marginLeft: 20,
        marginRight: 17,
        flexDirection: 'row'
    }),
    codeInput: RX.Styles.createTextInputStyle({
        backgroundColor: 'transparent',
        fontSize: 16,
        flex: 1,
        color: '#BBBBBB',
        marginRight:6
    }),
    codeBtn: RX.Styles.createButtonStyle({
        marginTop:6,
        marginBottom:6,
        paddingLeft:17,
        paddingRight:17,
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 6,
        borderColor: '#5e63ff'
    }),
    codeTxt: RX.Styles.createTextStyle({
        fontSize: 16,
        color: '#BBBBBB',
    }),
    registerLaout: RX.Styles.createViewStyle({
        height: 47,
        width: 327,
        backgroundColor:'#5E62FF',
        borderRadius:4,
        marginTop:27,
        alignSelf:'center'
    }),
    registerTxt: RX.Styles.createTextStyle({
        fontSize: 14,
        color: '#999999',
        alignSelf:'center'
    }),
};
export = class RegisterScene extends RX.Component<{}, null>{
    render() {
        return (
            <TitleComponent title='手机登录'>
                <RX.TextInput placeholder='Phone'
                    placeholderTextColor='#BBBBBB'
                    multiline={false}
                    autoFocus={true}
                    maxLength={11}
                    returnKeyType="next"
                    keyboardType='numeric'
                    style={styles.phoneInput}>
                </RX.TextInput>
                <RX.View style={styles.dividerLine} />
                <RX.View style={styles.codeLayout}>
                    <RX.TextInput placeholder='Code'
                        placeholderTextColor='#BBBBBB'
                        multiline={false}
                        autoFocus={true}
                        maxLength={11}
                        returnKeyType="next"
                        keyboardType='numeric'
                        secureTextEntry={true}
                        style={styles.codeInput}>
                    </RX.TextInput>
                    <RX.Button onPress={this._onGetCode} style={styles.codeBtn}>
                        <RX.Text style={styles.codeTxt}>
                            Code
                        </RX.Text>
                    </RX.Button>
                </RX.View>
                <RX.View style={[styles.dividerLine]} />
                <RX.Button style={styles.registerLaout} onPress={this._onRegiser}>
                    <RX.Text style={styles.registerTxt}>
                        Continue
                        </RX.Text>
                </RX.Button>
            </TitleComponent>
        );
    }
    private _onGetCode() {

    }
    private _onRegiser() {

    }
}