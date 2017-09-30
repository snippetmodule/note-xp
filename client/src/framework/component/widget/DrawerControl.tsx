import rx = require('reactxp');
import React = require('react');

import DimenUtils = require('../../utils/DimenUtils');

const MIN_SWIPE_DISTANCE = 3;
const DEVICE_WIDTH = DimenUtils.getWindowSize().width;
const THRESHOLD = DEVICE_WIDTH / 2;
const VX_MAX = 0.1;

interface Props extends rx.CommonStyledProps<rx.Types.ViewStyleRuleSet> {
    drawerWidth?: number,
    drawerPosition?: 'left' | 'right',
    renderDrawer?: () => JSX.Element;
    renderContent?: () => JSX.Element;
}

// Duration (in ms) of drawer animation.
const animationDuration = 250;

const _drawerWidth = 100;

const styles = {
    container: rx.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch'
    }),
    drawerContainer: rx.Styles.createViewStyle({
        position: 'absolute',
        width: _drawerWidth,
        top: 0,
        bottom: 0,
    }),
    contentContainer: rx.Styles.createViewStyle({
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    })
};
interface State {
    openValue: rx.Animated.Value;
}
export class DrawerControl extends rx.Component<Props, null> {
    static defaultProps: Props = {
        drawerWidth: _drawerWidth,
        drawerPosition: 'right',
    }
    private _drawerShown = false;
    private _viewWidth: number = 0;

    private _animation: rx.Types.Animated.CompositeAnimation;
    private _drawerTranslationValue: rx.Animated.Value;
    private _contentTranslationValue: rx.Animated.Value;
    private _animatedDrawerStyle: rx.Types.AnimatedViewStyleRuleSet;
    private _animatedContentStyle: rx.Types.AnimatedViewStyleRuleSet;

    isDrawerOpen = () => {
        return this._drawerShown;
    }
    toggleDrawer = () => {
        this._drawerShown = !this._drawerShown;

        if (this._animation) {
            this._animation.stop();
        }

        this._animation = rx.Animated.parallel([
            rx.Animated.timing(this._drawerTranslationValue, {
                toValue: this._getDrawerAnimToValue(),
                easing: rx.Animated.Easing.InOut(),
                duration: animationDuration
            }),
            rx.Animated.timing(this._contentTranslationValue, {
                toValue: this._getContentAnimToValue(),
                easing: rx.Animated.Easing.InOut(),
                duration: animationDuration
            })
        ]);

        this._animation.start(() => {
            this._animation = null;
        });
    }
    private _getDrawerAnimToValue = () => {
        if (this.props.drawerPosition === 'left') {
            return this._drawerShown ? 0 : -this.props.drawerWidth;
        } else {
            return this._drawerShown ? 0 : this.props.drawerWidth;
        }
    }
    private _getContentAnimToValue = () => {
        if (this.props.drawerPosition === 'left') {
            return this._drawerShown ? this.props.drawerWidth : 0;
        } else {
            return this._drawerShown ? -this.props.drawerWidth : 0;
        }
    }
    constructor(props: Props) {
        super(props);
        this._drawerTranslationValue = new rx.Animated.Value(0);
        this._animatedDrawerStyle = rx.Styles.createAnimatedViewStyle({
            transform: [
                {
                    translateX: this._drawerTranslationValue
                }
            ]
        });

        this._contentTranslationValue = new rx.Animated.Value(0);
        this._animatedContentStyle = rx.Styles.createAnimatedViewStyle({
            transform: [
                {
                    translateX: this._contentTranslationValue
                }
            ]
        });
    }

    private _onLayout = (layoutInfo: rx.Types.ViewOnLayoutEvent) => {
        this._viewWidth = layoutInfo.width;

        // Stop any animation.
        if (this._animation) {
            this._animation.stop();
        }

        // Immediately update animation values for new width.
        this._drawerTranslationValue.setValue(this._getDrawerAnimToValue());
        this._contentTranslationValue.setValue(this._getContentAnimToValue());
    }

