import react = require('react');
import { htmlToElement, IHtmlElement } from './htmlToElement';
import rx = require('reactxp');
import { DeviceUtils } from '../../../utils/index';

const boldStyle = rx.Styles.createTextStyle({ fontWeight: '500' });
const italicStyle = rx.Styles.createTextStyle({ fontStyle: 'italic' });
const underlineStyle = rx.Styles.createTextStyle({ textDecorationLine: 'underline' });
const codeStyle = { fontFamily: DeviceUtils.isIos ? 'Menlo' : 'monospace' };

const baseStyles = {
    b: boldStyle,
    strong: boldStyle,
    i: italicStyle,
    em: italicStyle,
    u: underlineStyle,
    pre: codeStyle,
    code: codeStyle,
    a: rx.Styles.createLinkStyle({
        fontWeight: '500',
        color: '#007AFF',
    }),
    h1: rx.Styles.createTextStyle({
        fontWeight: '500', fontSize: 36,
    }),
    h2: rx.Styles.createTextStyle({
        fontWeight: '500', fontSize: 30,
    }),
    h3: rx.Styles.createTextStyle({
        fontWeight: '500', fontSize: 24,
    }),
    h4: rx.Styles.createTextStyle({
        fontWeight: '500', fontSize: 18,
    }),
    h5: rx.Styles.createTextStyle({
        fontWeight: '500', fontSize: 14,
    }),
    h6: rx.Styles.createTextStyle({
        fontWeight: '500', fontSize: 12,
    }),
};

export class HtmlView extends rx.Component<IProp, IState> {
    public static defaultProps: IProp = {
        addLineBreaks: true,
        onLinkPress: (url) => { },
        onLinkLongPress: null,
        onError: console.error.bind(console),
        RootComponent: rx.View,
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

    startHtmlRender(value: string, style?: rx.Types.ViewStyle) {
        const { addLineBreaks, onLinkPress, onLinkLongPress, renderNode, onError } = this.props;
        if (!value) {
            this.setState({ element: null });
        }
        const opts = {
            ...this.props,
            styles: { ...baseStyles, ...style },
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
    NodeComponent?: typeof rx.View;
    nodeComponentProps?: rx.Types.ViewProps;
    onError?: (err: Error) => any;
    onLinkPress?: (url: string) => void;
    onLinkLongPress?: (url: string) => void;
    paragraphBreak?: string;
    renderNode?: (node: IHtmlElement, index: number, list: IHtmlElement[], parent: IHtmlElement, domToElement?: (dom: IHtmlElement[], parent: IHtmlElement) => JSX.Element[]) => any;
    RootComponent?: typeof rx.View;
    rootComponentProps?: rx.Types.ViewProps;
    style?: rx.Types.ViewStyle;
    TextComponent?: typeof rx.Text;
    textComponentProps?: rx.Types.TextProps;
    value: string;
}
