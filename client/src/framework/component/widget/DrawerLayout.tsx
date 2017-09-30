import rx = require('reactxp');
import React = require('react');
import DimenUtils = require('../../utils/DimenUtils');

const MIN_SWIPE_DISTANCE = 3;
const DEVICE_WIDTH = DimenUtils.getWindowSize().width;
const THRESHOLD = DEVICE_WIDTH / 2;
const VX_MAX = 0.1;
const animationDuration = 250;

enum DrawerState {
    idle, dragging, setting
}
interface Props extends rx.CommonStyledProps<rx.Types.ViewStyleRuleSet> {
    drawerWidth: number,
    drawerPosition: 'left' | 'right',
    drawerLockMode?: 'unlocked' | 'locked-closed' | 'locked-open',
    onDrawerOpen?: () => any,
    onDrawerClose?: () => any,
    onDrawerStateChanged?: (newState: DrawerState) => any,
    renderNavigationView?: () => JSX.Element,
}
interface State {
    drawerShown: boolean,
    openValue: rx.Animated.Value,
    translateValue: rx.Animated.Value,
}
export class DrawerLayout extends rx.Component<Props, State> {
    static defaultProps: Props = {
        drawerWidth: 0,
        drawerPosition: 'left'
    };

    static positions = {
        Left: 'left',
        Right: 'right',
    };
    private _isRTL: boolean = false;
    private _lastOpenValue: number = 0;

    constructor(props: Props, context: any) {
        super(props, context);
        this.state = {
            drawerShown: false,
            openValue: new rx.Animated.Value(0),
            translateValue: new rx.Animated.Value(0),
        };
    }

