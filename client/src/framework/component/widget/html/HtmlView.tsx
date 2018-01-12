import react = require('react');
import { htmlToElement } from './htmlToElement';
import rx = require('reactxp');
import { DeviceUtils } from '../../../utils/index';
import { Link } from '../index';

export class HtmlView extends rx.Component<IProp, IState> {
    public static defaultProps: IProp = {
        addLineBreaks: true,
        onError: console.error.bind(console),
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
        const { addLineBreaks, renderNode, onError } = this.props;
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
        const { style } = this.props;
        const { element } = this.state;
        return (
            <rx.View
                style={style}>
                {element}
            </rx.View>
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
    onError?: (err: Error) => any;
    paragraphBreak?: string;
    renderNode?: (params: IRenderNodeParams) => react.ReactNode;
    getNodeProp?: (params: IRenderNodeParams) => INodeProp;
    style?: rx.Types.ViewStyleRuleSet;
    value: string;
}
export interface IHtmlElement {
    data?: string;
    type: string;
    name?: string;
    attribs?: {
        [key: string]: any,
    };
    parent?: IHtmlElement;
    children?: IHtmlElement[];
}
export type INodeProp = {
    key?: string;
    style: rx.Types.ViewStyleRuleSet | rx.Types.TextStyleRuleSet;
    childView?: react.ReactNode;
    onClick?: () => any;
} | null;
export interface IRenderNodeParams {
    node: IHtmlElement;
    index: number;
    list: IHtmlElement[];
    parent: IHtmlElement;
    domToElement?: (
        dom: IHtmlElement[],
        parent?: IHtmlElement,
        parentStyle?: rx.Types.TextStyleRuleSet) => react.ReactNode;
}