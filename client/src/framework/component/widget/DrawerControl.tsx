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

    private _onLayout = (layoutInfo: rx.Types.LayoutInfo) => {
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
                onMoveShouldSetResponder={this._onMoveShouldSetResponder}
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
    _onMoveShouldSetResponder = (e: React.SyntheticEvent) => {
        if (!dx || !dy || Math.abs(dx) < MIN_SWIPE_DISTANCE) {
            return false;
        }
        if (this.props.drawerPosition === 'left') {
            const overlayArea = DEVICE_WIDTH -  (DEVICE_WIDTH - this.props.drawerWidth);
            if (this._lastOpenValue === 1) {
                if ((dx < 0 && Math.abs(dx) > Math.abs(dy) * 3) || moveX > overlayArea ) {
                    this._isClosing = true;
                    this._closingAnchorValue = this._getOpenValueForX(moveX);
                    return true;
                }
            } else {
                if (moveX <= 35 && dx > 0) {
                    this._isClosing = false;
                    return true;
                }
                return false;
            }
        } else {
            const overlayArea = DEVICE_WIDTH - this.props.drawerWidth;
            if (this._lastOpenValue === 1) {
                if ((dx > 0 && Math.abs(dx) > Math.abs(dy) * 3) || moveX < overlayArea) {
                    this._isClosing = true;
                    this._closingAnchorValue = this._getOpenValueForX(moveX);
                    return true;
                }
            } else {
                if (moveX >= DEVICE_WIDTH - 35 && dx < 0) {
                    this._isClosing = false;
                    return true;
                }
                return false;
            }
        }
    };
}
