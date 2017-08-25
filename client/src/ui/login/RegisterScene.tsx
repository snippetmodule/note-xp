import rx = require('reactxp');

import fm = require('../../framework');

const styles = {
    phoneInput: rx.Styles.createTextInputStyle({
        marginTop: 46,
        marginLeft: 20,
        marginRight: 20,
        height:48,
        backgroundColor: 'transparent',
        fontSize: 16,
        color: '#BBBBBB',
    }),
    dividerLine: rx.Styles.createViewStyle({
        height: 1,
        backgroundColor: '#DFDFDF',
        marginLeft: 17,
        marginRight: 17,
    }),
    codeLayout: rx.Styles.createViewStyle({
        height:48,
        marginLeft: 20,
        marginRight: 17,
        flexDirection: 'row'
    }),
    codeInput: rx.Styles.createTextInputStyle({
        backgroundColor: 'transparent',
        fontSize: 16,
        flex: 1,
        color: '#BBBBBB',
        marginRight:6
    }),
    codeBtn: rx.Styles.createButtonStyle({
        marginTop:6,
        marginBottom:6,
        paddingLeft:17,
        paddingRight:17,
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 6,
        borderColor: '#5e63ff'
    }),
    codeTxt: rx.Styles.createTextStyle({
        fontSize: 16,
        color: '#BBBBBB',
    }),
    registerLaout: rx.Styles.createViewStyle({
        height: 47,
        width: 327,
        backgroundColor:'#5E62FF',
        borderRadius:4,
        marginTop:27,
        alignSelf:'center'
    }),
    registerTxt: rx.Styles.createTextStyle({
        fontSize: 14,
        color: '#999999',
        alignSelf:'center'
    }),
};
interface State {
    isLogined: boolean;
}

export = class RegisterScene extends fm.ComponentBase<{}, State>{
    constructor(props?: {}){
        super(props);
    }
    
    protected _buildState(props: {}, initialBuild: boolean): State {
        return {
            isLogined: fm.manager.UserManager.Instance.getUser().isLogined,
        };
    }
    render() {
        if(this.state.isLogined){
            fm.utils.NavUtils.goToMain();
            return null;
        }
        return (
            <fm.component.TitleComponent title='手机登录'>
                <rx.TextInput placeholder='Phone'
                    placeholderTextColor='#BBBBBB'
                    multiline={false}
                    autoFocus={true}
                    maxLength={11}
                    returnKeyType="next"
                    keyboardType='numeric'
                    style={styles.phoneInput}>
                </rx.TextInput>
                <rx.View style={styles.dividerLine} />
                <rx.View style={styles.codeLayout}>
                    <rx.TextInput placeholder='Code'
                        placeholderTextColor='#BBBBBB'
                        multiline={false}
                        autoFocus={true}
                        maxLength={11}
                        returnKeyType="next"
                        keyboardType='numeric'
                        secureTextEntry={true}
                        style={styles.codeInput}>
                    </rx.TextInput>
                    <rx.Button onPress={this._onGetCode} style={styles.codeBtn}>
                        <rx.Text style={styles.codeTxt}>
                            Code
                        </rx.Text>
                    </rx.Button>
                </rx.View>
                <rx.View style={[styles.dividerLine]} />
                <rx.Button style={styles.registerLaout} onPress={this._onRegiser}>
                    <rx.Text style={styles.registerTxt}>
                        Continue
                        </rx.Text>
                </rx.Button>
            </fm.component.TitleComponent>
        );
    }
    private _onGetCode() {

    }
    private _onRegiser() {

    }
}