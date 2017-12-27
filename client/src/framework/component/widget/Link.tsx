import rx = require('reactxp');
import { SyntheticEvent } from 'reactxp/dist/common/Types';

interface ILinkProp extends rx.Types.LinkProps {
    name: string;
    focusStyle: rx.Types.LinkStyleRuleSet;
    onClick: () => void;
}
interface ILinkState {
    isFocus: boolean;
}
export class Link extends rx.Component<ILinkProp, ILinkState> {
    _onHoverStart = (e: SyntheticEvent) => {
        this.setState({ isFocus: true });
        this.props.onHoverStart && this.props.onHoverStart(e);
    }
    _onHoverEnd = (e: SyntheticEvent) => {
        this.setState({ isFocus: false });
        this.props.onHoverEnd && this.props.onHoverEnd(e);
    }
    render() {
        let isFocus = this.state ? this.state.isFocus : false;
        return (
            <rx.Link
                style={[this.props.style, isFocus ? this.props.focusStyle : {}]}
                url={this.props.name}
                onHoverStart={this._onHoverStart}
                onHoverEnd={this._onHoverEnd}
                onPress={this.props.onClick} >
                {this.props.name}
            </rx.Link >
        );
    }
}