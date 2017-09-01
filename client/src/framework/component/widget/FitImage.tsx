import React = require('react');
import rx = require('reactxp');

import DeviceUtils = require('../../utils/DeviceUtils');
import DimenUtils = require('../../utils/DimenUtils');

interface IFitImageState {
    width: number;
    height: number;
    isLoading: boolean;
}

export class FitImage extends rx.Component<rx.Types.ImageProps, IFitImageState> {
    static defaultState: IFitImageState = {
        width: 0,
        height: 0,
        isLoading: true
    };

    private isFirstLoad: boolean;
    private mounted: boolean;

    constructor(props: rx.Types.ImageProps) {
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
            <rx.Image
                {...this.props}
                onLoad={this._onLoad.bind(this)}
                source={this.props.source}
                style={[
                    this.props.style,
                    this.getSize(),
                ]}
            >
                {children}
            </rx.Image>
        );
    }
    private getSize() {
        let { width, height } = this.props.style ? this.props.style : {} as any;
        if (width && height) {
            return { width, height }
        } else {
            return { width: this.state.width, height: this.state.height }
        }
    }
    private _onLoad(size: rx.Types.Dimensions) {
        if (!this.mounted) {
            return;
        }
        if (DeviceUtils.isNative) {
            size = { height: size.height / DimenUtils.get(), width: size.width / DimenUtils.get() };
        }
        this.setState({
            ...this.state,
            ...size,
            isLoading: false
        });
        if (this.props.onLoad) {
            this.props.onLoad(size);
        }
    }
}
