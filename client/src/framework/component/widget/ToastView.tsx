import React = require('react');
import ReactNative = require('react-native');

import { ComponentBase } from 'resub';
import ToastUtils = require('../../utils/ToastUtils');

// import ToastService, { ToastMessage, ToastMessageParams } from '../service/ToastService';

// interface ToastViewProps extends ReactNative.CommonProps { }

export interface ToastMessage {
    key: string;
    textMessage: string;
    bottomMargin?: number;
    duration?: number;
    icon?: string;
    textBgColor?: string;
    textColor?: string;
    onPress?: () => void;
}
interface ToastViewState {
    currentMessage?: ToastMessage;
}

const _defaultToastTimeout = 2000;
const _toastHeight = 30;
const _marginBottom = 10;
const _containerHeight = 100 + _toastHeight;

const _styles = ReactNative.StyleSheet.create({
    containerRounded: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        height: _containerHeight,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    barButton: {
        bottom: 0,
        left: 0,
        right: 0,
        height: _toastHeight,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
        height: _toastHeight,
        backgroundColor: '#3b3b3b',
        borderRadius: _toastHeight / 2,
    },
    contentText: {
        color: '#fff',
    },
});

export class ToastView extends ComponentBase<{}, ToastViewState> {

    private _hideToastTimerId: number;
    private _button: ReactNative.TouchableOpacity;

    private _verticalAnimatedValue = new ReactNative.Animated.Value(_containerHeight);
    private _verticalAnimatedStyle = {
        transform: [{
            translateY: this._verticalAnimatedValue,
        }],
    };

    private _recalcDisplay(message: ToastMessage): void {
        let newState: ToastViewState = {
            currentMessage: message,
        };
        this.setState(newState, () => {
            this._showToast(0);
        });
    }

    protected _buildState(props: {}, initialBuild: boolean): ToastViewState {
        let newState: ToastViewState = {};

        if (initialBuild) {
            newState.currentMessage = null;
        }

        return newState;
    }

    componentWillMount() {
        super.componentWillMount();
        ToastUtils._showToastEvent.subscribe(this._onShowToast);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        ToastUtils._showToastEvent.unsubscribe(this._onShowToast);
    }

    render(): JSX.Element {
        // Bail, if there is not a valid current message.
        if (!this.state.currentMessage) {
            return null;
        }
        const params = this.state.currentMessage;
        let bgColorStyle = this.state.currentMessage.textBgColor ? { backgroundColor: this.state.currentMessage.textBgColor } : {};
        let textColorStyle = this.state.currentMessage.textColor ? { color: this.state.currentMessage.textColor } : {};
        return (
            <ReactNative.View
                style={_styles.containerRounded}
            >
                <ReactNative.Animated.View style={this._verticalAnimatedStyle}>
                    <ReactNative.TouchableOpacity
                        ref={this._onButtonRef}
                        style={_styles.barButton}
                        onPress={this._onTapDismiss}
                    >
                        <ReactNative.View style={[_styles.contentContainer, bgColorStyle]}>
                            <ReactNative.Text style={[_styles.contentText, textColorStyle]}>
                                {this.state.currentMessage.textMessage}
                            </ReactNative.Text>
                        </ReactNative.View>
                    </ReactNative.TouchableOpacity>
                </ReactNative.Animated.View>
            </ReactNative.View>
        );
    }

    private _onShowToast = (message: ToastMessage) => {
        if (this.isComponentMounted()) {
            this._recalcDisplay(message);
        }
    }

    private _onTapDismiss = () => {
        const params: ToastMessage = this.state.currentMessage ? this.state.currentMessage : null;
        if (params && params.onPress) {
            params.onPress();
        }
        window.clearTimeout(this._hideToastTimerId);
        this._hideToast(0);
    }

    private _showToast(delay: number) {
        const message = this.state.currentMessage;
        if (!message) {
            return;
        }
        const toValue = -1 * (this.state.currentMessage.bottomMargin ?
            this.state.currentMessage.bottomMargin : _marginBottom);
        setTimeout(() => {
            if (this.isComponentMounted()) {
                ReactNative.Animated.timing(this._verticalAnimatedValue, {
                    toValue: toValue,
                    easing: ReactNative.Easing.out(),
                    duration: 250,
                    isInteraction: false,
                }).start();
            }
        }, delay);
        this._hideToast(_defaultToastTimeout);
    }

    private _hideToast(delay: number) {
        this._hideToastTimerId = window.setTimeout(() => {
            if (this.isComponentMounted()) {
                ReactNative.Animated.timing(this._verticalAnimatedValue, {
                    toValue: _containerHeight,
                    easing: ReactNative.Easing.out(),
                    duration: 200,
                    isInteraction: false,
                }).start();
            }
        }, delay);
    }

    private _onButtonRef = (button: any) => {
        this._button = button as  ReactNative.TouchableOpacity;
    }
}
