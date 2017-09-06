import rx = require('reactxp');

interface Props extends rx.CommonStyledProps<rx.Types.ViewStyleRuleSet> {
    renderDrawer: () => JSX.Element;
    renderContent: () => JSX.Element;
}

// Duration (in ms) of drawer animation.
const animationDuration = 250;

const drawerWidth = 100;

const styles = {
    container: rx.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch'
    }),
    drawerContainer: rx.Styles.createViewStyle({
        position: 'absolute',
        width: drawerWidth,
        top: 0,
        bottom: 0,
        left: 0
    }),
    contentContainer: rx.Styles.createViewStyle({
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    })
};

class DrawerContainer extends rx.Component<Props, null> {
    private _drawerShown = false;
    private _viewWidth: number = 0;

    private _animation: rx.Types.Animated.CompositeAnimation;
    private _drawerTranslationValue: rx.Animated.Value;
    private _contentTranslationValue: rx.Animated.Value;
    private _animatedDrawerStyle: rx.Types.AnimatedViewStyleRuleSet;
    private _animatedContentStyle: rx.Types.AnimatedViewStyleRuleSet;

    toggleDrawer() {
        this._drawerShown = !this._drawerShown;

        if (this._animation) {
            this._animation.stop();
        }

        this._animation = rx.Animated.parallel([
            rx.Animated.timing(this._drawerTranslationValue, {
                toValue: this._drawerShown ? 0 : -drawerWidth,
                easing: rx.Animated.Easing.InOut(),
                duration: animationDuration
            }),
            rx.Animated.timing(this._contentTranslationValue, {
                toValue: this._drawerShown ? drawerWidth : 0,
                easing: rx.Animated.Easing.InOut(),
                duration: animationDuration
            })
        ]);
        
        this._animation.start(() => {
            this._animation = null;
        });
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
        this._drawerTranslationValue.setValue(this._drawerShown ? 0 : -drawerWidth);
        this._contentTranslationValue.setValue(this._drawerShown ? drawerWidth : 0);
    }

    render() {
        return (
            <rx.View style={ [styles.container, this.props.style] } onLayout={ this._onLayout }>
                <rx.Animated.View style={ [styles.drawerContainer, this._animatedDrawerStyle] }>
                    { this.props.renderDrawer() }
                </rx.Animated.View>
                <rx.Animated.View style={ [styles.contentContainer, this._animatedContentStyle] }>
                    { this.props.renderContent() }
                </rx.Animated.View>
            </rx.View>
        );
    }
}

export = DrawerContainer;