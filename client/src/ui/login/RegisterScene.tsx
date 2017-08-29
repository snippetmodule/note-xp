import rx = require('reactxp');

import fm = require('../../framework');
import * as utils from '../utils';
import * as models from '../modles';

const styles = {
    phoneInput: rx.Styles.createTextInputStyle({
        marginTop: 46,
        marginLeft: 20,
        marginRight: 20,
        height: 48,
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
        height: 48,
        marginLeft: 20,
        marginRight: 17,
        flexDirection: 'row'
    }),
    codeInput: rx.Styles.createTextInputStyle({
        backgroundColor: 'transparent',
        fontSize: 16,
        flex: 1,
        color: '#BBBBBB',
        marginRight: 6
    }),
    codeBtn: rx.Styles.createButtonStyle({
        marginTop: 6,
        marginBottom: 6,
        paddingLeft: 17,
        paddingRight: 17,
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
        backgroundColor: '#5E62FF',
        borderRadius: 4,
        marginTop: 27,
        alignSelf: 'center'
    }),
    registerTxt: rx.Styles.createTextStyle({
        fontSize: 14,
        color: '#999999',
        alignSelf: 'center'
    }),
};
interface State {
    isLogined: boolean;
    phoneNumber: string;
    checkCode: string;
    checkCodeResult: fm.component.HttpStore.HttpResponse<models.Json.CheckCode[]>;
    registerResult: fm.component.HttpStore.HttpResponse<models.Json.RegisterInfo[]>;
    checkCodeBtn: number;
}

export = class RegisterScene extends fm.ComponentBase<{}, State>{
    private const mGetCodeStore: fm.component.HttpStore.HttpStore<models.Json.CheckCode[]> = new fm.component.HttpStore.HttpStore();
    private const mLoginStore: fm.component.HttpStore.HttpStore<models.Json.RegisterInfo[]> = new fm.component.HttpStore.HttpStore();

    private _intervalToken: number;
    constructor(props?: {}) {
        super(props);
    }

    protected _buildState(props: {}, initialBuild: boolean): State {
        const newState = {
            ...this.state,
            isLogined: fm.manager.UserManager.Instance.getUser().isLogined,
            checkCodeResult: this.mGetCodeStore.getHttpResonse(),
            registerResult: this.mLoginStore.getHttpResonse(),
            checkCodeBtn: 0,
        };
        if (newState.registerResult.state === 'sucess' 
            && newState.registerResult.result.code === 200
            && !newState.isLogined) {
            window.setTimeout(() => {
                let message = this.state.registerResult.result.message;
                fm.manager.UserManager.Instance.save(JSON.stringify(message[0]));
                this._stopInterval();
                fm.utils.NavUtils.goToMain();
            });
        }
        if (newState.checkCodeResult.state === 'sucess' && !this._intervalToken) {
            window.setTimeout(() => {
                this._startInterval();
            });
        }
        return newState;
    }

    componentWillUnmount() {
        this._stopInterval();
    }
    private _startInterval = () => {
        this.setState({ ...this.state, checkCodeBtn: 60 });
        this._intervalToken = window.setInterval(() => {
            if (this.state.checkCodeBtn <= 0 || !this.isComponentMounted()) {
                window.clearInterval(this._intervalToken);
                return;
            }
            this.setState({ ...this.state, checkCodeBtn: this.state.checkCodeBtn - 1 });
        }, 1000);
    }

    private _stopInterval = () => {
        if (this._intervalToken) {
            window.clearInterval(this._intervalToken);
            this._intervalToken = undefined;
        }
    }
    render() {
        let codeTex = this.state.checkCodeBtn ? this.state.checkCodeBtn + '' : 'Code';
        return (
            <fm.component.TitleComponent title='手机登录'>
                <rx.TextInput placeholder='Phone'
                    placeholderTextColor='#BBBBBB'
                    multiline={false}
                    autoFocus={true}
                    maxLength={11}
                    returnKeyType="next"
                    keyboardType='numeric'
                    style={styles.phoneInput}
                    value={this.state.phoneNumber}
                    onChangeText={this._onNumberChange}
                >
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
                        style={styles.codeInput}
                        value={this.state.checkCode}
                        onChangeText={this._onCheckCodeChange}
                    >
                    </rx.TextInput>
                    <rx.Button onPress={this._onGetCode} style={[styles.codeBtn]}>
                        <rx.Text style={styles.codeTxt}>
                            {`${codeTex}`}
                        </rx.Text>
                    </rx.Button>
                </rx.View>
                <rx.View style={[styles.dividerLine]} />
                <rx.Button style={[styles.registerLaout]} onPress={this._onRegiser} ref='register'>
                    <rx.Text style={styles.registerTxt}>
                        Continue
                    </rx.Text>
                </rx.Button>
            </fm.component.TitleComponent>
        );
    }
    private _onNumberChange = (v: string) => {
        this.setState({ ...this.state, phoneNumber: v });
    }
    private _onCheckCodeChange = (v: string) => {
        this.setState({ ...this.state, checkCode: v });
    }
    private _onGetCode = () => {
        if (this.state.checkCodeBtn) {
            return;
        }
        let number = this.state.phoneNumber;
        if (/[1][34578]\d{9}/.test(number)) {
            this.mGetCodeStore.exeHttp({
                url: utils.UrlConst.RegisterUrl,
                method: 'POST',
                body: {
                    phoneNumber: this.state.phoneNumber
                }
            });
            return;
        }
        fm.utils.PopupUtils.Toast.show({ getAnchor: () => this.refs['register'], content: 'phone_register_number_err' });
    }
    private _onRegiser = () => {
        if (!this.state.checkCode) {
            fm.utils.PopupUtils.Toast.show({ getAnchor: () => this.refs['register'], content: 'phone_register_check_code_empty' });
            return;
        }
        if (!this.state.checkCodeResult.result) {
            return;
        }
        let messages = this.state.checkCodeResult.result.message as [models.Json.CheckCode];
        let verifyingId = messages[0].verifyingId;
        let task = fm.utils.RestUtils.request<models.Json.RegisterInfo[]>({
            url: utils.UrlConst.RegisterUrl + '/' + verifyingId,
            method: 'PUT',
            body: {
                phoneNumber: this.state.phoneNumber,
                validateCode: this.state.checkCode
            }

        });
        this.mLoginStore.exeAsync(task);
    }
}