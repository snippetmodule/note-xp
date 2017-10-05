import rx = require('reactxp');
import React = require('react');
import _ = require('lodash');

interface IProps extends rx.CommonStyledProps<rx.Types.ViewStyle> {
    count: number;
    selectedIndex: number;
    onSelectedIndexChange?: (index: number) => void;
    bounces?: boolean;
}

interface IState {
    width: number;
    height: number;
    selectedIndex: number;
}

class ViewPager extends rx.Component<IProps, IState> {

    private mScrollView: rx.ScrollView;

    constructor(props: IProps) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            selectedIndex: this.props.selectedIndex,
        };
    }

    public render() {
        let { width, height } = this.state;
        let content: React.ReactNode[] = [];

        if (!_.isUndefined(this.props.children)) {
            if (_.isArray(this.props.children)) {
                content = (this.props.children as [React.ReactNode]).map((child, i) => {
                    return (
                        <rx.View style={[{ width, height }]} key={'r_' + i} >
                            {child}
                        </rx.View>
                    );
                });
            } else {
                content.push(this.props.children);
            }
        }
        return (
            <rx.ScrollView
                ref={(ref: rx.ScrollView) => this.mScrollView = ref}
                style={[this.props.style]}
                horizontal={true}
                pagingEnabled={true}
                bounces={this.props.bounces}
                scrollsToTop={false}
                onScroll={this._onScroll}
                scrollEventThrottle={100}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                onLayout={this.adjustCardSize} >
                {content}
            </rx.ScrollView>
        );
    }

    private adjustCardSize(e: rx.Types.ViewOnLayoutEvent) {
        this.setState({
            ...this.state,
            width: e.width,
            height: e.height,
        });
    }

    public componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.selectedIndex !== this.state.selectedIndex) {
            this.mScrollView.setScrollLeft(nextProps.selectedIndex * this.state.width, true);
            this.setState({
                ...this.state,
                selectedIndex: nextProps.selectedIndex,
            });
        }
    }

    private _onScroll(newScrollTop: number, newScrollLeft: number) {
        let selectedIndex = Math.round(newScrollLeft / this.state.width);

        if (selectedIndex < 0 || selectedIndex >= this.props.count) {
            return;
        }
        if (this.props.selectedIndex !== selectedIndex) {
            this.setState({ ...this.state, selectedIndex });
            let { onSelectedIndexChange } = this.props;
            onSelectedIndexChange && onSelectedIndexChange(selectedIndex);
        }
    }
}
