import react = require('react');
import { htmlToElement, IHtmlElement } from './htmlToElement';
import rx = require('reactxp');
import { DeviceUtils } from '../../../utils/index';

export class HtmlView extends rx.Component<IProp, IState> {
    public static defaultProps: IProp = {
        addLineBreaks: true,
        onLinkPress: (url) => { },
        onError: console.error.bind(console),
        RootComponent: rx.Text,
        value: null,
    };
    private mounted = false;

    constructor(prop: IProp) {
        super(prop);
        this.state = {
            element: null,
        };
    }

    componentDidMount() {
        this.mounted = true;
        this.startHtmlRender(this.props.value);
    }

    componentWillReceiveProps(nextProps: IProp) {
        if (this.props.value !== nextProps.value) {
            this.startHtmlRender(nextProps.value);
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    startHtmlRender(value: string) {
        const { addLineBreaks, onLinkPress, renderNode, onError } = this.props;
        if (!value) {
            this.setState({ element: null });
        }
        const opts = {
            ...this.props,
            customRenderer: renderNode,
        };
        htmlToElement(value, opts, (err: Error, element: JSX.Element[]) => {
            if (err) {
                onError(err);
            }
            if (this.mounted) {
                this.setState({ element });
            }
        });
    }

    render() {
        const { RootComponent, style } = this.props;
        const { element } = this.state;
        return (
            <RootComponent
                {...this.props.rootComponentProps}
                style={style}>
                {element}
            </RootComponent>
        );
    }
}
interface IState {
    element: JSX.Element[];
}
interface IProp {
    addLineBreaks?: boolean;
    bullet?: string;
    lineBreak?: string;
    NodeComponent?: typeof rx.Text;
    nodeComponentProps?: rx.Types.TextProps;
    onError?: (err: Error) => any;
    onLinkPress?: (url: string) => void;
    paragraphBreak?: string;
    renderNode?: (node: IHtmlElement, index: number, list: IHtmlElement[], parent: IHtmlElement, domToElement?: (dom: IHtmlElement[], parent: IHtmlElement) => JSX.Element[]) => any;
    RootComponent?: typeof rx.Text;
    rootComponentProps?: rx.Types.TextProps;
    style?: rx.Types.ViewStyle;
    TextComponent?: typeof rx.Text;
    textComponentProps?: rx.Types.TextProps;
    value: string;
}