    render() {
        const { drawerShown, openValue, } = this.state;
        const { drawerPosition, drawerWidth } = this.props;

        const dynamicDrawerStyles = {
            width: drawerWidth,
            left: drawerPosition === 'left' ? 0 : null,
            right: drawerPosition === 'right' ? 0 : null,
        };

        /* Drawer styles */
        let outputRange;
        if (drawerPosition === 'left') {
            outputRange = this._isRTL ? [drawerWidth, 0] : [-drawerWidth, 0];
        } else {
            outputRange = this._isRTL ? [-drawerWidth, 0] : [drawerWidth, 0];
        }

        const drawerTranslateX = this.state.translateValue.interpolate({
            inputRange: [0, 1],
            outputRange,
        });
        const animatedDrawerStyles = rx.Styles.createAnimatedViewStyle({
            transform: [{ translateX: drawerTranslateX }],
        });

        /* Overlay styles */
        const overlayOpacity = openValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.7],
        });
        const animatedOverlayStyles = rx.Styles.createAnimatedViewStyle({ opacity: overlayOpacity });
        const pointerEvents = drawerShown ? 'auto' : 'none';
        //  {...this._panResponder.panHandlers}
        return (
            <rx.GestureView
                style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }} onPanHorizontal={this._onPanHorizontal} >
                <rx.Animated.View style={styles.main}>
                    {this.props.children}
                </rx.Animated.View>
                {
                    this.state.drawerShown ?
                        (
                            <rx.Animated.View onPress={this._onOverlayClick}
                                style={[styles.overlay, animatedOverlayStyles]}
                            />
                        ) : null
                }
                <rx.Animated.View
                    style={[styles.drawer, dynamicDrawerStyles, animatedDrawerStyles]}
                >
                    {this.props.renderNavigationView()}
                </rx.Animated.View>
            </rx.GestureView>
        );
    }

    _onOverlayClick = (e: rx.Types.SyntheticEvent) => {
        if (this.state.drawerShown) {
            e.stopPropagation();
            if (!this._isLockedClosed() && !this._isLockedOpen()) {
                this.closeDrawer();
            }
        }
    };

    _emitStateChanged = (newState: DrawerState) => {
        if (this.props.onDrawerStateChanged) {
            this.props.onDrawerStateChanged(newState);
        }
    };

    openDrawer = () => {
        this._emitStateChanged(DrawerState.setting);
        rx.Animated.parallel([
            rx.Animated.timing(this.state.openValue, {
                toValue: 1,
                easing: rx.Animated.Easing.InOut(),
                duration: animationDuration
            }),
            rx.Animated.timing(this.state.translateValue, {
                toValue: 1,
                easing: rx.Animated.Easing.InOut(),
                duration: animationDuration
            })
        ]).start(() => {
            if (this.props.onDrawerOpen) {
                this.props.onDrawerOpen();
            }
            this.setState({ drawerShown: true });
            this._emitStateChanged(DrawerState.idle);
        });
    };

    closeDrawer = () => {
        this._emitStateChanged(DrawerState.setting);
        rx.Animated.parallel([
            rx.Animated.timing(this.state.openValue, {
                toValue: 0,
                easing: rx.Animated.Easing.InOut(),
                duration: animationDuration
            }),
            rx.Animated.timing(this.state.translateValue, {
                toValue: 0,
                easing: rx.Animated.Easing.InOut(),
                duration: animationDuration
            })
        ]).start(() => {
            if (this.props.onDrawerClose) {
                this.props.onDrawerClose();
            }
            this.setState({ drawerShown: false });
            this._emitStateChanged(DrawerState.idle);
        });
    };
    // _onPanHorizontal = (gesture: rx.Types.PanGestureState): void => {
    //     if (this._isLockedClosed() || this._isLockedOpen()) {
    //         return;
    //     }
    //     if (!gesture.velocityX || !gesture.velocityY || Math.abs(gesture.velocityX) < MIN_SWIPE_DISTANCE) {
    //         return;
    //     }
    //     if (this.props.drawerPosition === 'left') {
    //         const overlayArea = DEVICE_WIDTH - (DEVICE_WIDTH - this.props.drawerWidth);

    //         if (this._lastOpenValue === 1) {
    //             if ((dx < 0 && Math.abs(dx) > Math.abs(dy) * 3) || moveX > overlayArea) {
    //                 this._isClosing = true;
    //                 this._closingAnchorValue = this._getOpenValueForX(moveX);
    //                 return;
    //             }
    //         } else {
    //             if (moveX <= 35 && dx > 0) {
    //                 this._isClosing = false;
    //                 return;
    //             }
    //             return;
    //         }
    //     } else {
    //         const overlayArea = DEVICE_WIDTH - this.props.drawerWidth;
    //         if (this._lastOpenValue === 1) {
    //             if (
    //                 (dx > 0 && Math.abs(dx) > Math.abs(dy) * 3) || moveX < overlayArea
    //             ) {
    //                 this._isClosing = true;
    //                 this._closingAnchorValue = this._getOpenValueForX(moveX);
    //                 return true;
    //             }
    //         } else {
    //             if (moveX >= DEVICE_WIDTH - 35 && dx < 0) {
    //                 this._isClosing = false;
    //                 return;
    //             }

    //             return;
    //         }
    //     }
    // };

    // _panResponderGrant = () => {
    //     this._emitStateChanged(DRAGGING);
    // };
    _getOpenValueForX(x: number): number {
        const { drawerWidth } = this.props;

        if (this.props.drawerPosition === 'left') {
            return x / drawerWidth;
        }
        // position === 'right'
        return (DEVICE_WIDTH - x) / drawerWidth;
    }
    _onPanHorizontal = (gesture: rx.Types.PanGestureState) => {
        if (gesture.isComplete) {

        }
        console.info('_onPanHorizontal:' + JSON.stringify(gesture));
        let openValue = this._getOpenValueForX(gesture.pageX);

        if (openValue > 1) {
            openValue = 1;
        } else if (openValue < 0) {
            openValue = 0;
        }
        console.info('_onPanHorizontal:' + openValue);
        this.state.openValue.setValue(openValue);
    };

    // _panResponderRelease = (
    //     e: EventType,
    //     { moveX, vx }: PanResponderEventType,
    // ) => {
    //     const previouslyOpen = this._isClosing;
    //     const isWithinVelocityThreshold = vx < VX_MAX && vx > -VX_MAX;

    //     if (this.getDrawerPosition() === 'left') {
    //         if (
    //             (vx > 0 && moveX > THRESHOLD) ||
    //             vx >= VX_MAX ||
    //             (isWithinVelocityThreshold && previouslyOpen && moveX > THRESHOLD)
    //         ) {
    //             this.openDrawer({ velocity: vx });
    //         } else if (
    //             (vx < 0 && moveX < THRESHOLD) ||
    //             vx < -VX_MAX ||
    //             (isWithinVelocityThreshold && !previouslyOpen)
    //         ) {
    //             this.closeDrawer({ velocity: vx });
    //         } else if (previouslyOpen) {
    //             this.openDrawer();
    //         } else {
    //             this.closeDrawer();
    //         }
    //     } else {
    //         if (
    //             (vx < 0 && moveX < THRESHOLD) ||
    //             vx <= -VX_MAX ||
    //             (isWithinVelocityThreshold && previouslyOpen && moveX < THRESHOLD)
    //         ) {
    //             this.openDrawer({ velocity: (-1) * vx });
    //         } else if (
    //             (vx > 0 && moveX > THRESHOLD) ||
    //             vx > VX_MAX ||
    //             (isWithinVelocityThreshold && !previouslyOpen)
    //         ) {
    //             this.closeDrawer({ velocity: (-1) * vx });
    //         } else if (previouslyOpen) {
    //             this.openDrawer();
    //         } else {
    //             this.closeDrawer();
    //         }
    //     }
    // };
    _handleDrawerOpen = () => {
        if (this.props.onDrawerOpen) {
            this.props.onDrawerOpen();
        }
    };

    _handleDrawerClose = () => {
        if (this.props.onDrawerClose) {
            this.props.onDrawerClose();
        }
    };

    _isLockedClosed = () => {
        return this.props.drawerLockMode === 'locked-closed' &&
            !this.state.drawerShown;
    };

    _isLockedOpen = () => {
        return this.props.drawerLockMode === 'locked-open' &&
            this.state.drawerShown;
    };
}

const styles = {
    drawer: rx.Styles.createViewStyle({
        position: 'absolute',
        top: 0,
        bottom: 0,
    }),
    main: rx.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch'
    }),
    overlay: rx.Styles.createViewStyle({
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }),
    button: rx.Styles.createButtonStyle({
        backgroundColor: '#000',
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }),
};