
import rx = require('reactxp');

import DimenUtils = require('../../utils/DimenUtils');

const MIN_SWIPE_DISTANCE = 3;
const DEVICE_WIDTH = DimenUtils.getWindowSize().width;
const THRESHOLD = DEVICE_WIDTH / 2;
const VX_MAX = 0.1;

export enum DrawerState {
    Idle, Dragging, Settling
};
export interface PropType extends rx.CommonStyledProps<rx.Types.ViewStyle> {
    drawerBackgroundColor?: string,
    drawerLockMode?: 'unlocked' | 'locked-closed' | 'locked-open',
    drawerPosition: 'left' | 'right',
    drawerWidth: number,
    onDrawerClose?: () => any,
    onDrawerOpen?: () => any,
    onDrawerSlide?: (offset: number) => any,
    onDrawerStateChanged?: (state: DrawerState) => any,
    renderNavigationView?: () => JSX.Element,
    statusBarBackgroundColor?: string,
    useNativeAnimations?: boolean,
};

export type StateType = {
    accessibilityViewIsModal: boolean,
    drawerShown: boolean,
    openValue: rx.Types.AnimatedValue,
};

export type EventType = {
    stopPropagation: Function,
};

export type PanResponderEventType = {
    dx: number,
    dy: number,
    moveX: number,
    moveY: number,
    vx: number,
    vy: number,
};

export type DrawerMovementOptionType = {
    velocity?: number,
};
const styles = {
    drawer: rx.Styles.createViewStyle({
        position: 'absolute',
        top: 0,
        bottom: 0,
    }),
    main: rx.Styles.createViewStyle({
        flex: 1,
    }),
    overlay: rx.Styles.createViewStyle({
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }),
};

export class DrawerLayout extends rx.Component<PropType, StateType> {
    static defaultProps: PropType = {
        drawerWidth: 0,
        drawerPosition: 'left',
        useNativeAnimations: false,
    };

    static positions = {
        Left: 'left',
        Right: 'right',
    };


    _lastOpenValue: number;
    // _panResponder: any;
    _isClosing: boolean;
    _closingAnchorValue: number;

    constructor(props: PropType, context: any) {
        super(props, context);

        this.state = {
            accessibilityViewIsModal: false,
            drawerShown: false,
            openValue: new rx.Animated.Value(0),
        };
    }

    getDrawerPosition() {
        const { drawerPosition } = this.props;
        const rtl = rx.International.isRTL();
        return rtl
            ? drawerPosition === 'left' ? 'right' : 'left' // invert it
            : drawerPosition;
    }

    componentWillMount() {
        const { openValue } = this.state;

        openValue.addListener((value: any) => {
            const drawerShown = value > 0;
            const accessibilityViewIsModal = drawerShown;
            if (drawerShown !== this.state.drawerShown) {
                this.setState({ ...this.state, drawerShown, accessibilityViewIsModal });
            }
            this._lastOpenValue = value;
            if (this.props.onDrawerSlide) {
                this.props.onDrawerSlide(value);
            }
        });

        // this._panResponder = {
        //     onMoveShouldSetPanResponder: this._shouldSetPanResponder,
        //     onPanResponderGrant: this._panResponderGrant,
        //     onPanResponderMove: this._panResponderMove,
        //     onPanResponderTerminationRequest: () => false,
        //     onPanResponderRelease: this._panResponderRelease,
        //     onPanResponderTerminate: () => { },
        // };
    }

