import RX = require('reactxp');

import { TitleComponent } from '../../framework/component/TitleComponent';

const styles = {
    phoneInput: RX.Styles.createTextInputStyle({
        marginTop: 62,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#00fffff',
        fontSize: 16,
        color: '#BBBBBB',
    }),
    dividerLine: RX.Styles.createViewStyle({
        height: 0.5,
        backgroundColor: '#DFDFDF',
        marginLeft: 17,
        marginRight: 17,
        marginTop: 17,
    }),
    codeLayout: RX.Styles.createViewStyle({
        marginTop: 17,
        marginLeft: 20,
        marginRight: 17,
    }),
    codeInput: RX.Styles.createTextInputStyle({
        backgroundColor: '#00fffff',
        fontSize: 16,
        color: '#BBBBBB',
    }),
    codeTxt: RX.Styles.createTextStyle({
        padding:17,
        fontSize: 16,
        color: '#BBBBBB',
    }),
    registerLaout: RX.Styles.createViewStyle({
        marginTop: 17,
        marginLeft: 20,
        marginRight: 20,
    }),
    registerTxt: RX.Styles.createTextStyle({
        fontSize: 14,
        color: '#999999',
    }),
};
export default class RegisterComponent extends RX.Component<{}, null>{
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
                    <RX.Button onPress={this._onGetCode}>
                        <RX.Text style={styles.codeTxt}>
                            Code
                        </RX.Text>
                    </RX.Button>
                </RX.View>
                <RX.Button style={styles.registerLaout} onPress= {this._onRegiser}>
                        <RX.Text style={styles.registerTxt}>
                            Continue
                        </RX.Text>
                    </RX.Button>
            </TitleComponent>
        );
    }
    private _onGetCode(){

    }
    private _onRegiser(){

    }
}