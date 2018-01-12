import * as react from 'react';
import * as htmlparser from 'htmlparser2';
import rx = require('reactxp');

import { FitImage } from '../FitImage';
import { DeviceUtils } from '../../../utils/index';
import { IHtmlElement, INodeProp, IRenderNodeParams } from './HtmlView';
import { Link } from '../Link';

const boldStyle = rx.Styles.createTextStyle({ fontWeight: '500' });
const italicStyle = rx.Styles.createTextStyle({ fontStyle: 'italic' });
const underlineStyle = rx.Styles.createTextStyle({ textDecorationLine: 'underline' });
const codeStyle = { fontFamily: DeviceUtils.isIos ? 'Menlo' : 'monospace' };

const baseStyles: { [key: string]: any } = {
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
interface IProp {
    lineBreak?: string;
    paragraphBreak?: string;
    bullet?: string;
    renderNode?: (params: IRenderNodeParams) => react.ReactNode;
    getNodeProp?: (params: IRenderNodeParams) => INodeProp;
    addLineBreaks?: boolean;
}

const defaultOpts: IProp = {
    lineBreak: '\n',
    paragraphBreak: '\n\n',
    bullet: '\u2022 ',
};
typeof rx.Text;
const Img = (props: { key: number, attribs: any }) => {
    const width =
        parseInt(props.attribs['width'], 10) || parseInt(props.attribs['data-width'], 10) || 0;
    const height =
        parseInt(props.attribs['height'], 10) ||
        parseInt(props.attribs['data-height'], 10) ||
        0;
    const imgStyle = {
        width,
        height,
    };
    return <FitImage source={props.attribs.src} style={imgStyle} />;
};
class HTMLComponent extends rx.Component<INodeProp & IRenderNodeParams, {}> {
    componentDidCatch(error: Error, errorInfo: react.ErrorInfo) {
        console.log(`${error.message},${errorInfo.componentStack}`);
    }
    render() {
        switch (this.props.node.name) {
            case 'img':
                return <Img key={this.props.index} attribs={this.props.node.attribs} />;
            case 'a':
                return (
                    <Link url={this.props.node.attribs.href}
                        {...this.props}
                        key={`${this.props.node.name} _${this.props.node.children.length} _${this.props.index}`}
                        focusStyle={{ textDecorationLine: 'underline' }} >
                        {this.props.domToElement(this.props.node.children, this.props.node, this.props.style)}
                        {this.props.childView}
                    </ Link>
                );
            default:
                return (
                    <rx.Text style={this.props.style}>
                        {this.props.domToElement(this.props.node.children, this.props.node, this.props.style)}
                        {this.props.childView}
                    </rx.Text>
                );
        }
    }
}
export function htmlToElement(rawHtml: string, customOpts: IProp = defaultOpts, done: (err: Error, components: react.ReactNode) => any) {
    const opts = {
        ...defaultOpts,
        ...customOpts,
    };

    function inheritedStyle(parent: IHtmlElement): rx.Types.ViewStyle {
        if (!parent) { return null; }
        const style = baseStyles[parent.name] || {};
        const parentStyle = inheritedStyle(parent.parent) || {};
        return { ...parentStyle, ...style };
    }

    function domToElement(
        dom: IHtmlElement[],
        parent: IHtmlElement = null,
        parentStyle: rx.Types.TextStyleRuleSet = null): react.ReactNode {
        if (!dom) { return null; }
        const renderNode = opts.renderNode;
        let orderedListCounter = 1;
        return dom.map((node, index, list) => {
            let params: IRenderNodeParams = { node, index, list, parent, domToElement };
            if (renderNode) {
                const rendered = renderNode(params);
                if (rendered) { return rendered; }
            }
            if (node.type === 'text') {
                if (node.data === ' ' || node.data === '\n') { return null; }
                return node.data;
            }
            let nodeProps: INodeProp = customOpts.getNodeProp && customOpts.getNodeProp(params);
            const style: rx.Types.ViewStyle = !node.parent ? baseStyles[node.name] : null;
            return (
                <HTMLComponent
                    {...nodeProps}
                    key={`${node.name} _${node.children.length} _${index}`}
                    node={node}
                    parent={parent}
                    index={index}
                    list={list}
                    style={[style, nodeProps ? nodeProps.style : null] as any}
                    domToElement={domToElement}
                />
            );
        });
    }
    let handler = new (htmlparser as any).DomHandler((error: Error, dom: IHtmlElement[]) => {
        done(error, error ? null : domToElement(dom));
        console.log(dom);
    });
    let parser = new htmlparser.Parser(handler);
    parser.write(rawHtml);
    parser.end();
}