    render() {
        let drawerPositionStyle = this.props.drawerPosition === 'left' ? { left: 0 } : { right: 0 }
        return (
            <rx.View
                style={[styles.container, this.props.style]}
                onLayout={this._onLayout}
                onStartShouldSetResponder={this._onStartShouldSetResponder}
                onMoveShouldSetResponder={this._onMoveShouldSetResponder}
                onContextMenu={this.onContextMenu}
                onStartShouldSetResponderCapture={this.onStartShouldSetResponderCapture}
                onMoveShouldSetResponderCapture={this.onMoveShouldSetResponderCapture}
                onResponderGrant={this.onResponderGrant}
                onResponderMove={this.onResponderMove}
                onResponderReject={this.onResponderReject}
                onResponderRelease={this.onResponderRelease}
                onResponderStart={this.onResponderStart}
                onResponderEnd={this.onResponderEnd}
                onResponderTerminate={this.onResponderTerminate}
                onResponderTerminationRequest={this.onResponderTerminationRequest}
            >
                <rx.Animated.View style={[styles.drawerContainer, drawerPositionStyle, this._animatedDrawerStyle]}>
                    {this.props.renderDrawer()}
                </rx.Animated.View>
                <rx.Animated.View style={[styles.contentContainer, this._animatedContentStyle]}>
                    {this.props.renderContent()}
                </rx.Animated.View>
            </rx.View>
        );
    }
    _onStartShouldSetResponder = (e: rx.Types.SyntheticEvent) => {
        console.info('1111111111_onMoveShouldSetResponder:' + e);
        return true;
    }
    _onMoveShouldSetResponder = (e: rx.Types.SyntheticEvent) => {
        console.info('1111111111_onMoveShouldSetResponder:' + e);
        return true;
    };
    onContextMenu = (e: rx.Types.SyntheticEvent) => {
        console.info('1111111111onContextMenu:' + e);
    };
    onStartShouldSetResponder = (e: rx.Types.SyntheticEvent) => {
        console.info('1111111111_onStartShouldSetResponder:' + e);
        return true;
    };
    onMoveShouldSetResponder = (e: rx.Types.SyntheticEvent) => {
        console.info('1111111111_onMoveShouldSetResponder:' + e);
        return true;
    };
    onStartShouldSetResponderCapture = (e: rx.Types.SyntheticEvent) => {
        console.info('1111111111_onStartShouldSetResponderCapture:' + e);
        return false;
    };
    onMoveShouldSetResponderCapture = (e: rx.Types.SyntheticEvent) => {
        console.info('1111111111_onMoveShouldSetResponderCapture:' + e);
        return false;
    };
    onResponderGrant = (e: rx.Types.SyntheticEvent) => {
        console.info('1111111111_onResponderGrant:' + e);
    };
    onResponderReject = (e: rx.Types.SyntheticEvent) => {
        console.info('1111111111_onResponderReject:' + e);
    };
    onResponderRelease = (e: rx.Types.SyntheticEvent) => {
        console.info('1111111111_onResponderRelease:' + e);
    };
    onResponderStart = (e: React.TouchEvent<any>) => {
        console.info('1111111111_onResponderStart:' + e);
    };
    onResponderMove = (e: React.TouchEvent<any>) => {
        console.info('1111111111_onResponderMove:' + e);
    };
    onResponderEnd = (e: React.TouchEvent<any>) => {
        console.info('1111111111_onResponderEnd:' + e);
    };
    onResponderTerminate = (e: rx.Types.SyntheticEvent) => {
        console.info('1111111111_onResponderTerminate:' + e);
    };
    onResponderTerminationRequest = (e: rx.Types.SyntheticEvent) => {
        console.info('1111111111_onResponderTerminationRequest:' + e);
        return false;
    };
}
