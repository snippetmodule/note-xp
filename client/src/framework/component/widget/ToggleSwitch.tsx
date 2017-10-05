import rx = require('reactxp');

interface IToggleSwitchProps extends rx.CommonProps {
    value?: boolean;
    onChange?: (newValue: boolean) => void;
}

const _knobLeftOff = 2; // In pixels
const _knobLeftOn = 22; // In pixels
const _animationDuration = 250; // In milliseconds

const _styles = {
    container: rx.Styles.createButtonStyle({
        flexDirection: 'row',
        alignItems: 'center',
    }),
    toggleSwitch: rx.Styles.createViewStyle({
        flexDirection: 'row',
        borderRadius: 15,
        marginVertical: 8,
        height: 30,
        width: 50,
        backgroundColor: '#ddd',
    }),
    toggleSwitchBackground: rx.Styles.createViewStyle({
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 15,
    }),
    toggleKnob: rx.Styles.createViewStyle({
        top: 2,
        height: 26,
        width: 26,
        borderRadius: 13,
        backgroundColor: 'white',
    }),
};

export = class ToggleSwitch extends rx.Component<IToggleSwitchProps, null> {
    private _knobLeftAnimationValue: rx.Animated.Value;
    private _knobLeftAnimationStyle: rx.Types.AnimatedViewStyleRuleSet;

    private _toggleColorAnimationValue: rx.Animated.Value;
    private _toggleColorAnimationStyle: rx.Types.AnimatedViewStyleRuleSet;

    constructor(props: IToggleSwitchProps) {
        super(props);

        // This value controls the left offset of the knob, which we will
        // animate when the user toggles the control.
        this._knobLeftAnimationValue = new rx.Animated.Value(this.props.value ? _knobLeftOn : _knobLeftOff);
        this._knobLeftAnimationStyle = rx.Styles.createAnimatedViewStyle({
            left: this._knobLeftAnimationValue,
        });

        // This value controls the background color of the control. Here we make
        // use of the interpolate method to smoothly transition between two colors.
        this._toggleColorAnimationValue = new rx.Animated.Value(this.props.value ? 1 : 0);
        this._toggleColorAnimationStyle = rx.Styles.createAnimatedTextInputStyle({
            backgroundColor: this._toggleColorAnimationValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['#66f', '#ddd'],
            }),
        });
    }

    componentWillUpdate(newProps: IToggleSwitchProps) {

        // If the value of the toggle changes, animate the toggle sliding
        // from one side to the other. In parallel, animate the opacity change.
        if (this.props.value !== newProps.value) {
            rx.Animated.parallel([
                rx.Animated.timing(this._knobLeftAnimationValue, {
                    toValue: newProps.value ? _knobLeftOn : _knobLeftOff,
                    duration: _animationDuration,
                    easing: rx.Animated.Easing.InOut(),
                }),
                rx.Animated.timing(this._toggleColorAnimationValue, {
                    toValue: newProps.value ? 1 : 0,
                    duration: _animationDuration,
                    easing: rx.Animated.Easing.InOut(),
                }),
            ])
                .start();
        }
    }

    render() {
        const knobStyles = [_styles.toggleKnob, this._knobLeftAnimationStyle];
        const backgroundStyle = [_styles.toggleSwitchBackground, this._toggleColorAnimationStyle];

        return (
            <rx.Button style={_styles.container} onPress={this._handleClick}>
                <rx.View style={_styles.toggleSwitch}>
                    <rx.Animated.View style={backgroundStyle} />
                    <rx.Animated.View style={knobStyles} />
                </rx.View>
            </rx.Button>
        );
    }

    private _handleClick = (e: rx.Types.SyntheticEvent) => {
        e.stopPropagation();

        if (this.props.onChange) {
            this.props.onChange(!this.props.value);
        }
    }
};