    render() {
        const { accessibilityViewIsModal, drawerShown, openValue } = this.state;
        const { drawerBackgroundColor, drawerWidth, drawerPosition } = this.props;
        /**
        * We need to use the "original" drawer position here
        * as RTL turns position left and right on its own
        **/
        const dynamicDrawerStyles = rx.Styles.createViewStyle({
            backgroundColor: drawerBackgroundColor,
            width: drawerWidth,
            left: drawerPosition === 'left' ? 0 : null,
            right: drawerPosition === 'right' ? 0 : null,
        });
        /* Drawer styles */
        let outputRange;
        if (this.getDrawerPosition() === 'left') {
            outputRange = [-drawerWidth, 0];
        } else {
            outputRange = [drawerWidth, 0];
        }
        const drawerTranslateX = openValue.interpolate({
            inputRange: [0, 1],
            outputRange,
            extrapolate: 'clamp',
        });
        const animatedDrawerStyles = rx.Styles.createAnimatedViewStyle({
            transform: [{ translateX: drawerTranslateX }],
        });
        /* Overlay styles */
        const overlayOpacity = openValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.7],
            extrapolate: 'clamp',
        });
        const animatedOverlayStyles = { opacity: overlayOpacity };
        const pointerEvents = drawerShown ? 'auto' : 'none';
        return (
            <rx.View style={{ flex: 1, backgroundColor: '#0000' }}
              onMoveShouldSetResponder={this._onMoveShouldSetResponder} >
                <rx.Animated.View style={styles.main}>
                    {this.props.children}
                </rx.Animated.View>
                {/* < rx.View
                    pointerEvents={pointerEvents}
                    onPress={this._onOverlayClick} >
                    <rx.Animated.View
                        pointerEvents={pointerEvents}
                        style={[styles.overlay, animatedOverlayStyles]}
                    />
                </rx.View> */}
                < rx.Animated.View
                    style={[styles.drawer, dynamicDrawerStyles, animatedDrawerStyles]} >
                    {this.props.renderNavigationView()}
                </rx.Animated.View>
            </rx.View>
        );
    }

    _onOverlayClick = (e: EventType) => {
        e.stopPropagation();
        if (!this._isLockedClosed() && !this._isLockedOpen()) {
            this.closeDrawer();
        }
    };

    _emitStateChanged = (newState: DrawerState) => {
        if (this.props.onDrawerStateChanged) {
            this.props.onDrawerStateChanged(newState);
        }
    };

    openDrawer = (options: DrawerMovementOptionType = {}) => {
        this._emitStateChanged(DrawerState.Settling);
        // rx.Animated.spring(this.state.openValue, {
        //     toValue: 1,
        //     bounciness: 0,
        //     restSpeedThreshold: 0.1,
        //     useNativeDriver: this.props.useNativeAnimations,
        //     ...options,
        // })
        //     .start(() => {
        //         if (this.props.onDrawerOpen) {
        //             this.props.onDrawerOpen();
        //         }
        //         this._emitStateChanged(DrawerState.Idle);
        //     });
    };

    closeDrawer = (options: DrawerMovementOptionType = {}) => {
        this._emitStateChanged(DrawerState.Settling);
        // rx.Animated.spring(this.state.openValue, {
        //     toValue: 0,
        //     bounciness: 0,
        //     restSpeedThreshold: 1,
        //     useNativeDriver: this.props.useNativeAnimations,
        //     ...options,
        // })
        //     .start(() => {
        //         if (this.props.onDrawerClose) {
        //             this.props.onDrawerClose();
        //         }
        //         this._emitStateChanged(DrawerState.Idle);
        //     });
    };

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

    _onMoveShouldSetResponder = (
        e: EventType,
        { moveX, dx, dy }: PanResponderEventType,
    ) => {
        if (!dx || !dy || Math.abs(dx) < MIN_SWIPE_DISTANCE) {
            return false;
        }

        if (this._isLockedClosed() || this._isLockedOpen()) {
            return false;
        }

        if (this.getDrawerPosition() === 'left') {
            const overlayArea = DEVICE_WIDTH -
                (DEVICE_WIDTH - this.props.drawerWidth);

            if (this._lastOpenValue === 1) {
                if (
                    (dx < 0 && Math.abs(dx) > Math.abs(dy) * 3) || moveX > overlayArea
                ) {
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
                if (
                    (dx > 0 && Math.abs(dx) > Math.abs(dy) * 3) || moveX < overlayArea
                ) {
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
        return false;
    };

    _panResponderGrant = () => {
        this._emitStateChanged(DrawerState.Dragging);
    };
    _onPan = (gestureState: rx.Types.PanGestureState) => {

    }
    _panResponderMove = (e: EventType, { moveX }: PanResponderEventType) => {
        let openValue = this._getOpenValueForX(moveX);

        if (this._isClosing) {
            openValue = 1 - (this._closingAnchorValue - openValue);
        }

        if (openValue > 1) {
            openValue = 1;
        } else if (openValue < 0) {
            openValue = 0;
        }

        this.state.openValue.setValue(openValue);
    };

    _panResponderRelease = (e: EventType, { moveX, vx }: PanResponderEventType, ) => {
        const previouslyOpen = this._isClosing;
        const isWithinVelocityThreshold = vx < VX_MAX && vx > -VX_MAX;

        if (this.getDrawerPosition() === 'left') {
            if (
                (vx > 0 && moveX > THRESHOLD) ||
                vx >= VX_MAX ||
                (isWithinVelocityThreshold && previouslyOpen && moveX > THRESHOLD)
            ) {
                this.openDrawer({ velocity: vx });
            } else if (
                (vx < 0 && moveX < THRESHOLD) ||
                vx < -VX_MAX ||
                (isWithinVelocityThreshold && !previouslyOpen)
            ) {
                this.closeDrawer({ velocity: vx });
            } else if (previouslyOpen) {
                this.openDrawer();
            } else {
                this.closeDrawer();
            }
        } else {
            if (
                (vx < 0 && moveX < THRESHOLD) ||
                vx <= -VX_MAX ||
                (isWithinVelocityThreshold && previouslyOpen && moveX < THRESHOLD)
            ) {
                this.openDrawer({ velocity: (-1) * vx });
            } else if (
                (vx > 0 && moveX > THRESHOLD) ||
                vx > VX_MAX ||
                (isWithinVelocityThreshold && !previouslyOpen)
            ) {
                this.closeDrawer({ velocity: (-1) * vx });
            } else if (previouslyOpen) {
                this.openDrawer();
            } else {
                this.closeDrawer();
            }
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

    _getOpenValueForX(x: number): number {
        const { drawerWidth } = this.props;

        if (this.getDrawerPosition() === 'left') {
            return x / drawerWidth;
        }

        // position === 'right'
        return (DEVICE_WIDTH - x) / drawerWidth;
    }
}

