import React = require('react');
import ReactNative = require('react-native');

interface IFitImageState {
    width: number;
    height: number;
}

export class FitImage extends React.Component<ReactNative.ImageProperties, IFitImageState> {
    static defaultState: IFitImageState = {
        width: 0,
        height: 0,
    };

    private isFirstLoad: boolean;
    private mounted: boolean;

    constructor(props: ReactNative.ImageProperties) {
        super(props);

        this.isFirstLoad = true;
        this.state = FitImage.defaultState;
    }

    public componentDidMount() {
        this.mounted = true;
    }

    public componentWillUnmount() {
        this.mounted = false;
    }

    public render() {
        let children = this.props.children;
        return (
            <ReactNative.Image
                {...this.props}
                onLayout={this._onLayout}
                source={this.props.source}
                style={[
                    this.props.style,
                    this.getSize(),
                ]}
            >
                {children}
            </ReactNative.Image>
        );
    }
    private getSize() {
        let { width, height } = this.props.style ? this.props.style : {} as any;
        if (width && height) {
            return { width, height };
        } else {
            return { width: this.state.width, height: this.state.height };
        }
    }
    private _onLayout = (layout: ReactNative.LayoutChangeEvent) => {
        if (!this.mounted) {
            return;
        }
        this.setState({
            height: layout.nativeEvent.layout.height,
            width: layout.nativeEvent.layout.width,
        });
        if (this.props.onLoad) {
            this.props.onLayout(layout);
        }
    }
}
